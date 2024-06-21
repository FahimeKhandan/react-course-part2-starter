import { createBrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";
import Layout from "./Layout";
import UserDetailPage from "./UserDetailPage";
import UsersPage from "./UsersPage";
import ErrorPage from "./ErrorPage";
import LoginPage from "./LoginPage";
import PrivateRouts from "./PrivateRouts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
    ],
  },
  {
    element: <PrivateRouts />,
    children: [
      {
        path: "/users",
        element: <UsersPage />,
        children: [{ path: ":id", element: <UserDetailPage /> }],
      },
    ],
  },
]);

export default router;
