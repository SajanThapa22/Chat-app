import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "../components/PrivateRoute";
import ChatPage from "../pages/ChatPage";
import DefaultMessage from "../pages/DefaultMessage";
import ChatLayout from "../pages/ChatLayout";
import ChatUI from "../pages/chatUI";
import { useState, useEffect } from "react";

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowWidth;
};

const createRoutes = (windowWidth: number) => [
  {
    path: "/",
    element: (
      <PrivateRoute>
        <ChatLayout />
      </PrivateRoute>
    ),
    children:
      windowWidth > 750
        ? [
            {
              index: true,
              element: <DefaultMessage />,
            },
            {
              path: "chat/:id/",
              element: (
                <PrivateRoute>
                  <ChatPage />
                </PrivateRoute>
              ),
            },
          ]
        : [
            {
              index: true,
              element: (
                <PrivateRoute>
                  <ChatUI />
                </PrivateRoute>
              ),
            },
            {
              path: "chat/:id/",
              element: (
                <PrivateRoute>
                  <ChatPage />
                </PrivateRoute>
              ),
            },
          ],
  },

  { path: "login", element: <Login /> },
  { path: "register", element: <Register /> },
];

export const useAppRouter = () => {
  const windowWidth = useWindowWidth();
  const routes = createRoutes(windowWidth);
  return createBrowserRouter(routes);
};

//  [
//       {
//         path: "chat/:id/",
//         element: (
//           <PrivateRoute>
//             <ChatPage />
//           </PrivateRoute>
//         ),
//       },
//     ],
