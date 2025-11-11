import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import ProtectedRoute from "./components/ProtectedRoute";
import Publicar from "./pages/publicar";
import Perfil from "./pages/perfil"
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <AuthProvider>
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
          <Link className="navbar-brand" to="/">PuntoAutos</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/login"></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register"></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/publicar">Publicar</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/perfil">Mi Perfil</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/logout">Logout</Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />

            <Route path="/publicar" element={<ProtectedRoute><Publicar /></ProtectedRoute>}/>

            {/* Ruta protegida: Home */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            {/* Ruta protegida de prueba */}
            <Route
              path="/protected"
              element={
                <ProtectedRoute>
                  <h2 className="text-center">Zona protegida: solo usuarios logueados</h2>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;




