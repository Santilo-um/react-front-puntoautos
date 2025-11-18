import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Navbar, Nav } from 'react-bootstrap';
import axios from 'axios';
import './Home.css';
import { API_URL } from "../config"; 

const Home = () => {
  const [vehicles, setVehicles] = useState([]);
  const [searchQuery] = useState({ make: '', model: '', minPrice: '', maxPrice: '' });
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(`${API_URL}/vehiculos/`);
        setVehicles(response.data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
        setVehicles([]);
      }
      setLoading(false);
    };
    fetchVehicles();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handleSolicitud = async (vehiculoId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Debes iniciar sesión para enviar una solicitud");
      return;
    }

    try {
      await axios.post(
        `${API_URL}/solicitudes/`,
        { vehiculo: vehiculoId, mensaje: "Estoy interesado en tu vehículo" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMensaje("Solicitud enviada con éxito");
      setTimeout(() => setMensaje(""), 3000);
    } catch (error) {
      console.error("Error al enviar solicitud:", error);
      setMensaje("No se pudo enviar la solicitud");
      setTimeout(() => setMensaje(""), 3000);
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Cargando vehículos...</div>;
  }

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="/">PuntoAutos</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link href="/">Inicio</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="hero-section bg-primary text-white p-5 rounded mb-0">
        <Container>
          <h1 className="display-4 mb-3">Encontrá tu próximo vehículo</h1>
          <Form onSubmit={handleSearch} className="d-flex justify-content-center flex-wrap">
            {/* Campos de búsqueda */}
          </Form>
        </Container>
      </div>

      <Container className="my-5">
        <h2 className="text-center mb-4">Publicaciones activas</h2>
        {mensaje && <div className="alert alert-info text-center">{mensaje}</div>}
        <Row>
          {vehicles.map((v) => (
            <Col md={4} key={v.id} className="mb-4">
              <Card>
                <Card.Img variant="top" src={v.imagen || "https://via.placeholder.com/300x200?text=Vehículo"} />
                <Card.Body>
                  <Card.Title>{v.marca} {v.modelo} ({v.año})</Card.Title>
                  <Card.Text>{v.descripcion}</Card.Text>
                  <Card.Text><strong>${v.precio}</strong></Card.Text>
                  <Button variant="success" onClick={() => handleSolicitud(v.id)}>Solicitar</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <footer className="bg-dark text-white py-4 mt-5">
        <Container>
          <Row>
            <Col md={6}><h5>PuntoAutos</h5><p>Tu lugar para comprar y vender vehículos.</p></Col>
            <Col md={6} className="text-md-end">&copy; 2025 PuntoAutos</Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Home;
