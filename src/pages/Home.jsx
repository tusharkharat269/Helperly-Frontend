import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { FaUserCheck, FaTools, FaMapMarkerAlt } from "react-icons/fa";
import heroImg from "../assets/hero.jpg"; // Replace with your image

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-light py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h1 className="display-5 fw-bold text-dark mb-3">
                Find Trusted Local Helpers <br /> In Minutes
              </h1>
              <p className="text-secondary fs-5">
                Book plumbers, electricians, mechanics, and more with ease — all in one place.
              </p>
              <Button variant="dark" size="lg" href="/all-services">
                Explore Services
              </Button>
            </Col>
            <Col md={6}>
              <img src={heroImg} alt="Hero" className="img-fluid rounded" />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="bg-white text-center py-5 border-top">
        <Container>
          <Row className="g-4">
            <Col md={4}>
              <FaTools size={40} className="text-dark mb-2" />
              <h4>20+ Services</h4>
              <p>Plumbers, electricians, cleaners & more</p>
            </Col>
            <Col md={4}>
              <FaUserCheck size={40} className="text-dark mb-2" />
              <h4>10,000+ Happy Users</h4>
              <p>Trusted by homes across 50+ cities</p>
            </Col>
            <Col md={4}>
              <FaMapMarkerAlt size={40} className="text-dark mb-2" />
              <h4>Live Tracking</h4>
              <p>Track your service provider in real time</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services Highlight */}
      <section className="bg-light py-5">
        <Container>
          <h2 className="text-center mb-5">Popular Services</h2>
          <Row className="g-4">
            {[
              { title: "Plumber", img: "/plumber.jpg" },
              { title: "Electrician", img: "/electrician.jpg" },
              { title: "AC Repair", img: "/ac-repair.jpg" },
            ].map((service, i) => (
              <Col md={4} key={i}>
                <Card className="shadow-sm h-100">
                  <Card.Img variant="top" src={service.img} />
                  <Card.Body>
                    <Card.Title>{service.title}</Card.Title>
                    <Card.Text>
                      Trusted, background-verified professionals near you.
                    </Card.Text>
                    <Button variant="outline-dark" href="/services">
                      Book Now
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* How It Works */}
      <section className="bg-white py-5 border-top">
        <Container>
          <h2 className="text-center mb-5">How It Works</h2>
          <Row className="text-center g-4">
            <Col md={4}>
              <h4>1. Choose a Service</h4>
              <p>Pick the service you need from our wide range.</p>
            </Col>
            <Col md={4}>
              <h4>2. Book Instantly</h4>
              <p>Pick time, location and confirm in a few taps.</p>
            </Col>
            <Col md={4}>
              <h4>3. Get It Done</h4>
              <p>Our verified helper will complete your job on time.</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="bg-dark text-white text-center py-5">
        <Container>
          <h2 className="mb-3">Ready to get started?</h2>
          <p className="mb-4 fs-5">Join thousands of users who trust Helperly for home services.</p>
          <Button variant="light" size="lg" href="/login">
            Book Your First Service
          </Button>
        </Container>
      </section>
    </div>
  );
};

export default Home;
