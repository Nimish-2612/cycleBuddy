import React from "react";
import { Navigate } from "react-router-dom";
import Oops from "./Oops";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Oops />;
  }

  return children;
};

export default ProtectedRoute;
