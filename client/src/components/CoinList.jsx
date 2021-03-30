import { Button, Col, Row } from 'react-bootstrap';
import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import numeral from 'numeral';

const numberFormat = '$0,0.00';

function CoinList() {
    const { selectedCoins } = useSelector(state => ({
        selectedCoins: state.selectedCoins
    }), shallowEqual);

    const dispatch = useDispatch();

    return (
        <>
            <PortfolioHeaders />
            {selectedCoins.map((x) =>
                <Row key={x.id} className="portfolio-table__row">
                    <Col xs={3} lg={2}>{x.label}</Col>
                    <Col xs={2} lg={2}>{numeral(x.price).format(numberFormat)}</Col>
                    <Col xs={3} lg={2}>
                        <input
                            type="number"
                            placeholder="count"
                            value={x.count}
                            onChange={(e) => {
                                dispatch({ type: 'add_coin_value', payload: { id: x.id, count: parseInt(e.target.value) } })
                            }}
                            onKeyPress={(event) => {
                                if (event.key === "Enter")
                                    dispatch({ type: 'sort' });
                            }}
                            onBlur={() => dispatch({ type: 'sort' })}
                            className="form-control ds-input" />
                    </Col>
                    <Col xs={2} lg={2}> {numeral(x.price * x.count).format(numberFormat)}</Col>
                    <Col xs={2} lg={2}>
                        <Button className="btn btn-danger" onClick={() => dispatch({ type: "remove_coin", payload: { id: x.id } })}>
                            Delete
                        </Button>
                    </Col>
                </Row>
            )}
        </>
    );
};


var PortfolioHeaders = () => <Row className="portfolio-table__headers">
    <Col xs={3} lg={2}>Coin</Col>
    <Col xs={2} lg={2}>Price</Col>
    <Col xs={3} lg={2}>Count</Col>
    <Col xs={2} lg={2}>Total</Col>
    <Col xs={1} lg={1}></Col>
</Row>

export default CoinList;