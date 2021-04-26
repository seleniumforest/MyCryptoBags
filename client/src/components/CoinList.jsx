import { Button, Col, Row } from 'react-bootstrap';
import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import numeral from 'numeral';
import { addValue, removeCoin, sortCoinList, addCoin } from '../redux/actionCreators';
import AsyncCreatableSelect from 'react-select/async-creatable';
import Axios from 'axios';

const numberFormat = '$0,0.00';

function CoinList() {
    const { selectedCoins, coins } = useSelector(state => ({
        selectedCoins: state.selectedCoins,
        coins: state.coins
    }), shallowEqual);

    const dispatch = useDispatch();

    const searchCoin = (inputValue) =>
        new Promise((resolve) => {
            Axios
                .get("/api/coins/search?query=" + inputValue)
                .then(x => resolve(x.data.map(x => ({ value: x.id, label: x.name })).slice(0, 50)))
        });

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
                            onChange={(e) => dispatch(addValue(x.id, parseFloat(e.target.value)))}
                            onKeyPress={(event) => {
                                if (event.key === "Enter")
                                    dispatch(sortCoinList());
                            }}
                            onBlur={() => dispatch(sortCoinList())}
                            className="form-control ds-input" />
                    </Col>
                    <Col xs={2} lg={2}> {numeral(x.price * x.count).format(numberFormat)}</Col>
                    <Col xs={2} lg={2}>
                        <Button className="btn btn-danger" onClick={() => dispatch(removeCoin(x.id))}>
                            Delete
                        </Button>
                    </Col>
                </Row>
            )}
            <h5>Add coin</h5>
            <Row key={"customcoin"} className="portfolio-table__row">
                <Col xs={3} lg={2}>
                    {<AsyncCreatableSelect className="portfolio-search-input"
                        placeholder="Select coin"
                        defaultOptions={coins ? coins.slice(0, 100) : []}
                        cacheOptions
                        loadOptions={searchCoin}
                        onChange={(value) => {
                            let coin = value.__isNew__ ?
                                {
                                    id: "custom_" + Date.now(),
                                    label: value.label,
                                    price: 0,
                                    count: 0
                                } : value;

                            dispatch(addCoin(coin))
                        }}
                    />}
                </Col>
                <Col xs={2} lg={2}>
                </Col>
                <Col xs={3} lg={2}></Col>
                <Col xs={2} lg={2}></Col>
                <Col xs={2} lg={2}>
                </Col>
            </Row>
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