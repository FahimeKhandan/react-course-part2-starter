import { useReducer } from "react";
import "./App.css";
import taskReducer from "./state-management/reducers/tasksReducer";
import TaskContext from "./state-management/context/tasksContext";
import HomePage from "./state-management/HomePage";
import NavBar from "./state-management/NavBar";
import CurrentUserContext from "./state-management/context/currentuserContext";
import loginReducer from "./state-management/reducers/loginReducer";

function App() {
  const [tasks, dispatch] = useReducer(taskReducer, []);
  const [user, userDispatch] = useReducer(loginReducer, "");

  return (
    <CurrentUserContext.Provider value={{ user, dispatch: userDispatch }}>
      <TaskContext.Provider value={{ tasks, dispatch }}>
        <NavBar />
        <HomePage />
      </TaskContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
