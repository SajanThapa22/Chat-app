import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CheckLogged from "../services/CheckLogged";

const PrivateRoute: React.FC = () => {
  // const { isLoggedIn } = useAuth();
  // const [authenticated, setAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const result = await isLoggedIn();
  //     setAuthenticated(result);
  //     if (!result) {
  //       navigate("/login");
  //     }
  //   };

  //   checkAuth();
  // }, [isLoggedIn, navigate]);

  const { authenticated } = CheckLogged();

  return authenticated ? <Outlet /> : null;
};

export default PrivateRoute;
