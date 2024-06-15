import { useContext } from "react";
import CurrentUserContext from "./currentuserContext";

const useAuth = () => useContext(CurrentUserContext);

const LoginStatus = () => {
  const { user, dispatch } = useAuth();

  if (user)
    return (
      <>
        <div>
          <span className="mx-2">{user}</span>
          <a onClick={() => dispatch({ type: "LOGOUT" })} href="#">
            Logout
          </a>
        </div>
      </>
    );
  return (
    <div>
      <a onClick={() => dispatch({ type: "LOGIN" })} href="#">
        Login
      </a>
    </div>
  );
};

export default LoginStatus;
