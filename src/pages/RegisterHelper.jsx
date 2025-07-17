import React, { useEffect, useState } from 'react';
import {
  Container, Row, Col, Card, Form, Button,
  Alert, Spinner, InputGroup
} from 'react-bootstrap';
import useAuthAxios from '../api/useAuthAxios';

const RegisterHelper = () => {

  const api = useAuthAxios();

  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNo: '',
    password: '',
    address: '',
    serviceId: '',
    experienceYears: '',
    rating: 0.0,
    status: 'AVAILABLE'
  });

  const [errors, setErrors] = useState({});
  const [loadingServices, setLoadingServices] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Fetch services on load
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get('/api/services');
        setServices(response.data);
        const uniqueCategories = Array.from(new Set(response.data.map(s => s.category)));
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoadingServices(false);
      }
    };
    fetchServices();
  }, []);

  // console.log(services);
  // console.log(categories);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (e) => {
    setFormData(prev => ({ ...prev, serviceId: e.target.value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.contactNo.trim()) newErrors.contactNo = 'Contact number is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.serviceId) newErrors.serviceId = 'Service category is required';
    if (formData.experienceYears === '' || formData.experienceYears < 0)
      newErrors.experienceYears = 'Experience must be 0 or more';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitSuccess(false);
    setSubmitError('');
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        contactNo: formData.contactNo,
        password: formData.password,
        address: formData.address,
        service: { serviceId: formData.serviceId },
        experienceYears: Number(formData.experienceYears),
        rating: formData.rating,
        status: formData.status
      };

      console.log(payload);

      await api.post('/api/helpers/register-helper', payload);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        contactNo: '',
        password: '',
        address: '',
        serviceId: '',
        experienceYears: '',
        status: 'AVAILABLE'
      });
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError('Failed to register helper. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };




  return (
    <Container className="mt-5">
      <Card bg="light" text="dark" className="p-4 shadow-lg rounded-4">
        <Card.Title className="text-center mb-4 fs-3">Register as a Helper</Card.Title>
        {submitSuccess && (
          <Alert variant="success" className="mb-3">
            Registration successful! Welcome to our team.
          </Alert>
        )}

        {submitError && (
          <Alert variant="danger" className="mb-3">
            {submitError}
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="bg-light text-dark"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="bg-light text-dark"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="contactNo">
                <Form.Label>Contact No</Form.Label>
                <Form.Control
                  type="tel"
                  name="contactNo"
                  value={formData.contactNo}
                  onChange={handleChange}
                  placeholder="Enter contact number"
                  required
                  className="bg-light text-dark"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  required
                  className="bg-light text-dark"
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="address" className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              required
              className="bg-light text-dark"
            />
          </Form.Group>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="category">
                <Form.Label>Select Category</Form.Label>
                <Form.Select
                  value={formData.serviceId}
                  onChange={handleServiceChange}
                  className="bg-light text-dark"
                  required
                >
                  <option value="">-- Select Service --</option>
                  {services.map(service => (
                    <option key={service.serviceId} value={service.serviceId}>
                      {service.category}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="experienceYears">
                <Form.Label>Experience (Years)</Form.Label>
                <Form.Control
                  type="number"
                  name="experienceYears"
                  value={formData.experienceYears}
                  onChange={handleChange}
                  placeholder="0"
                  required
                  min="0"
                  className="bg-light text-dark"
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="status">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="bg-light text-dark"
                >
                  <option value="AVAILABLE">Available</option>
                  <option value="BUSY">Busy</option>
                  <option value="INACTIVE">Inactive</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <div className="text-center">
            <Button variant="outline-dark" type="submit" className="mt-3 px-4 rounded-pill" disabled={submitting}>
              {submitting ? (
                <>
                  <Spinner size="sm" className="me-2" />
                  Registering...
                </>
              ) : (
                'Register as Helper'
              )}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default RegisterHelper;
