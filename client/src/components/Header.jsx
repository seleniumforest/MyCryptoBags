import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <Navbar bg="light" expand="sm">
            <Navbar.Brand href="/" to="/">My Crypto Bags</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Link to="/" className="nav-link">Manage</Link>
                    <Link to="/link" className="nav-link">Options</Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;