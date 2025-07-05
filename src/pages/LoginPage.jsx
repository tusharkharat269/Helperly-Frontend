import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';

const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Integrate with backend authentication
    alert(isRegister ? 'Register submitted' : 'Login submitted');
  };

  const handleGoogleLogin = () => {
    // TODO: Integrate with Google OAuth
    alert('Google Login Clicked');
  };

  return (
    <Container fluid className="vh-100">
      <Row className="h-100">
        {/* Left Side */}
        <Col md={6} className="d-flex flex-column justify-content-center align-items-center text-white bg-dark p-5">
          <h1 className="mb-4">{isRegister ? 'Welcome New User!' : 'Welcome Back!'}</h1>

          <Button
            variant="light"
            size="lg"
            className="mb-3"
            onClick={handleGoogleLogin}
            style={{ width: '300px' }}
          >
            Continue with Google
          </Button>

          <p className="mb-3">{isRegister ? 'Already have an account?' : "Don't have an account?"}</p>

          <Button variant="outline-light" onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? 'Login' : 'Register'}
          </Button>
        </Col>

        {/* Right Side */}
        <Col md={6} className="d-flex justify-content-center align-items-center bg-light">
          <Card className="p-4 shadow" style={{ width: '100%', maxWidth: '500px' }}>
            <h3 className="text-center mb-4">{isRegister ? 'Register' : 'Login'}</h3>

            <Form onSubmit={handleSubmit}>
              {isRegister && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter full name" required />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control type="tel" placeholder="Enter mobile number" required />
                  </Form.Group>
                </>
              )}

              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" required />
              </Form.Group>

              {isRegister && (
                <Form.Group className="mb-4">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="password" placeholder="Confirm password" required />
                </Form.Group>
              )}

              <Button variant="dark" type="submit" className="w-100 mb-2">
                {isRegister ? 'Register' : 'Login'}
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
