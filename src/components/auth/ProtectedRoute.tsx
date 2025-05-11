import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ReactNode, useContext, useEffect } from "react";
import LoadingSpinner from "../common/LoadingSpinner";

// components/auth/ProtectedRoute.tsx
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);
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
