import Axios from 'axios';
import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Link } from 'react-router-dom';
import store from '../store';

function Header() {
    const { userAddress, selectedCoins } = useSelector(state => ({
        userAddress: state.userAddress,
        selectedCoins: state.selectedCoins
    }), shallowEqual);

    const dispatch = useDispatch();

    let connect = () => {
        //todo catch error when user has no metamask installed
        if (typeof window.ethereum === 'undefined' || userAddress)
            return;

        window.ethereum
            .request({ method: 'eth_requestAccounts' })
            .then(x => {
                dispatch({ type: 'set_user_address', payload: { userAddress: x[0] } });
                dispatch({ type: 'start_portfolio_updating', payload: { timerId: setInterval(updateOnServer, 2000) } });
            });
    };

    function updateOnServer() {
        let state = store.getState();
        console.log(state);
        if (!state.updating.hasChanges || !state.userAddress)
            return;

        Axios
            .post('/api/bags', { address: state.userAddress, bags: state.selectedCoins })
            .then((response) => {
                dispatch({ type: 'portfolio_updated' });
            })
    }

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
                    <Button className="nav-link navbar-right" onClick={connect}>{getConnectLabel()}</Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;