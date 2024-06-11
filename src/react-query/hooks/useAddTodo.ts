import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "./useTodos";
import axios from "axios";

interface TodoContex {
  prevTodos: Todo[];
}

const useAddTodo = (onAdd: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<Todo, Error, Todo, TodoContex>({
    mutationFn: (todo: Todo) =>
      axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
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

      onAdd();
    },

    onError: (error, newTodo, contex) => {
      if (!contex) return;

      queryClient.setQueryData<Todo[]>(["todos"], contex.prevTodos);
    },
  });
};

export default useAddTodo;
