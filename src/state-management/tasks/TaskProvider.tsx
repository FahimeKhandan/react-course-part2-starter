import { ReactNode, useReducer } from "react";
import TaskContext from "./tasksContext";
import { Action } from "./tasksContext";


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

const taskReducer = (tasks: Task[], action: Action): Task[] => {
  switch (action.type) {
    case "ADD":
      return [...tasks, action.task];
    case "DELETE":
      return tasks.filter((task) => task.id !== action.id);
    default:
      return [];
  }
};

interface Props {
  children: ReactNode;
}

const TaskProvider = ({ children }: Props) => {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
