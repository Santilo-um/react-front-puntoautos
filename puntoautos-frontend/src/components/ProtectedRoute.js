import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

function ProtectedRoute({ children }) {
  const { token } = useContext(AuthContext);
  const storedToken = localStorage.getItem("token"); // Asegurate que usás "token", no "access"

  // Si no hay token en contexto ni en localStorage, redirige al login
  if (!token && !storedToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;