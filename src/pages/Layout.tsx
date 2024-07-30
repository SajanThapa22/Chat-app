import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import PrivateRoute from "../components/PrivateRoute";
import ChatUI from "./chatUI";
import Login from "./Login";

const Layout = () => {
  return (
    <AuthProvider>
      <PrivateRoute component={<Login />} />
    </AuthProvider>
  );
};

export default Layout;
