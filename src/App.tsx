import { useReducer } from "react";
import "./App.css";
import taskReducer from "./state-management/reducers/tasksReducer";
import TaskContext from "./state-management/context/tasksContext";
import HomePage from "./state-management/HomePage";
import NavBar from "./state-management/NavBar";

function App() {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      <NavBar/>
      <HomePage />
    </TaskContext.Provider>
  );
}

export default App;
