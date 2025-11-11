import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

function ProtectedRoute({ children }) {
  const { user, token } = useContext(AuthContext);
  const storedToken = localStorage.getItem("access");

  // Si no hay usuario ni token válido, redirige al login
  if (!user && !token && !storedToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;