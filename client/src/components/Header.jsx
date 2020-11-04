import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Link } from 'react-router-dom';

function Header() {
    const { userAddress } = useSelector(state => ({
        userAddress: state.userAddress
    }), shallowEqual);

    const dispatch = useDispatch();

    function connect() {
        //todo catch error when user has no metamask installed
        if (typeof window.ethereum === 'undefined')
            return;

        window.ethereum
            .request({ method: 'eth_requestAccounts' })
            .then(x => {
                dispatch({ type: 'set_user_address', payload: { userAddress: x[0] } });
            });
    };

    function getConnectLabel() {
        if (userAddress) {
            var length = userAddress.length;
            if (length > 0)
                return `${userAddress.slice(0, 5)}...${userAddress.slice(length - 4, length)}`;
        }

        return 'Connect to Metamask';
    };

    return (
        <Navbar bg="light" expand="sm">
            <Navbar.Brand href="/" to="/">My Crypto Bags</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Link to="/" className="nav-link">Manage</Link>
                    <Link to="/link" className="nav-link">Options</Link>
                </Nav>
                <Nav>
                    <Link onClick={connect} className="nav-link navbar-right">{getConnectLabel()}</Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;