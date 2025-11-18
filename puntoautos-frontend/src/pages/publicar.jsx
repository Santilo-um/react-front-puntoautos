// Publicar.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { API_URL } from "../config"; 

function Publicar() {
  const [form, setForm] = useState({
    marca: "",
    modelo: "",
    año: "",
    tipo: "",
    precio: "",
    descripcion: "",
    activo: true,
    imagen: null
  });
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setMensaje("");

  const token = localStorage.getItem("token");
  if (!token) {
    setError("Debes iniciar sesión para publicar un vehículo");
    return;
  }

  const formData = new FormData();
  Object.entries(form).forEach(([key, value]) => {
    formData.append(key, key === "activo" ? String(value) : value);
  });

  try {
    const response = await fetch(`${API_URL}/vehiculos/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    if (!response.ok) {
      setError("Error al publicar el vehículo");
      return;
    }

    setMensaje("Vehículo publicado con éxito");
    setTimeout(() => navigate("/"), 2000);
  } catch (err) {
    console.error("Error completo:", err);
    setError("No se pudo conectar con el servidor");
  }
};

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-primary">Publicar Vehículo</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow-lg">
        <div className="mb-3">
            <label className="form-label">Imagen</label>
            <input type="file" name="imagen" className="form-control" accept="image/*" onChange={(e) => setForm({ ...form, imagen: e.target.files[0] })}/>
        </div>
        <div className="mb-3">
          <label className="form-label">Marca</label>
          <input type="text" name="marca" className="form-control" value={form.marca} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Modelo</label>
          <input type="text" name="modelo" className="form-control" value={form.modelo} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Año</label>
          <input type="number" name="año" className="form-control" value={form.año} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Tipo</label>
          <select name="tipo" className="form-select" value={form.tipo} onChange={handleChange} required>
            <option value="">Seleccionar</option>
            <option value="auto">Auto</option>
            <option value="camioneta">Camioneta</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Precio</label>
          <input type="number" name="precio" className="form-control" value={form.precio} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea name="descripcion" className="form-control" rows="3" value={form.descripcion} onChange={handleChange} required />
        </div>
        {error && <div className="alert alert-danger text-center">{error}</div>}
        {mensaje && <div className="alert alert-success text-center">{mensaje}</div>}
        <button type="submit" className="btn btn-primary w-100">Publicar</button>
      </form>
    </div>
  );
}

export default Publicar;