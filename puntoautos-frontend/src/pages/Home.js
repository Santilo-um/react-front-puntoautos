import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "../AuthContext"; // importa el contexto
import logo from "../assets/logo.png";
import autos1 from "../images/autos1.jpg";
import camionetas1 from "../images/camionetas1.jpeg";
import motos1 from "../images/motos1.webp";
import otros1 from "../images/otros1.jpg";

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg shadow-sm" style={{ backgroundColor: "#00bcd4" }}>
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center text-white fw-bold" href="/home">
            <img src={logo} alt="Logo" width="40" height="40" className="me-2 rounded-circle" />
            PuntoAutos
          </a>

          <div className="d-flex align-items-center">
            {user ? (
              <>
                <span className="me-3 fw-semibold text-dark">
                  👋 Bienvenido, {user.email}
                </span>
                <a className="btn btn-outline-dark" href="/logout">
                  Cerrar sesión
                </a>
              </>
            ) : (
              <>
                <a className="btn btn-light me-2" href="/login">
                  Ingresar
                </a>
                <a className="btn btn-dark" href="/register">
                  Registrarse
                </a>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Info de la página */}
      <header className="text-center my-5">
        <h1 className="fw-bold display-5 text-dark">🚗 Bienvenido a PuntoAutos</h1>
        <p className="text-muted">La forma más rápida de comprar o vender tu vehículo</p>
        <div className="d-flex justify-content-center gap-3 mt-3">
          <a href="/register" className="btn btn-primary btn-lg shadow-sm">
            Crear cuenta
          </a>
          <a href="/login" className="btn btn-success btn-lg shadow-sm">
            Publica tu auto gratis
          </a>
        </div>
      </header>

      {/* Grid de imágenes */}
      <div className="container my-5">
        <div className="row g-4">
          <div className="col-md-3">
            <img src={autos1} alt="Autos" className="img-fluid rounded shadow-sm" />
            <p className="text-center mt-2 fw-semibold">Autos</p>
          </div>
          <div className="col-md-3">
            <img src={camionetas1} alt="Camionetas" className="img-fluid rounded shadow-sm" />
            <p className="text-center mt-2 fw-semibold">Camionetas</p>
          </div>
          <div className="col-md-3">
            <img src={motos1} alt="Motos" className="img-fluid rounded shadow-sm" />
            <p className="text-center mt-2 fw-semibold">Motos</p>
          </div>
          <div className="col-md-3">
            <img src={otros1} alt="Otros" className="img-fluid rounded shadow-sm" />
            <p className="text-center mt-2 fw-semibold">Otros</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-light py-4 mt-5" style={{ backgroundColor: "#00bcd4" }}>
        <div className="container d-flex justify-content-between align-items-center">
          <div>
            <img src={logo} alt="Logo" width="50" className="rounded-circle" />
          </div>
          <div>
            <span className="fw-semibold">🌐 Redes:</span> Facebook | Instagram
          </div>
          <div>
            <a href="/" className="text-white text-decoration-none fw-semibold">
              Términos y condiciones
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
