import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "./useTodos";
import ApiClient from "../services/apiClient";
import { CACHE_KEY_TODO } from "../constants";

interface TodoContex {
  prevTodos: Todo[];
}

const apiClient = new ApiClient<Todo>("/todos");

const useAddTodo = (onAdd: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<Todo, Error, Todo, TodoContex>({
    mutationFn: apiClient.post,
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
