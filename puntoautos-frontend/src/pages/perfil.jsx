import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../AuthContext";

export default function Perfil() {
  const { token } = useContext(AuthContext);
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [telefono, setTelefono] = useState("");
  const [guardando, setGuardando] = useState(false);


  // -------------------------------
  // Cargar perfil autenticado
  // -------------------------------
  const cargarPerfil = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/auth/perfil/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // ⬅️ TOKEN JWT
        },
      });

      const data = await res.json();

      if (!res.ok) {
        console.log("Error backend:", data);
        return;
      }

      setPerfil(data);

      setTelefono(data.usuario.telefono || "");
    } catch (error) {
      console.error("Error cargando perfil:", error);
    } finally {
      setLoading(false);
    }
  };

  const guardarTelefono = async () => {
    setGuardando(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/auth/actualizar-telefono/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ telefono }),
      });

      if (res.ok) {
        alert("Teléfono actualizado correctamente");
        cargarPerfil(); // actualiza datos
      } else {
        alert("Error al guardar teléfono");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setGuardando(false);
  };


  // -------------------------------
  // ACEPTAR SOLICITUD
  // -------------------------------
  const aceptar = async (id) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/solicitud/${id}/aceptar/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        cargarPerfil();
      }
    } catch (error) {
      console.error("Error al aceptar solicitud:", error);
    }
  };

  // -------------------------------
  // RECHAZAR SOLICITUD
  // -------------------------------
  const rechazar = async (id) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/solicitud/${id}/rechazar/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        cargarPerfil();
      }
    } catch (error) {
      console.error("Error al rechazar solicitud:", error);
    }
  };

  // -------------------------------
  // ❌ ELIMINAR PUBLICACIÓN
  // -------------------------------
  const eliminarVehiculo = async (vehiculoId) => {
    const confirmar = window.confirm("¿Seguro que querés eliminar esta publicación?");
    if (!confirmar) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/vehiculos/${vehiculoId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 204) {
        alert("Publicación eliminada");
        cargarPerfil(); // refrescar publicaciones
      } else {
        alert("No se pudo eliminar la publicación");
      }
    } catch (error) {
      console.error("Error al eliminar publicación:", error);
    }
  };

  useEffect(() => {
    if (token) cargarPerfil();
  }, [token]);

  if (loading) return <p className="text-center mt-10">Cargando perfil...</p>;
  if (!perfil) return <p>No se pudo cargar el perfil.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Usuario */}
      <h1 className="text-3xl font-bold mb-4">Mi Perfil</h1>

      <div className="bg-white shadow rounded p-4 mb-8">
        <p className="text-lg font-semibold">Usuario:</p>
        <p>{perfil.usuario.email}</p>
      </div>
      <div className="bg-white p-4 shadow rounded mb-6">
        <h2 className="text-xl font-bold mb-2">Mi Información</h2>

        <label className="block font-semibold mb-1">Correo:</label>
        <p className="mb-4">{perfil.usuario.email}</p>

        <label className="block font-semibold mb-1">Número de teléfono:</label>
        <input
          type="text"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          className="border rounded p-2 w-full mb-3"/>

        <button
          onClick={guardarTelefono}
          disabled={guardando}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {guardando ? "Guardando..." : "Guardar teléfono"}
        </button>
      </div>


      {/* Publicaciones */}
      <h2 className="text-2xl font-bold mb-3">Mis Publicaciones</h2>

      {perfil.publicaciones.length === 0 && (
        <p className="text-gray-500 mb-6">No tenés vehículos publicados.</p>
      )}

      <div className="space-y-6">
        {perfil.publicaciones.map((vehiculo) => (
          <div
            key={vehiculo.vehiculo_id}
            className="bg-white shadow rounded p-4"
          >
            <h3 className="text-xl font-bold">
              {vehiculo.marca} {vehiculo.modelo}
            </h3>
            <p>Precio: ${vehiculo.precio}</p>
            <p>Estado: {vehiculo.estado}</p>

            {/* ❌ BOTÓN ELIMINAR PUBLICACIÓN */}
            <button
              onClick={() => eliminarVehiculo(vehiculo.vehiculo_id)}
              className="btn btn-danger"
            >
              Eliminar publicación
            </button>

            {/* Solicitudes recibidas */}
            <div className="mt-4">
              <p className="font-semibold mb-2">Solicitudes recibidas:</p>

              {vehiculo.solicitudes.length === 0 && (
                <p className="text-gray-500">No hay solicitudes aún.</p>
              )}

              <div className="space-y-3">
                {vehiculo.solicitudes.map((s) => (
                  <div
                    key={s.id}
                    className="border rounded p-3 bg-gray-50 flex flex-col"
                  >
                    <p>
                      <strong>Solicitante:</strong> {s.solicitante.email}
                    </p>
                    <p><strong>Teléfono:</strong> {s.solicitante.telefono || "No proporcionado"}</p>
                    <p>
                      <strong>Mensaje:</strong> {s.mensaje || "Sin mensaje"}
                    </p>

                    <p>
                      <strong>Estado:</strong>{" "}
                      <span
                        className={`${
                          s.estado === "pendiente"
                            ? "text-yellow-600"
                            : s.estado === "aceptada"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {s.estado}
                      </span>
                    </p>

                    {s.estado === "pendiente" && (
                      <div className="flex gap-3 mt-3">
                        <button
                          onClick={() => aceptar(s.id)}
                          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          Aceptar
                        </button>
                        <button
                          onClick={() => rechazar(s.id)}
                          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          Rechazar
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Solicitudes enviadas */}
      <h2 className="text-2xl font-bold mt-10 mb-3">Solicitudes Enviadas</h2>

      {perfil.solicitudes_enviadas.length === 0 && (
        <p className="text-gray-500">No enviaste solicitudes todavía.</p>
      )}

      <div className="space-y-4">
        {perfil.solicitudes_enviadas.map((s) => (
          <div key={s.id} className="bg-white shadow rounded p-4">
            <p>
              <strong>Vehículo:</strong> {s.vehiculo.marca} {s.vehiculo.modelo}
            </p>
            <p>
              <strong>Mensaje:</strong> {s.mensaje}
            </p>
            <p>
              <strong>Estado:</strong>{" "}
              <span
                className={`${
                  s.estado === "pendiente"
                    ? "text-yellow-600"
                    : s.estado === "aceptada"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {s.estado}
              </span>
            </p>
            <p className="text-sm text-gray-500">{s.fecha_solicitud}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
