import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

function Logout() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4 text-center" style={{ width: "400px" }}>
        <h2 className="fw-bold mb-4 text-danger">Cerrar Sesión</h2>
        <p className="mb-4">¿Seguro que deseas salir de tu cuenta?</p>
        <button
          onClick={handleLogout}
          className="btn btn-danger w-100 btn-lg"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

export default Logout;

