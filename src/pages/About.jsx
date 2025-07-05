import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import aboutImg from "../assets/hero.jpg"; // Optional: replace with your own image

const About = () => {
  return (
    <Container className="py-5">
      <Row className="align-items-center">
        <Col md={6}>
          <Image
            src={aboutImg}
            alt="About Helperly"
            fluid
            rounded
            className="mb-4 mb-md-0"
          />
        </Col>
        <Col md={6}>
          <h2 className="mb-4">About Helperly</h2>
          <p className="text-muted">
            Helperly is your go-to platform for hiring trusted local service professionals like plumbers, electricians, carpenters, key makers, and many more.
            Our mission is to simplify daily life by making essential services available at your doorstep with just a few clicks.
          </p>
          <p className="text-muted">
            Whether you're facing a pipe leak, electrical fault, or need an emergency fix, Helperly connects you with background-verified helpers quickly and reliably.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
