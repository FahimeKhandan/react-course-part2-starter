import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_TODO } from "../constants";
import todoService, { Todo } from "../services/todoService";




const useTodos = () => {
  return useQuery<Todo[], Error>({
    queryKey: CACHE_KEY_TODO,
    queryFn: todoService.getAll,
  });
};

export default useTodos;
