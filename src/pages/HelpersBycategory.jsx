import React, { useState, useEffect, useContext } from 'react';
import { 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Award, 
  DollarSign,
  Calendar,
  User,
  Wrench
} from 'lucide-react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Spinner, 
  Alert, 
  Button, 
  Badge 
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import useAuthAxios from '../api/useAuthAxios';

const HelpersByCategory = () => {
  const api = useAuthAxios();

  const [helpers, setHelpers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const category = 'Electrician'; // Simulated category
  const { category } = useParams();

  useEffect(() => {
    const fetchHelpers = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));

        const res = await api.get(`/api/helpers/category/${category}`);
        const helperData = res.data;
        console.log(res.data)
        
        setHelpers(helperData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHelpers();
  }, [category]);

  const handleBookNow = async (helper) => {    
    try {
    const user = await api.get("/user/userInfo");
    const payload = {
      user: { userId: user.data.userId },
      helper: { helperId: helper.helperId },
      service: { serviceId: helper.service.serviceId },
      scheduledDate: "2025-07-20T14:30:00",
      status: "PENDING",
      location: user.data.address
    };

    // console.log(payload)
    const response = await api.post('/api/bookings', payload);
    // console.log('Booking response:', response.data);
    alert(`Booking ${helper.name} for ${helper.service.category} service`);

  } catch (error) {
    console.log('Error:', error.message);
  }
      
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'AVAILABLE': return 'success';
      case 'BUSY': return 'warning';
      case 'OFFLINE': return 'secondary';
      default: return 'primary';
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} size={16} fill="#fbbf24" stroke="#fbbf24" />
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <Star key="half" size={16} fill="#fbbf24" stroke="#fbbf24" />
      );
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} size={16} fill="none" stroke="#d1d5db" />
      );
    }
    
    return stars;
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="text-center">
          <Spinner animation="border" variant="primary" className="mb-3" />
          <p className="text-muted">Loading helpers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <Alert variant="danger" className="w-100 mx-4" style={{ maxWidth: '500px' }}>
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-vh-100 py-5" style={{ background: 'linear-gradient(to bottom right, #eff6ff, #e0e7ff)' }}>
      <Container>
        <Row className="justify-content-center mb-5">
          <Col md={10} lg={8} className="text-center">
            <h1 className="display-5 fw-bold mb-3 text-dark">
              {category} Services
            </h1>
            <p className="lead text-muted">
              Found {helpers.length} helper{helpers.length !== 1 ? 's' : ''} available
            </p>
          </Col>
        </Row>

        {helpers.length === 0 ? (
          <Row className="justify-content-center">
            <Col md={8}>
              <Alert variant="info" className="text-center">
                <h4 className="alert-heading">No helpers found</h4>
                <p className="mb-0">
                  There are currently no helpers available in the {category} category.
                </p>
              </Alert>
            </Col>
          </Row>
        ) : (
          <Row className="g-4 justify-content-center">
            {helpers.map((helper) => (
              <Col key={helper.helperId} md={10} lg={8}>
                <Card className="border-0 shadow-sm h-100 overflow-hidden">
                  <Card.Body className="p-4">
                    <div className="d-flex justify-content-between mb-4">
                      <div className="d-flex align-items-center">
                        <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-4">
                          <User size={24} className="text-primary" />
                        </div>
                        <div>
                          <Card.Title className="mb-0 fw-bold fs-4">{helper.name}</Card.Title>
                          <div className="d-flex align-items-center mt-2">
                            <Wrench size={16} className="text-muted me-2" />
                            <span className="text-muted">{helper.service.description}</span>
                          </div>
                        </div>
                      </div>
                      <Badge 
                        bg={getStatusVariant(helper.status)} 
                        className="align-self-start"
                      >
                        {helper.status}
                      </Badge>
                    </div>

                    <Row className="mb-4">
                      <Col md={6} className="mb-3 mb-md-0">
                        <div className="d-flex align-items-center mb-3">
                          <Mail size={16} className="text-muted me-3" />
                          <span>{helper.email}</span>
                        </div>
                        
                        <div className="d-flex align-items-center mb-3">
                          <Phone size={16} className="text-muted me-3" />
                          <span>{helper.contactNo}</span>
                        </div>
                        
                        <div className="d-flex align-items-center mb-3">
                          <MapPin size={16} className="text-muted me-3" />
                          <span>{helper.address}</span>
                        </div>
                        
                        <div className="d-flex align-items-center">
                          <Award size={16} className="text-muted me-3" />
                          <span>{helper.experienceYears} years experience</span>
                        </div>
                      </Col>

                      <Col md={6}>
                        <div className="d-flex flex-column h-100">
                          <div className="mb-4">
                            <div className="d-flex align-items-center mb-2">
                              <div className="d-flex me-2">
                                {renderStars(helper.rating)}
                              </div>
                              <span className="text-muted small">
                                {helper.rating === 0 ? 'No ratings yet' : `${helper.rating.toFixed(1)}`}
                              </span>
                            </div>
                            <div className="d-flex align-items-center text-success">
                              {/* <DollarSign size={20} className="me-1" /> */}
                              <span className="fs-4 fw-bold">₹{helper.service.basePrice}</span>
                            </div>
                          </div>

                          <Button 
                            variant={helper.status === 'AVAILABLE' ? 'primary' : 'secondary'}
                            size="lg"
                            className={`mt-auto w-100 d-flex align-items-center justify-content-center ${
                              helper.status !== 'AVAILABLE' ? 'disabled' : ''
                            }`}
                            onClick={() => handleBookNow(helper)}
                            disabled={helper.status !== 'AVAILABLE'}
                          >
                            <Calendar size={18} className="me-2" />
                            {helper.status === 'AVAILABLE' ? 'Book Now' : 'Not Available'}
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default HelpersByCategory;