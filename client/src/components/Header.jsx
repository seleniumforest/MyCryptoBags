import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

function Header() {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/" to="/">My Crypto Bags</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/" to="/">Manage</Nav.Link>
                    <Nav.Link href="/link" to="/link">Options</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;