import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

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
        const res = await fetch("http://127.0.0.1:8000/auth/es_admin/", {
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
