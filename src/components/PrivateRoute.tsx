import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const result = await isLoggedIn();
      setAuthenticated(result);
      if (!result) {
        navigate("/login");
      }
    };

    checkAuth();
  }, [isLoggedIn, navigate]);

  return authenticated ? <Outlet /> : null;
};

export default PrivateRoute;
