import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";
import { CACHE_KEY_TODO } from "../constants";

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

const apiClient = new ApiClient<Todo>("/todos");

const useTodos = () => {
  return useQuery<Todo[], Error>({
    queryKey: CACHE_KEY_TODO,
    queryFn: apiClient.getAll,
  });
};

export default useTodos;
