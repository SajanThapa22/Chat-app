// src/components/common/ErrorBoundary.tsx
import { createBrowserRouter, useRouteError } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";
import ChatLayout from "../../layouts/ChatLayout";

const ErrorBoundary = () => {
  //   const error = useRouteError();

  return (
    <div className="error-container">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      {/* <p>
        <i>{error.statusText || error.message}</i>
      </p> */}
    </div>
  );
};

export default ErrorBoundary;

// In router configuration:
export const createAppRouter = () => {
  return createBrowserRouter([
    {
      path: "/chat",
      element: (
        <ProtectedRoute>
          <ChatLayout />
        </ProtectedRoute>
      ),
      errorElement: <ErrorBoundary />,
      // ...other route config
    },
    // ...other routes
  ]);
};
