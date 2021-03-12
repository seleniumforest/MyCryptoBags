import { Col, Container, Row } from 'react-bootstrap';
import React from 'react';
import './Portfolio.scss'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import AddCoin from './AddCoin';
import CoinList from './CoinList';
import PortfolioTotal from './PortfolioTotal';
import { Button } from 'react-bootstrap';

function Portfolio() {
    const { coinsLoaded, selectedCoins } = useSelector(state => ({
        coinsLoaded: state.coinsLoaded, 
        selectedCoins: state.selectedCoins
    }), shallowEqual);

    const dispatch = useDispatch();

    if (!coinsLoaded) {
        axios
            .get('/api/coins/all')
            .then(x => {
                dispatch({ type: 'fetch_coins', payload: { coins: x.data, coinsLoaded: true } });
            });
    };

    function copyImportantData() {
        var data = JSON.stringify(selectedCoins.map((x) => ({name: x.label, count: x.count})));
        navigator.clipboard.writeText(data);
    }

    return (
        <Container>
            <div className="portfolio">
                <div className="portfolio-total">
                    <PortfolioTotal />          
                </div>
                <div className="portfolio-addcoin">
                    <AddCoin />          
                </div>
                <div className="portfolio-table">
                    <h3>Manage your assets</h3>
                    <Container>
                        <CoinList />
                    </Container>
                </div>
                <div className="portfolio-export">
                    <Button onClick={() => copyImportantData() }>
                        Copy data
                    </Button>
                </div>
            </div>
        </Container>
    );
};

export default Portfolio;