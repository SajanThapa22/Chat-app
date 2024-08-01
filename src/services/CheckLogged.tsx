import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CheckLogged = () => {
  const { isLoggedIn, fetchNewToken } = useAuth();
  const [authenticated, setAuthenticated] = useState<boolean | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const result = isLoggedIn();
      setAuthenticated(result);
    };

    checkAuth();
  }, [isLoggedIn]);

  return { authenticated, setAuthenticated };
};

export default CheckLogged;
