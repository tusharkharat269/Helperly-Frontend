import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import useAuthAxios from '../api/useAuthAxios';
import {useNavigate} from 'react-router';

const ShowAllServices = () => {
    const api = useAuthAxios();
    const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
    //   await new Promise(resolve => setTimeout(resolve, 1000));
      const res = await api.get("/api/services");
      const servicesData = res.data;
      setServices(Array.isArray(servicesData) ? servicesData : servicesData.services);
      setError(null);
    } catch (err) {
      setError('Failed to fetch services. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewHelpers = async (category) => {
  try {
    // Optional: prefetch helpers (not necessary if fetching on target page)
    const res = await api.get(`/api/helpers/category/${category}`);
    console.log('Fetched Helpers:', res.data); // Optional debug

    // Navigate to the helpers page with query param
    navigate(`/helpers?category=${category}`);
  } catch (err) {
    console.error('Error fetching helpers:', err);
  }
};


  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <Spinner animation="border" variant="primary" className="mb-3" />
          <p className="text-muted">Loading services...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger" className="text-center">
          <Alert.Heading>Error!</Alert.Heading>
          <p>{error}</p>
          <Button variant="outline-danger" onClick={fetchServices}>
            Try Again
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col className="text-center">
          <h1 className="display-4 fw-bold text-dark mb-3">Our Services</h1>
          <p className="lead text-muted">Choose from our professional service categories</p>
        </Col>
      </Row>

      <Row>
        {services.map((service) => (
          <Col lg={4} md={6} className="mb-4" key={service.serviceId}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Header className={`bg-dark text-white`}>
                <div className="d-flex align-items-center">
                  <Card.Title className="mb-0 fw-bold">{service.category}</Card.Title>
                </div>
              </Card.Header>
              
              <Card.Body className="d-flex flex-column">
                <Card.Text className="text-muted mb-3">{service.description}</Card.Text>
                
                <div className="mt-auto">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-muted">Starting from</span>
                    <span className="h4 text-success fw-bold mb-0">₹{service.basePrice}</span>
                  </div>
                  
                  <div className="d-grid gap-2">
                    <Button
                        className='bg-dark'
                      size="lg"
                      onClick={() => handleViewHelpers(service.category)}
                    >
                      View Available Helpers
                    </Button>
                    <Button variant="outline-secondary">
                      🛒 Add to Cart
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ShowAllServices;