import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import { AuthContext } from "./AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import PanelAdmin from "./pages/PanelAdmin";
import Publicar from "./pages/publicar";
import Perfil from "./pages/perfil"
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container mt-4">
          <Rutas />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;


/* ------------------------------------------- */
/* NAVBAR dinámico según login                 */
/* ------------------------------------------- */

function Navbar() {
  const { token } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <Link className="navbar-brand" to="/">PuntoAutos</Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">

          {/* Opciones solo si NO está logueado */}
          {!token && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/register">Registro</Link>
              </li>
            </>
          )}

          {/* Opciones solo si está logueado */}
          {token && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/publicar">Publicar</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/perfil">Mi Perfil</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/es_admin">Panel Admin</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/logout">Logout</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}


/* ------------------------------------------- */
/* RUTAS COMPLETAS                              */
/* ------------------------------------------- */

function Rutas() {
  return (
    <Routes>

      {/* Rutas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rutas protegidas */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/publicar"
        element={
          <ProtectedRoute>
            <Publicar />
          </ProtectedRoute>
        }
      />

      <Route
        path="/perfil"
        element={
          <ProtectedRoute>
            <Perfil />
          </ProtectedRoute>
        }
      />

      <Route
        path="/es_admin"
        element={
          <ProtectedAdminRoute>
            <PanelAdmin />
          </ProtectedAdminRoute>
        }
      />

      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
}




