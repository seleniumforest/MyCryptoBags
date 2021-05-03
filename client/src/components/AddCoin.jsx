import { Col, Row } from 'react-bootstrap';
import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { addCoin, addCustomCoin } from '../redux/actionCreators';
import AsyncCreatableSelect from 'react-select/async-creatable';
import Axios from 'axios';

function AddCoin() {
    const { coins } = useSelector(state => ({
        coins: state.coins
    }), shallowEqual);

    const searchCoin = (inputValue) =>
        new Promise((resolve) => {
            Axios
                .get("/api/coins/search?query=" + inputValue)
                .then(x => resolve(x.data.map(x => ({ value: x.id, label: x.name })).slice(0, 20)))
        });

    const dispatch = useDispatch();

    return (
        <>
            <Row key={"customcoin"} className="portfolio-table__row">
                <Col xs={2} lg={2}>
                    <b>Add coins</b>
                </Col>
                <Col xs={3} lg={2}>
                    {<AsyncCreatableSelect className="portfolio-search-input"
                        placeholder="Select coin"
                        defaultOptions={coins ? coins.slice(0, 100) : []}
                        cacheOptions
                        allowCreateWhileLoading={true}
                        isValidNewOption={() => true}
                        loadOptions={searchCoin}
                        onChange={(value) => {
                            console.log(value);
                            let isCustom = !!value.__isNew__;
                            let coin = {
                                id: isCustom ? "custom_" + Date.now() : value.value,
                                label: value.label,
                                price: 0,
                                custom: isCustom
                            };
                              
                            if (isCustom) {
                                dispatch(addCustomCoin(coin))
                            }
                            else
                                Axios.post("/api/price/bycoinids", [ coin.id ], { headers: { "Content-type": "application/json" } })
                                    .then(x => {
                                        coin.price = x.data.find(y => y.id === coin.id).price;
                                        dispatch(addCoin(coin))
                                    })

                        }}
                    />}
                </Col>
                <Col xs={3} lg={2}></Col>
                <Col xs={2} lg={2}></Col>
                <Col xs={2} lg={2}>
                </Col>
            </Row>
        </>
    );
};

export default AddCoin;