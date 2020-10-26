import { Button, Col, Container, Row } from 'react-bootstrap';
import React from 'react';
import './Portfolio.scss'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import AddCoin from './AddCoin';

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
        <>
            <div className="portfolio-total">
                <h3>Your portfolio total</h3>
                <h4>
                    {parseFloat(selectedcoins.reduce((a, b) => a + (b.price * b.count), 0)).toFixed(3)}
                </h4>
            </div>
            <div className="portfolio-table">
                <h3>Manage your assets</h3>
                <Container>
                    <PortfolioHeaders />
                    {selectedcoins.map((x) =>
                        <Row key={x.id}>
                            <Col sm={3}>{x.label}</Col>
                            <Col sm={2}>{x.price}</Col>
                            <Col sm={3}>
                                <input
                                    type="text"
                                    placeholder="count"
                                    value={x.count}
                                    onChange={(e) => {
                                        dispatch({ type: 'add_coin_value', payload: { id: x.id, count: e.target.value } })
                                    }}
                                    className="form-control ds-input" />
                            </Col>
                            <Col sm={2}> {parseFloat(x.price * x.count).toFixed(3)}</Col>
                            <Col sm={1}>
                                <Button onClick={() => dispatch({ type: "remove_coin", payload: { id: x.id } })}>
                                    Delete
                                </Button>
                            </Col>
                        </Row>
                    )}
                    <AddCoin />
                </Container>
            </div>
        </>
    );
};

var PortfolioHeaders = () => <Row>
        <Col sm={3}>Coin</Col>
        <Col sm={2}>Price</Col>
        <Col sm={3}>Count</Col>
        <Col sm={2}>Total $</Col>
        <Col sm={1}></Col>
    </Row>

export default Portfolio;