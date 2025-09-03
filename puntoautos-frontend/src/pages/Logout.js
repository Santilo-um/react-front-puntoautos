import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("session");
    navigate("/");
  };

  return (
    <div>
      <h2>¿Seguro que deseas salir?</h2>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}

export default Logout;
