import React, { Component } from 'react'

import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";

export default class Header extends Component {
    render() {
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
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/about">About</Nav.Link>
                            <Nav.Link href="/contact">Contact</Nav.Link>
                        </Nav>

                        <div className="d-flex gap-2">
                            <Button variant="outline-dark" href="/login">Login</Button>
                            <Button variant="dark" href="/register-helper">Become a Helper</Button>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}



