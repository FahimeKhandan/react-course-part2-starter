import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CACHE_KEY_TODO } from "../constants";
import todoService, { Todo } from "../services/todoService";

interface TodoContex {
  prevTodos: Todo[];
}


const useAddTodo = (onAdd: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<Todo, Error, Todo, TodoContex>({
    mutationFn: todoService.post,
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

      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODO, (todos) =>
        todos?.map((todo) => (todo === newTodo ? savedTodo : todo))
      );

      onAdd();
    },

    onError: (error, newTodo, contex) => {
      if (!contex) return;

      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODO, contex.prevTodos);
    },
  });
};

export default useAddTodo;
