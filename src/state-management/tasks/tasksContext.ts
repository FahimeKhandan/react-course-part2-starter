import React, { Dispatch } from "react";
import { AddTask, Delete, Task } from "./TaskProvider";

export type Action = AddTask | Delete;

interface TasksContexttype {
  tasks: Task[];
  dispatch: Dispatch<Action>;
}

const TaskContext = React.createContext<TasksContexttype>(
  {} as TasksContexttype
);

export default TaskContext;
