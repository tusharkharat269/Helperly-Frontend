import { useState } from 'react'

import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";

// import LoginModal from "./LoginModal";


function Header() {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm">
            <Container>
                <Navbar.Brand href="/" className="bg-dark fw-bold text-white fs-4" style={{ padding: "5px 10px" }}>
                    Helperly
                </Navbar.Brand>


                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <NavDropdown title="Services" id="basic-nav-dropdown">
                            <NavDropdown.Header>Home Essentials</NavDropdown.Header>
                            <NavDropdown.Item href="/services/plumbing">🔧 Plumbing</NavDropdown.Item>
                            <NavDropdown.Item href="/services/electrician">💡 Electrician</NavDropdown.Item>
                            <NavDropdown.Item href="/services/carpenter">🪚 Carpenter</NavDropdown.Item>
                            <NavDropdown.Item href="/services/ac-repair">❄️ AC Repair</NavDropdown.Item>
                            <NavDropdown.Divider />

                            <NavDropdown.Header>Cleaning</NavDropdown.Header>
                            <NavDropdown.Item href="/services/home-cleaning">🧹 Deep Cleaning</NavDropdown.Item>
                            <NavDropdown.Item href="/services/sofa-cleaning">🛋 Sofa Cleaning</NavDropdown.Item>
                            <NavDropdown.Item href="/services/tank-cleaning">🚿 Tank Cleaning</NavDropdown.Item>
                            <NavDropdown.Divider />

                            <NavDropdown.Header>Security & Keys</NavDropdown.Header>
                            <NavDropdown.Item href="/services/key-maker">🔐 Key Maker</NavDropdown.Item>
                            <NavDropdown.Item href="/services/cctv">📷 CCTV Installation</NavDropdown.Item>
                            <NavDropdown.Divider />

                            <NavDropdown.Header>Lifestyle</NavDropdown.Header>
                            <NavDropdown.Item href="/services/salon">💇 Salon at Home</NavDropdown.Item>
                            <NavDropdown.Item href="/services/massage">💆 Massage</NavDropdown.Item>
                            <NavDropdown.Item href="/services/yoga">🧘 Yoga Trainer</NavDropdown.Item>

                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/all-services" className="text-center text-primary">
                                🔍 View All Services
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/about">About</Nav.Link>
                        <Nav.Link href="/contact">Contact</Nav.Link>
                    </Nav>

                    <div className="d-flex gap-2">
                        <Button variant="outline-dark" href="/login">Login</Button>

                        {/* <button className="btn btn-outline-dark" onClick={() => setShowLogin(true)}>
                                Login
                            </button>

                            <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} /> */}


                        <Button variant="dark" href="/register-helper">Become a Helper</Button>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;



