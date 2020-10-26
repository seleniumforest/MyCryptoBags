import { Button, Col, Row } from 'react-bootstrap';
import React from 'react';
import './Portfolio.scss'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import numeral from 'numeral';

const numberFormat = '$0,0.00';

function CoinList() {
    const { selectedcoins } = useSelector(state => ({
        selectedcoins: state.selectedcoins
    }), shallowEqual);

    const dispatch = useDispatch();

    return (
        <>
            {selectedcoins.map((x) =>
                <Row key={x.id} className="portfolio-table__row">
                    <Col xs={3} lg={2}>{x.label}</Col>
                    <Col xs={2} lg={2}>{numeral(x.price).format(numberFormat)}</Col>
                    <Col xs={3} lg={2}>
                        <input
                            type="text"
                            placeholder="count"
                            value={x.count}
                            onChange={(e) => {
                                dispatch({ type: 'add_coin_value', payload: { id: x.id, count: e.target.value } })
                            }}
                            className="form-control ds-input" />
                    </Col>
                    <Col xs={2} lg={2}> {numeral(x.price * x.count).format(numberFormat)}</Col>
                    <Col xs={1} lg={1}>
                        <Button onClick={() => dispatch({ type: "remove_coin", payload: { id: x.id } })}>
                            Delete
                                </Button>
                    </Col>
                </Row>
            )}
        </>
    );
};

export default CoinList;