import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "../components/PrivateRoute";
import ChatPage from "../pages/ChatPage";
import ChatLayout from "../pages/ChatLayout";
import DefaultMessage from "../pages/DefaultMessage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        path: "/",
        element: <ChatLayout />,
        children: [
          { index: true, element: <DefaultMessage /> },
          { path: "chat/:id/", element: <ChatPage /> },
        ],
      },
    ],
  },

  { path: "login", element: <Login /> },
  { path: "register", element: <Register /> },
]);

export default router;
