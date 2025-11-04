import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Navbar, Nav, Badge } from 'react-bootstrap'; // Removí Jumbotron del import
import axios from 'axios';
import './Home.css'; // Optional: Add your custom CSS here

const Home = () => {
  const [vehicles, setVehicles] = useState([]); // Featured vehicles
  const [categories, setCategories] = useState([]); // Vehicle categories
  const [searchQuery, setSearchQuery] = useState({ make: '', model: '', minPrice: '', maxPrice: '' });
  const [loading, setLoading] = useState(true);

  // Fetch featured vehicles from Django API (e.g., /api/featured-vehicles/)
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/featured-vehicles/'); // Replace with your Django URL
        setVehicles(response.data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
        // Fallback mock data
        setVehicles([
          { id: 1, make: 'Toyota', model: 'Camry', price: 25000, image: 'https://via.placeholder.com/300x200?text=Toyota+Camry', year: 2023 },
          { id: 2, make: 'Ford', model: 'F-150', price: 35000, image: 'https://via.placeholder.com/300x200?text=Ford+F-150', year: 2022 },
          { id: 3, make: 'Honda', model: 'Civic', price: 22000, image: 'https://via.placeholder.com/300x200?text=Honda+Civic', year: 2023 },
        ]);
      }
      setLoading(false);
    };
    fetchVehicles();
  }, []);

  // Fetch categories from Django API (e.g., /api/categories/)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/categories/'); // Replace with your Django URL
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Fallback mock data
        setCategories([
          { id: 1, name: 'Sedans', slug: 'sedans' },
          { id: 2, name: 'SUVs', slug: 'suvs' },
          { id: 3, name: 'Trucks', slug: 'trucks' },
          { id: 4, name: 'Electric', slug: 'electric' },
        ]);
      }
    };
    fetchCategories();
  }, []);

  // Handle search form submission (redirect to search results page or filter locally)
  const handleSearch = (e) => {
    e.preventDefault();
    // Example: Navigate to /search?make=${searchQuery.make}&... using React Router
    console.log('Searching for:', searchQuery);
    // You can integrate with React Router: history.push(`/search?${new URLSearchParams(searchQuery).toString()}`);
  };

  if (loading) {
    return <div className="text-center mt-5">Loading vehicles...</div>;
  }

  return (
    <>
      {/* Navigation Bar */}
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="/">VehicleMart</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/vehicles">Vehicles</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/cart">Cart</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section with Search (Reemplazo de Jumbotron) */}
      <div className="hero-section bg-primary text-white p-5 rounded mb-0"> {/* Clases de Bootstrap para replicar Jumbotron */}
        <Container>
          <h1 className="display-4 mb-3">Find Your Dream Vehicle</h1>
          <p className="lead mb-4">Browse thousands of new and used cars, trucks, and SUVs.</p>
          <Form onSubmit={handleSearch} className="d-flex justify-content-center flex-wrap">
            <Form.Group className="me-2 mb-2" style={{ minWidth: '150px' }}>
              <Form.Control
                type="text"
                placeholder="Make (e.g., Toyota)"
                value={searchQuery.make}
                onChange={(e) => setSearchQuery({ ...searchQuery, make: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="me-2 mb-2" style={{ minWidth: '150px' }}>
              <Form.Control
                type="text"
                placeholder="Model (e.g., Camry)"
                value={searchQuery.model}
                onChange={(e) => setSearchQuery({ ...searchQuery, model: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="me-2 mb-2" style={{ minWidth: '120px' }}>
              <Form.Control
                type="number"
                placeholder="Min Price"
                value={searchQuery.minPrice}
                onChange={(e) => setSearchQuery({ ...searchQuery, minPrice: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="me-2 mb-2" style={{ minWidth: '120px' }}>
              <Form.Control
                type="number"
                placeholder="Max Price"
                value={searchQuery.maxPrice}
                onChange={(e) => setSearchQuery({ ...searchQuery, maxPrice: e.target.value })}
              />
            </Form.Group>
            <Button variant="light" type="submit" className="mb-2">
              Search
            </Button>
          </Form>
        </Container>
      </div>

      {/* Featured Vehicles Section */}
      <Container className="my-5">
        <h2 className="text-center mb-4">Featured Vehicles</h2>
        <Row>
          {vehicles.map((vehicle) => (
            <Col md={4} key={vehicle.id} className="mb-4">
              <Card>
                <Card.Img variant="top" src={vehicle.image} alt={`${vehicle.make} ${vehicle.model}`} />
                <Card.Body>
                  <Card.Title>{vehicle.make} {vehicle.model} ({vehicle.year})</Card.Title>
                  <Card.Text>${vehicle.price.toLocaleString()}</Card.Text>
                  <Button variant="primary">View Details</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Categories Section */}
      <Container className="my-5">
        <h2 className="text-center mb-4">Browse by Category</h2>
        <Row className="justify-content-center">
          {categories.map((category) => (
            <Col md={3} key={category.id} className="text-center mb-3">
              <Badge bg="secondary" className="p-3" style={{ fontSize: '1.2em', cursor: 'pointer' }} onClick={() => console.log(`Navigate to /category/${category.slug}`)}>
                {category.name}
              </Badge>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Footer */}
      <footer className="bg-dark text-white py-4 mt-5">
        <Container>
          <Row>
            <Col md={6}>
              <h5>VehicleMart</h5>
              <p>Your one-stop shop for vehicles.</p>
            </Col>
            <Col md={6} className="text-md-end">
              <p>&copy; 2023 VehicleMart. All rights reserved.</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Home;
