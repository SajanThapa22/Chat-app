import React, { Component, useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CheckLogged from "../services/CheckLogged";

const PrivateRoute = () => {
  const { isLoggedIn } = useAuth();
  const { authenticated } = CheckLogged();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const checkAuth = () => {
  //     const result = isLoggedIn();
  //     setAuthenticated(result);
  //     if (!result) {
  //       navigate("/login");
  //     } else {
  //       navigate("/");
  //     }
  //   };

  //   checkAuth();
  // }, [isLoggedIn]);

  return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
