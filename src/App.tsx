import { useReducer } from "react";
import "./App.css";
import AuthProvider from "./state-management/AuthProvider";
import HomePage from "./state-management/HomePage";
import NavBar from "./state-management/NavBar";
import TaskContext from "./state-management/context/tasksContext";
import taskReducer from "./state-management/reducers/tasksReducer";

function App() {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  return (
    <AuthProvider>
      <TaskContext.Provider value={{ tasks, dispatch }}>
        <NavBar />
        <HomePage />
      </TaskContext.Provider>
    </AuthProvider>
  );
}

export default App;
