import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import CheckLogged from "../services/CheckLogged";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [authenticated, setAuthenticated] = useState<boolean>();

  useEffect(() => {
    const result = isLoggedIn();
    setAuthenticated(result);
  }, [isLoggedIn]);

  return authenticated ? <Outlet /> : null;
};

export default PrivateRoute;
