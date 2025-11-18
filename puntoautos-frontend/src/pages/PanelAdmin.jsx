import React, { useEffect, useState } from "react";
import { Badge, Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function PanelAdmin() {
  const [vehiculos, setVehiculos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  // -------------------------------
  // 1. Validar si el usuario es admin
  // -------------------------------
  const verificarAdmin = async () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    try {
      const res = await fetch("http://127.0.0.1:8000/auth/es_admin/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!res.ok || !data.admin) {
        return navigate("/"); // No autorizado
      }

      cargarVehiculos(); // Si es admin, cargar publicaciones
    } catch (error) {
      console.error("Error verificando admin:", error);
      navigate("/");
    }
  };

  // -------------------------------
  // 2. Cargar vehículos
  // -------------------------------
  const cargarVehiculos = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://127.0.0.1:8000/vehiculos/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setVehiculos(data);
    } catch (error) {
      console.error("Error al cargar vehículos:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    const verificarAdmin = () => {
    // lógica
    };

    verificarAdmin();
  }, []);

  // -------------------------------
  // Cambiar activo/desactivo
  // -------------------------------
  const toggleActivo = async (id, nuevoEstado) => {
    const token = localStorage.getItem("token");

    await fetch(`http://127.0.0.1:8000/vehiculos/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ activo: nuevoEstado }),
    });

    setVehiculos((prev) =>
      prev.map((v) => (v.id === id ? { ...v, activo: nuevoEstado } : v))
    );
  };

  // -------------------------------
  // Cambiar estado (disponible/pausado/vendido)
  // -------------------------------
  const cambiarEstado = async (id, nuevoEstado) => {
    const token = localStorage.getItem("token");

    await fetch(`http://127.0.0.1:8000/vehiculos/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ estado: nuevoEstado }),
    });

    setVehiculos((prev) =>
      prev.map((v) => (v.id === id ? { ...v, estado: nuevoEstado } : v))
    );
  };

  // -------------------------------
  // Eliminar publicación
  // -------------------------------
  const eliminarVehiculo = async (id) => {
    if (!window.confirm("¿Seguro que querés eliminar esta publicación?")) return;

    const token = localStorage.getItem("token");

    await fetch(`http://127.0.0.1:8000/vehiculos/${id}/`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    setVehiculos((prev) => prev.filter((v) => v.id !== id));
  };

  if (cargando)
    return <p className="text-center mt-5 fw-bold">Cargando panel de administrador...</p>;

  return (
    <Container className="mt-5">
      <h2 className="text-center text-danger mb-4">Panel de Publicaciones (Admin)</h2>
      <Row>
        {vehiculos.map((v) => (
          <Col md={4} key={v.id} className="mb-4">
            <Card>
              <Card.Img variant="top" src={v.imagen || "https://via.placeholder.com/300x200"} />
              <Card.Body>
                <Card.Title>
                  {v.marca} {v.modelo} ({v.año})
                </Card.Title>

                <Card.Text>
                  Precio: ${v.precio}
                  <br />
                  <strong>Estado: </strong>
                  <Badge
                    bg={
                      v.estado === "vendido"
                        ? "danger"
                        : v.estado === "pausado"
                        ? "secondary"
                        : "success"
                    }
                  >
                    {v.estado}
                  </Badge>
                  <br />
                  <strong>Activo:</strong>{" "}
                  <Badge bg={v.activo ? "success" : "secondary"}>
                    {v.activo ? "Sí" : "No"}
                  </Badge>
                </Card.Text>

                {/* cambiar estado */}
                <Form.Select
                  value={v.estado}
                  onChange={(e) => cambiarEstado(v.id, e.target.value)}
                  className="mb-2"
                >
                  <option value="disponible">Disponible</option>
                  <option value="vendido">Vendido</option>
                  <option value="pausado">Pausado</option>
                </Form.Select>

                {/* activar/desactivar */}
                <Button
                  variant={v.activo ? "warning" : "success"}
                  className="me-2"
                  onClick={() => toggleActivo(v.id, !v.activo)}
                >
                  {v.activo ? "Desactivar" : "Activar"}
                </Button>

                {/* eliminar */}
                <Button variant="danger" onClick={() => eliminarVehiculo(v.id)}>
                  Eliminar
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default PanelAdmin;
