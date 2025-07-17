import { useContext, useState, useRef, useEffect } from 'react'

import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// import LoginModal from "./LoginModal";
import { AuthContext } from '../context/AuthContext';
import ServicesDropdown from './ServicesDropdown';


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
                        <ServicesDropdown />
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



