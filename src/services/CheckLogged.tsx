import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CheckLogged = () => {
  const { isLoggedIn } = useAuth();
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const result = await isLoggedIn();
      setAuthenticated(result);
      if (!result) navigate("/login");
      if (result) navigate("/");
    };

    checkAuth();
  }, [isLoggedIn]);

  return { authenticated };
};

export default CheckLogged;
