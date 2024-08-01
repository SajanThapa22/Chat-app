import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CheckLogged from "../services/CheckLogged";

const PrivateRoute: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const { authenticated } = CheckLogged();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const result = isLoggedIn();
      if (!result) {
        navigate("/login");
      }
    };

    checkAuth();
  }, [isLoggedIn, navigate]);

  return authenticated ? <Outlet /> : null;
};

export default PrivateRoute;
