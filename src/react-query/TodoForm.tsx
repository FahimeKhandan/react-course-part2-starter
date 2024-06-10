import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { Todo } from "./hooks/useTodos";
import axios from "axios";

interface TodoContex {
  prevTodos: Todo[];
}

const TodoForm = () => {
  const ref = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const addTodo = useMutation<Todo, Error, Todo, TodoContex>({
    mutationFn: (todo: Todo) =>
      axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todoss", todo)
        .then((res) => res.data),

    onMutate: (newTodo) => {
      const prevTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];

      queryClient.setQueryData<Todo[]>(["todos"], (todos) => [
        newTodo,
        ...(todos || []),
      ]);

      return { prevTodos };
    },

    onSuccess: (savedTodo, newTodo) => {
      // Approch : Invalidating the code (this does not work with jsonplaceHolder)
      // queryClient.invalidateQueries({
      //   queryKey: ["todos"],
      // });

      //Approche 2: Updating the data in the cache

      queryClient.setQueryData<Todo[]>(["todos"], (todos) =>
        todos?.map((todo) => (todo === newTodo ? savedTodo : todo))
      );

      if (ref.current) ref.current.value = "";
    },

    onError: (error, newTodo, contex) => {
      if (!contex) return;

      queryClient.setQueryData<Todo[]>(["todos"], contex.prevTodos);
    },
  });

  return (
    <>
      {addTodo.error && (
        <div className="alert alert-danger">{addTodo.error.message}</div>
      )}

      <form
        className="row mb-3"
        onSubmit={(event) => {
          event.preventDefault();

          if (ref.current && ref.current.value)
            addTodo.mutate({
              id: 0,
              title: ref.current?.value,
              userId: 1,
              completed: false,
            });
        }}
      >
        <div className="col">
          <input ref={ref} type="text" className="form-control" />
        </div>
        <div className="col">
          <button disabled={addTodo.isLoading} className="btn btn-primary">
            {addTodo.isLoading ? "...ading" : "Add"}
          </button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
