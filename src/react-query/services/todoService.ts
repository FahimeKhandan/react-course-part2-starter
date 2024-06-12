import ApiClient from "./apiClient";

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

const apiClient = new ApiClient<Todo>("/todos");

export default apiClient;
