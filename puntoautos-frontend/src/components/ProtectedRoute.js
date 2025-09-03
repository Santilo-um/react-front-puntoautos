import React from "react";
import { Navigate } from "react-router-dom";

// Simulación: validar si hay sesión
const isAuthenticated = () => {
  return localStorage.getItem("session") ? true : false;
};

function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRoute;
