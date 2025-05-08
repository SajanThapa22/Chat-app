import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { ReactNode, useEffect } from "react";
import LoadingSpinner from "../common/LoadingSpinner";

// components/auth/ProtectedRoute.tsx
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;
