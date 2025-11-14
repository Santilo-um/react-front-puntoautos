import React, { useEffect, useState } from "react";

function Perfil() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [solicitudesRealizadas, setSolicitudesRealizadas] = useState([]);
  const [solicitudesRecibidas, setSolicitudesRecibidas] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/auth/perfil/", {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = await res.json();

        setPublicaciones(data.publicaciones || []);
        setSolicitudesRealizadas(data.solicitudes_realizadas || []);
        setSolicitudesRecibidas(data.solicitudes_recibidas || []);

      } catch (err) {
        console.error("Error cargando perfil:", err);
      }
    };

    fetchPerfil();
  }, [token]);

  return (
    <div className="container mt-4">
      <h2 className="text-primary mb-4">Mi Perfil</h2>

      {/* Publicaciones */}
      <h4 className="mt-3">Mis publicaciones</h4>
      {publicaciones.length === 0 ? (
        <p>No has publicado vehículos aún.</p>
      ) : (
        publicaciones.map(v => (
          <div key={v.id} className="card p-3 mb-3">
            <h5>{v.marca} {v.modelo} ({v.año})</h5>
            <p>{v.descripcion}</p>
            <p><strong>Precio:</strong> ${v.precio}</p>
            <p><strong>Estado:</strong> {v.estado}</p>
          </div>
        ))
      )}

      {/* Solicitudes enviadas */}
      <h4 className="mt-4">Solicitudes enviadas</h4>
      {solicitudesRealizadas.length === 0 ? (
        <p>No has enviado solicitudes.</p>
      ) : (
        solicitudesRealizadas.map(s => (
          <div key={s.id} className="card p-3 mb-3">
            <p><strong>Vehículo:</strong> #{s.vehiculo}</p>
            <p><strong>Estado:</strong> {s.estado}</p>
            <p><strong>Mensaje:</strong> {s.mensaje || "Sin mensaje"}</p>
          </div>
        ))
      )}

      {/* Solicitudes recibidas */}
      <h4 className="mt-4">Solicitudes recibidas</h4>
      {solicitudesRecibidas.length === 0 ? (
        <p>No tienes solicitudes nuevas.</p>
      ) : (
        solicitudesRecibidas.map(s => (
          <div key={s.id} className="card p-3 mb-3">
            <p><strong>De:</strong> {s.solicitante}</p>
            <p><strong>Vehículo:</strong> #{s.vehiculo}</p>
            <p><strong>Estado:</strong> {s.estado}</p>
            <p><strong>Mensaje:</strong> {s.mensaje || "Sin mensaje"}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Perfil;
