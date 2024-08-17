import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CheckLogged from "../hooks/useCheckLogged";
import useCheckLogged from "../hooks/useCheckLogged";

interface Props {
  children: ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const { authenticated } = useCheckLogged();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      const result = await isLoggedIn();
      if (!result) {
        navigate("/login", { replace: true });
      }
    };
    checkAuth();
  }, [isLoggedIn, navigate]);

  return authenticated && <>{children}</>;
};

export default PrivateRoute;
