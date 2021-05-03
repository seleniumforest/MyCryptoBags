import { Container } from 'react-bootstrap';
import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import CoinList from './CoinList';
import PortfolioTotal from './PortfolioTotal';
import { Button } from 'react-bootstrap';
import { fetchCoins, sortCoinList, setFieldValue } from '../redux/actionCreators';

function Portfolio() {
    const { coinsLoaded, selectedCoins } = useSelector(state => ({
        coinsLoaded: state.coinsLoaded,
        selectedCoins: state.selectedCoins
    }), shallowEqual);

    const dispatch = useDispatch();
    const updatePrices = () => {
        axios.post("/api/price/bycoinids", selectedCoins.map(x => x.id), { headers: { "Content-type": "application/json" } })
            .then(x => x.data.forEach(coin => {
                dispatch(setFieldValue(coin.id, "price", coin.price))
            }));
    }

    if (!coinsLoaded) {
        axios
            .get('/api/coins/all')
            .then(x => {
                dispatch(fetchCoins(x.data.map(x => ({ id: x.Id, label: x.Label, mcap: x.MarketCap, price: 0 }))));
                dispatch(sortCoinList(x.data));
            })
            .then(() => updatePrices());
    };

    function copyImportantData() {
        var data = JSON.stringify(selectedCoins.map((x) => ({ name: x.label, count: x.count })));
        navigator.clipboard.writeText(data || "");
    }

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
                    {
                        selectedCoins.length > 0 &&
                        <div className="portfolio-export">
                            <Button onClick={() => copyImportantData()}>
                                Copy data
                    </Button>
                        </div>
                    }
                </div>
            </Container>
        </>
    );
};

export default Portfolio;