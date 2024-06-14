import { Action } from "../context/currentuserContext";

const loginReducer = (user: string, action: Action) => {
  switch (action.type) {
    case "LOGIN":
      return "Mosh Hamedani";
    case "LOGOUT":
      return "";
  }
};

export default loginReducer;
