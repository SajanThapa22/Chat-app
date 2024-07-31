import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CheckLogged from "../services/CheckLogged";

const PrivateRoute: React.FC = () => {
  const navigate = useNavigate();

  const { authenticated } = CheckLogged();

  return authenticated ? <Outlet /> : null;
};

export default PrivateRoute;
