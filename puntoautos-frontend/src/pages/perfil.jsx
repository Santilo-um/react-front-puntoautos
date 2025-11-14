import React, { useEffect, useState } from "react";

function Perfil() {
  const [vehiculos, setVehiculos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [formEdit, setFormEdit] = useState({});
  const token = localStorage.getItem("token");
  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/vehiculos/", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();

        // ✅ Filtrar publicaciones del usuario actual
        const propios = data.filter(v => v.vendedor?.id === userId);
        setVehiculos(propios);
      } catch (err) {
        console.error("Error al cargar vehículos:", err);
      }
    };
    fetchData();
  }, [token, userId]);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar esta publicación?")) return;
    try {
      await fetch(`http://127.0.0.1:8000/vehiculos/${id}/`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      setVehiculos(vehiculos.filter(v => v.id !== id));
    } catch (err) {
      console.error("Error al eliminar:", err);
    }
  };

  const handleEdit = (vehiculo) => {
    setEditandoId(vehiculo.id);
    setFormEdit({
      marca: vehiculo.marca,
      modelo: vehiculo.modelo,
      año: vehiculo.año,
      precio: vehiculo.precio,
      descripcion: vehiculo.descripcion
    });
  };

  const handleEditChange = (e) => {
    setFormEdit({ ...formEdit, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (id) => {
    try {
      await fetch(`http://127.0.0.1:8000/vehiculos/${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formEdit)
      });
      setEditandoId(null);
      const updated = vehiculos.map(v => v.id === id ? { ...v, ...formEdit } : v);
      setVehiculos(updated);
    } catch (err) {
      console.error("Error al editar:", err);
    }
  };

  // ✅ Activar/desactivar publicación
  const toggleActivo = async (id, nuevoEstado) => {
    try {
      await fetch(`http://127.0.0.1:8000/vehiculos/${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ activo: nuevoEstado })
      });
      setVehiculos(prev =>
        prev.map(v => v.id === id ? { ...v, activo: nuevoEstado } : v)
      );
    } catch (err) {
      console.error("Error al cambiar estado activo:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-primary">Mi Perfil</h2>

      <h4>Mis publicaciones</h4>
      {vehiculos.length === 0 ? (
        <p>No has publicado vehículos aún.</p>
      ) : (
        vehiculos.map(v => (
          <div key={v.id} className="card mb-3 p-3">
            {editandoId === v.id ? (
              <>
                <input name="marca" value={formEdit.marca} onChange={handleEditChange} className="form-control mb-2" />
                <input name="modelo" value={formEdit.modelo} onChange={handleEditChange} className="form-control mb-2" />
                <input name="año" value={formEdit.año} onChange={handleEditChange} className="form-control mb-2" />
                <input name="precio" value={formEdit.precio} onChange={handleEditChange} className="form-control mb-2" />
                <textarea name="descripcion" value={formEdit.descripcion} onChange={handleEditChange} className="form-control mb-2" />
                <button className="btn btn-success me-2" onClick={() => handleEditSubmit(v.id)}>Guardar</button>
                <button className="btn btn-secondary" onClick={() => setEditandoId(null)}>Cancelar</button>
              </>
            ) : (
              <>
                <h5>{v.marca} {v.modelo} ({v.año})</h5>
                <p>{v.descripcion}</p>
                <p><strong>${v.precio}</strong></p>
                <p><strong>Estado:</strong> {v.estado || "Sin estado"}</p>
                <p><strong>Activo:</strong> {v.activo ? "✅ Activa" : "❌ Inactiva"}</p>
                <button className="btn btn-warning me-2" onClick={() => handleEdit(v)}>Editar</button>
                <button className="btn btn-danger me-2" onClick={() => handleDelete(v.id)}>Eliminar</button>
                <button
                  className={`btn ${v.activo ? "btn-secondary" : "btn-success"}`}
                  onClick={() => toggleActivo(v.id, !v.activo)}
                >
                  {v.activo ? "Desactivar" : "Activar"}
                </button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Perfil;