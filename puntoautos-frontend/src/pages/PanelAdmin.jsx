import React, { useEffect, useState } from "react";
import { Badge, Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function PanelAdmin() {
  const [vehiculos, setVehiculos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://127.0.0.1:8000/vehiculos/", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then(setVehiculos)
      .catch((err) => console.error("Error al cargar vehículos:", err));
  }, []);

  const toggleActivo = async (id, nuevoEstado) => {
    const token = localStorage.getItem("token");
    await fetch(`http://127.0.0.1:8000/vehiculos/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ activo: nuevoEstado })
    });

    setVehiculos((prev) =>
      prev.map((v) => (v.id === id ? { ...v, activo: nuevoEstado } : v))
    );
  };

  const cambiarEstado = async (id, nuevoEstado) => {
    const token = localStorage.getItem("token");
    await fetch(`http://127.0.0.1:8000/vehiculos/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ estado: nuevoEstado })
    });

    setVehiculos((prev) =>
      prev.map((v) => (v.id === id ? { ...v, estado: nuevoEstado } : v))
    );
  };

  const eliminarVehiculo = async (id) => {
    const token = localStorage.getItem("token");
    await fetch(`http://127.0.0.1:8000/vehiculos/${id}/`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    setVehiculos((prev) => prev.filter((v) => v.id !== id));
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center text-danger mb-4">Panel de Publicaciones (Admin)</h2>
      <Row>
        {vehiculos.map((v) => (
          <Col md={4} key={v.id} className="mb-4">
            <Card>
              <Card.Img variant="top" src={v.imagen || "https://via.placeholder.com/300x200"} />
              <Card.Body>
                <Card.Title>{v.marca} {v.modelo} ({v.año})</Card.Title>
                <Card.Text>
                  Precio: ${v.precio}
                  <br />
                  <strong>Estado:</strong>{" "}
                  <Badge bg={
                    v.estado === "vendido" ? "danger" :
                    v.estado === "pausado" ? "secondary" :
                    "success"
                  }>
                    {v.estado}
                  </Badge>
                  <br />
                  <strong>Activo:</strong>{" "}
                  <Badge bg={v.activo ? "success" : "secondary"}>
                    {v.activo ? "Sí" : "No"}
                  </Badge>
                </Card.Text>

                {/* Cambiar estado */}
                <Form.Select
                  value={v.estado}
                  onChange={(e) => cambiarEstado(v.id, e.target.value)}
                  className="mb-2"
                >
                  <option value="disponible">Disponible</option>
                  <option value="vendido">Vendido</option>
                  <option value="pausado">Pausado</option>
                </Form.Select>

                {/* Activar/desactivar */}
                <Button
                  variant={v.activo ? "warning" : "success"}
                  className="me-2"
                  onClick={() => toggleActivo(v.id, !v.activo)}
                >
                  {v.activo ? "Desactivar" : "Activar"}
                </Button>

                {/* Eliminar */}
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