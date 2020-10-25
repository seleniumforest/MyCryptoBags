import { Col, Row } from 'react-bootstrap';
import React from 'react';
import './Portfolio.scss'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import Select from 'react-select';

function AddCoin() {
    const { coins } = useSelector(state => ({
        coins: state.coins
    }), shallowEqual);

    const dispatch = useDispatch();

    return (
        <Row>
            <Col sm={4}>Choose coin to add</Col>
            <Col sm={4}>
                <Select className="portfolio-search-input"
                    options={coins}
                    placeholder="Search and add coin..."
                    onChange={(value) => dispatch({ type: 'add_coin', payload: { newCoin: value } })}
                />
            </Col>
        </Row>
    );
}

export default AddCoin;