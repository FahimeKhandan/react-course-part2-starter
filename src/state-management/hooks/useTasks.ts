import { useContext } from "react";
import TaskContext from "../context/tasksContext";

const useTasks = () => useContext(TaskContext);

export default useTasks;
