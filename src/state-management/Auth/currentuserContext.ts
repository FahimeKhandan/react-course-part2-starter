import React, { Dispatch } from "react";

export interface Action {
  type: "LOGIN" | "LOGOUT";
}

interface CurrentUserContextType {
  user: string;
  dispatch: Dispatch<Action>;
}

const CurrentUserContext = React.createContext({} as CurrentUserContextType);

export default CurrentUserContext;
