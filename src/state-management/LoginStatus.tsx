import { useContext } from "react";
import CurrentUserContext from "./context/currentuserContext";

const LoginStatus = () => {
  const { user, dispatch } = useContext(CurrentUserContext);

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
