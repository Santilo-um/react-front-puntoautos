import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/logo.png";
import autos1 from "../images/autos1.jpg";
import camionetas1 from "../images/camionetas1.jpeg";
import motos1 from "../images/motos1.webp";
import otros1 from "../images/otros1.jpg";

function Home() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#00bcd4" }}>
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center" href="/">
            <img src={logo} alt="Logo" width="40" height="40" className="me-2" />
            <span className="fw-bold text-dark">PuntoAutos</span>
          </a>
          <a className="btn btn-outline-light" href="/login">
            Ingresar
          </a>
        </div>
      </nav>

      {/* Info de la página */}
      <header className="text-center my-4">
        <h2 className="fw-bold">PUNTO AUTOS</h2>
        <p>Cómo comprar · Cómo vender</p>
        <div className="d-flex justify-content-center gap-3">
          <a href="/register" className="btn btn-primary">
            Crear cuenta o ingresar
          </a>
          <a href="/publicar" className="btn btn-success">
            Publica tu auto gratis
          </a>
        </div>
      </header>

      {/* Grid de imágenes */}
      <div className="container my-5">
        <div className="row g-4">
          <div className="col-md-3">
            <img src={autos1} alt="Autos" width="1000" height="1000" className="img-fluid rounded shadow" />
          </div>
          <div className="col-md-3">
            <img src={camionetas1} alt="Camionetas" width="1000" height="1000" className="img-fluid rounded shadow" />
          </div>
          <div className="col-md-3">
            <img src={motos1} alt="Motos" width="1000" height="1000" className="img-fluid rounded shadow" />
          </div>
          <div className="col-md-3">
            <img src={otros1} alt="Otros" width="1000" height="1000" className="img-fluid rounded shadow" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-light py-3" style={{ backgroundColor: "#00bcd4" }}>
        <div className="container d-flex justify-content-between">
          <div>
            <img src={logo} alt="Logo" width="50" />
          </div>
          <div>Redes: Facebook | Instagram</div>
          <div>Términos y condiciones</div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
