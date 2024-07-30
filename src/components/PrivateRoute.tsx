import React from "react";
import { Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface PrivateRouteProps {
  component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { isLoggedIn } = useAuth();
  const [authenticated, setAuthenticated] = React.useState<boolean>(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const checkAuth = async () => {
      const result = await isLoggedIn();
      setAuthenticated(result);
      if (!result) {
        navigate("/login");
      }
    };

    checkAuth();
  }, [isLoggedIn, navigate]);

  return authenticated ? <Route {...rest} element={<Component />} /> : null;
};

export default PrivateRoute;
