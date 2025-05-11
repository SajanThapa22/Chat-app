// src/components/common/ErrorBoundary.tsx
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorBoundary = () => {
  const error = useRouteError();

  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    // If it's a recognized route error from React Router
    errorMessage = error.statusText;
  } else if (error instanceof Error) {
    // If it's a native JS error
    errorMessage = error.message;
  } else {
    // Fallback for unknown errors
    errorMessage = "An unknown error occurred.";
  }

  return (
    <div className="error-container">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{errorMessage}</i>
      </p>
    </div>
  );
};

export default ErrorBoundary;
