import { Col, Container, Row } from 'react-bootstrap';
import React from 'react';
import './Portfolio.scss'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import AddCoin from './AddCoin';
import CoinList from './CoinList';
import PortfolioTotal from './PortfolioTotal';

function Portfolio() {
    const { coinsLoaded } = useSelector(state => ({
        coinsLoaded: state.coinsLoaded
    }), shallowEqual);

    const dispatch = useDispatch();

    if (!coinsLoaded) {
        axios
            .get('/api/coins/all')
            .then(x => {
                dispatch({ type: 'fetch_coins', payload: { coins: x.data, coinsLoaded: true } });
            });
    };

    return (
        <Container>
            <div className="portfolio">
                <div className="portfolio-total">
                    <PortfolioTotal />          
                </div>
                <div className="portfolio-table">
                    <h3>Manage your assets</h3>
                    <Container>
                        <PortfolioHeaders />
                        <CoinList />
                        <AddCoin />
                    </Container>
                </div>
            </div>
        </Container>
    );
};

var PortfolioHeaders = () => <Row className="portfolio-table__headers">
    <Col xs={3} lg={2}>Coin</Col>
    <Col xs={2} lg={2}>Price</Col>
    <Col xs={3} lg={2}>Count</Col>
    <Col xs={2} lg={2}>Total</Col>
    <Col xs={1} lg={1}></Col>
</Row>

export default Portfolio;