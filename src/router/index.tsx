// src/router/index.tsx
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { lazy, Suspense } from "react";

// Layouts
import RootLayout from "../layouts/RootLayout";

// Components
import LoadingScreen from "../components/common/LoadingScreen";
import ErrorBoundary from "../components/common/ErrorBoundary";
import DefaultMessage from "../pages/chat/DefaultMessage";

// Lazy loaded pages for better performance
const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));
const ChatLayout = lazy(() => import("../layouts/ChatLayout"));
const ChatWindow = lazy(() => import("../components/chat/ChatWindow"));
const NotFound = lazy(() => import("../pages/NotFount"));

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// Public route wrapper
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? <>{children}</> : <Navigate to="/chat" replace />;
};

// Create router with route definitions
export const createAppRouter = () => {
  const { isAuthenticated } = useAuth();

  return createBrowserRouter([
    {
      path: "/",
      element: <Navigate to={isAuthenticated ? "/" : "/login"} replace />,
    },
    {
      path: "/",
      element: <ChatLayout />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          index: true,
          element: <DefaultMessage />,
        },

        {
          path: "chat/:id/",
          element: (
            <ProtectedRoute>
              <ChatWindow />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "login",
      element: (
        <PublicRoute>
          <Suspense fallback={<LoadingScreen />}>
            <Login />
          </Suspense>
        </PublicRoute>
      ),
    },
    {
      path: "register",
      element: (
        <PublicRoute>
          <Suspense fallback={<LoadingScreen />}>
            <Register />
          </Suspense>
        </PublicRoute>
      ),
    },
    {
      path: "*",
      element: (
        <Suspense fallback={<LoadingScreen />}>
          <NotFound />
        </Suspense>
      ),
    },
  ]);
};

export const Router = () => {
  const { isLoading, initialCheckDone } = useAuth();
  const router = createAppRouter();

  if (isLoading && !initialCheckDone) {
    return <LoadingScreen />;
  }

  return <RouterProvider router={router} />;
};
