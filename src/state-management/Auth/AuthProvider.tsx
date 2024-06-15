import React, { ReactNode, useReducer } from "react";
import CurrentUserContext, { Action } from "./currentuserContext";

const loginReducer = (user: string, action: Action) => {
  switch (action.type) {
    case "LOGIN":
      return "Mosh Hamedani";
    case "LOGOUT":
      return "";
  }
};

interface Props {
  children: ReactNode;
}
const AuthProvider = ({ children }: Props) => {
  const [user, dispatch] = useReducer(loginReducer, "");

  return (
    <CurrentUserContext.Provider value={{ user, dispatch }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default AuthProvider;
