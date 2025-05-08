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
import ChatLayout from "../layouts/ChatLayout";

// Components
import LoadingScreen from "../components/common/LoadingScreen";
import ErrorBoundary from "../components/common/ErrorBoundary";

// Lazy loaded pages for better performance
const Login = lazy(() => import("../pages/Auth/Login"));
const Register = lazy(() => import("../pages/Auth/Register"));
const ChatHome = lazy(() => import("../pages/Chat/ChatHome"));
const ChatDetail = lazy(() => import("../pages/Chat/ChatDetail"));
const NotFound = lazy(() => import("../pages/NotFound"));

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
      element: <Navigate to={isAuthenticated ? "/chat" : "/login"} replace />,
    },
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorBoundary />,
      children: [
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
      ],
    },
    {
      path: "/chat",
      element: (
        <ProtectedRoute>
          <ChatLayout />
        </ProtectedRoute>
      ),
      errorElement: <ErrorBoundary />,
      children: [
        {
          path: "",
          element: (
            <Suspense fallback={<LoadingScreen />}>
              <ChatHome />
            </Suspense>
          ),
        },
        {
          path: ":chatId",
          element: (
            <Suspense fallback={<LoadingScreen />}>
              <ChatDetail />
            </Suspense>
          ),
          loader: async ({ params }) => {
            // You could load the chat data here
            return { chatId: params.chatId };
          },
        },
      ],
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

// Router component that handles auth loading state
export const Router = () => {
  const { isLoading, initialCheckDone } = useAuth();
  const router = createAppRouter();

  if (isLoading && !initialCheckDone) {
    return <LoadingScreen />;
  }

  return <RouterProvider router={router} />;
};
