import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CheckLogged = () => {
  const { isLoggedIn } = useAuth();
  const [authenticated, setAuthenticated] = useState<boolean | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const result = await isLoggedIn();
      setAuthenticated(result);
    };

    checkAuth();
  }, [isLoggedIn]);

  return { authenticated, setAuthenticated };
};

export default CheckLogged;
