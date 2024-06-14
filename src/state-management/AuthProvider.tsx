import React, { ReactNode, useReducer } from "react";
import CurrentUserContext from "./context/currentuserContext";
import loginReducer from "./reducers/loginReducer";

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
