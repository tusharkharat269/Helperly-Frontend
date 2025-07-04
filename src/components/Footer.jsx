import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5">
      <Container>
        <Row className="mb-4">
          {/* About */}
          <Col md={6}>
            <h5 className="text-uppercase fw-bold mb-3">Helperly</h5>
            <p>Your trusted platform to find nearby professionals like electricians,cooks, key makers, and more — anytime, anywhere.</p>
          </Col>

          {/* Quick Links */}
          <Col md={2}>
            <h6 className="text-uppercase fw-semibold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light text-decoration-none">Home</a></li>
              <li><a href="/services" className="text-light text-decoration-none">Services</a></li>
              <li><a href="/about" className="text-light text-decoration-none">About</a></li>
              <li><a href="/contact" className="text-light text-decoration-none">Contact</a></li>
            </ul>
          </Col>

          {/* Contact */}
          <Col md={4}>
            <h6 className="text-uppercase fw-semibold mb-3">Contact Us</h6>
            <p>Email: support@helperly.com</p>
            <p>Phone: +91 98765 43210</p>
            <div className="d-flex gap-3 mt-2">
              <a href="#" className="text-light"><FaFacebookF /></a>
              <a href="#" className="text-light"><FaTwitter /></a>
              <a href="#" className="text-light"><FaInstagram /></a>
              <a href="#" className="text-light"><FaLinkedin /></a>
            </div>
          </Col>
        </Row>

        <hr className="border-secondary" />

        {/* Copyright */}
        <Row>
          <Col className="text-center">
            <small>&copy; {new Date().getFullYear()} Helperly. All rights reserved.</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
