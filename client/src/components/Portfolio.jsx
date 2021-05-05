import { Container } from 'react-bootstrap';
import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import CoinList from './CoinList';
import PortfolioTotal from './PortfolioTotal';
import { fetchCoins, setFieldValue, setDataLoaded } from '../redux/actionCreators';

function Portfolio() {
    const { dataLoaded, selectedCoins } = useSelector(state => ({
        dataLoaded: state.coinsLoaded,
        selectedCoins: state.selectedCoins
    }), shallowEqual);

    const dispatch = useDispatch();

    if (!dataLoaded) {
        Promise.all([
            axios.get('/api/coins/all'),
            axios.post("/api/price/bycoinids", 
                        selectedCoins.map(x => x.id), 
                        { headers: { "Content-type": "application/json" } })
        ])
        .then(([res1, res2]) => {
            dispatch(fetchCoins(res1.data.map(x => ({ id: x.Id, label: x.Label, mcap: x.MarketCap, price: 0 }))));
            res2.data.forEach(coin => {
                dispatch(setFieldValue(coin.id, "price", coin.price))
            });
            dispatch(setDataLoaded(true));
        })
    };

    return (
        <>
            <Container>
                <div className="portfolio">
                    <div className="portfolio-total">
                        <PortfolioTotal />
                    </div>
                    <div className="portfolio-table">
                        <h3>Manage your assets</h3>
                        <Container>
                            <CoinList />
                        </Container>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Portfolio;