import { Action } from "../context/tasksContext";

export interface AddTask {
  type: "ADD";
  task: Task;
}

export interface Delete {
  type: "DELETE";
  id: number;
}

export interface Task {
  id: number;
  title: string;
}

const taskReducer = (tasks: Task[], action: Action) => {
  switch (action.type) {
    case "ADD":
      return [...tasks, action.task];
    case "DELETE":
      return tasks.filter((task) => task.id !== action.id);
  }
};

export default taskReducer;
