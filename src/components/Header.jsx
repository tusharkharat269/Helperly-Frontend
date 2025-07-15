import { useContext, useState, useRef, useEffect } from 'react'

import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// import LoginModal from "./LoginModal";
import { AuthContext } from '../context/AuthContext';


function Header() {
    const { authData, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef();
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

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

                    {authData ? (
                        // <>
                        //     <span style={{ marginLeft: '10px' }}>👤 {authData.email}</span>
                        //     <button onClick={logout}>Logout 🔓</button>
                        // </>

                        <div className="position-relative" ref={dropdownRef}>
                            <div
                                className="rounded-circle bg-light text-white d-flex align-items-center justify-content-center"
                                style={{ width: '40px', height: '40px', cursor: 'pointer' }}
                                onClick={toggleDropdown}
                                title="Profile"
                            >   👤
                                {/* {authData.email.charAt(0).toUpperCase()} */}
                            </div>

                            {dropdownOpen && (
                                <div className="position-absolute end-0 mt-2 bg-white shadow rounded p-2" style={{ minWidth: '180px', zIndex: 1000 }}>
                                    <div className="small text-muted mb-1">Logged in as</div>
                                    <div className="fw-semibold mb-2">{authData.email}</div>
                                    <button className="btn btn-sm btn-outline-danger w-100" onClick={logout}>
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>

                    ) : (

                        <div className="d-flex gap-2">
                            <Button variant="outline-dark" href="/login">Login</Button>
                            <Button variant="dark" href="/register-helper">Become a Helper</Button>
                        </div>

                    )}


                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;



