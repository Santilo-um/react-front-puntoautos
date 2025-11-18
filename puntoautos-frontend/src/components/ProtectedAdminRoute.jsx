import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { API_URL } from "../config"; 

function ProtectedAdminRoute({ children }) {
  const [isAdmin, setIsAdmin] = useState(null); // null = cargando

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAdmin(false);
      return;
    }

    const verificar = async () => {
      try {
        const res = await fetch(`${API_URL}/auth/es_admin/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setIsAdmin(data.admin === true);
      } catch (error) {
        setIsAdmin(false);
      }
    };

    verificar();
  }, []);

  if (isAdmin === null) {
    return <p className="text-center mt-5">Verificando permisos...</p>;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedAdminRoute;
