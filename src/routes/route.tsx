import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Layout from "../pages/Layout";
import ChatUI from "../pages/chatUI";
import PrivateRoute from "../components/PrivateRoute";
import ChatPage from "../pages/ChatPage";
import ChatLayout from "../pages/ChatLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <PrivateRoute />,
        children: [
          {
            path: "/",
            element: <ChatLayout />,
            children: [{ path: "chat/:id/", element: <ChatPage /> }],
          },
        ],
      },
    ],
  },
  { path: "login", element: <Login /> },
  { path: "register", element: <Register /> },
]);

export default router;
