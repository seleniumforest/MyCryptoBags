import { Col, Row } from 'react-bootstrap';
import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { addCoin } from '../redux/actionCreators';

function AddCoin() {
    const { coins } = useSelector(state => ({
        coins: state.coins
    }), shallowEqual);

    const dispatch = useDispatch();

    return (
        <Row className="add-coin">
            <Col sm={3}><b>Choose coin to add</b></Col>
            <Col sm={6}>
                {<Select className="portfolio-search-input"
                    options={coins}
                    placeholder="Search and add coin..."
                    onChange={(value) => dispatch(addCoin(value))}
                />}
            </Col>
        </Row>
    );
}

export default AddCoin;