import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props {
  path: string;
}

const PrivateRoute = ({ path }: Props) => {
  const { isLoggedIn } = useAuth();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const result = await isLoggedIn();
      setIsAuthenticated(result);
    };
    checkAuth();
  }, [isLoggedIn]);

  return isAuthenticated ? <Navigate to={path} /> : <Navigate to="/login" />;
};
export default PrivateRoute;
