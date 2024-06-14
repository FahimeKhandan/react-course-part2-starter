import { useContext } from "react";
import CurrentUserContext from "../context/currentuserContext";

const useAuth = () => useContext(CurrentUserContext);

export default useAuth;
