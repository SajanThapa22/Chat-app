import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const [authenticated, setAuthenticated] = useState<boolean>();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const result = isLoggedIn();
      setAuthenticated(result);
      if (!result) {
        navigate("/login");
      } else {
        navigate("/");
      }
    };

    checkAuth();
  }, [isLoggedIn]);

  return authenticated ? <Outlet /> : null;
};

export default PrivateRoute;
