import { Col, Container, Row } from 'react-bootstrap';
import React from 'react';
import './Portfolio.scss'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import AddCoin from './AddCoin';
import CoinList from './CoinList';
import numeral from 'numeral';

const numberFormat = '$0,0.00';

function Portfolio() {
    const { coinsLoaded, selectedcoins } = useSelector(state => ({
        coinsLoaded: state.coinsLoaded,
        selectedcoins: state.selectedcoins
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
                    <h3>Your portfolio total</h3>
                    <h5>
                        {numeral(selectedcoins.reduce((a, b) => a + (b.price * b.count), 0)).format(numberFormat)}
                    </h5>
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