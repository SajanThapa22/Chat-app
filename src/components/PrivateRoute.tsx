import React, { ReactNode, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CheckLogged from "../services/CheckLogged";
import ChatUI from "../pages/chatUI";
import ChatLayout from "../pages/ChatLayout";

interface Props {
  children: ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const { isLoggedIn } = useAuth();
  const { authenticated } = CheckLogged();
  const navigate = useNavigate();

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
