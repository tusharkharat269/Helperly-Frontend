import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// import dummyUsers from "../Database/dummyCustomers.json";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL
});

const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({
    name: "",
    emailId: "",
    customersPassword: "",
    confirmPassword: "",
    customerContactNo: ""
  });
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  //   const handleSubmit = async (e) => {
  //   e.preventDefault();


  // };




  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isRegister) {
      // Registration simulated
      if (form.customersPassword !== form.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      try {
        const res = await api.post("http://localhost:8080/api/auth/register", {
          name: form.name,
          email: form.emailId,
          password: form.customersPassword,
          contactNo: form.customerContactNo
        });

        // Acknowledge the response
        // console.log("Status Code:", res.status);        // e.g., 200 or 201
        // console.log("Response Data:", res.data);        // Server response (e.g., user info or success message)

        navigate("/login")

        alert("Registration successful. You can now login.");
        setIsRegister(false);

      } catch (error) {
        if (error.response) {
          console.error("Error status:", error.response.status);
          console.error("Error data:", error.response.data);
          alert(`Error ${error.response.status}: ${error.response.data}`);
        } else {
          console.error("Network or server error", error.message);
          alert("Request failed. Please try again later.");
        }
      }
    }


    else {
      try {
        const res = await api.post("http://localhost:8080/api/auth/login", {
          email: form.emailId,
          password: form.customersPassword,
        });

        const userData = res.data;

        // Save user in localStorage or global state
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);

        // Redirect to dashboard
        navigate("/userDashboard");
      } catch (err) {
        setError("Invalid email or password");
      }
    }
  };

  const handleGoogleLogin = () => {
    alert("Google Login Clicked (to be integrated)");
  };

  return (
    <Container fluid className="vh-100">
      <Row className="h-100">
        {/* Left Panel */}
        <Col md={6} className="d-flex flex-column justify-content-center align-items-center text-white bg-dark p-5">
          <h1 className="mb-4">{isRegister ? "Welcome New User!" : "Welcome Back!"}</h1>

          <Button
            variant="light"
            size="lg"
            className="mb-3"
            onClick={handleGoogleLogin}
            style={{ width: "300px" }}
          >
            Continue with Google
          </Button>

          <p className="mb-3">
            {isRegister ? "Already have an account?" : "Don't have an account?"}
          </p>

          <Button variant="outline-light" onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Login" : "Register"}
          </Button>
        </Col>

        {/* Right Panel */}
        <Col md={6} className="d-flex justify-content-center align-items-center bg-light">
          <Card className="p-4 shadow" style={{ width: "100%", maxWidth: "500px" }}>
            <h3 className="text-center mb-4">{isRegister ? "Register" : "Login"}</h3>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              {isRegister && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter full name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="Enter mobile number"
                      name="customerContactNo"
                      value={form.customerContactNo}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </>
              )}

              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="emailId"
                  value={form.emailId}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="customersPassword"
                  value={form.customersPassword}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {isRegister && (
                <Form.Group className="mb-4">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              )}

              <Button type="submit" variant="dark" className="w-100 mb-2">
                {isRegister ? "Register" : "Login"}
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
