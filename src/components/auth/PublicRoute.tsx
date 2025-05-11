import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import LoadingSpinner from "../common/LoadingSpinner";
import { ReactNode, useContext, useEffect } from "react";

// components/auth/PublicRoute.tsx (for login/register)
const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/chat");
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return !isAuthenticated ? <>{children}</> : null;
};

export default PublicRoute;
