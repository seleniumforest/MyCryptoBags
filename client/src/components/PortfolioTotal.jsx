import React from 'react';
import numeral from 'numeral';
import { shallowEqual, useSelector } from 'react-redux';
import { Container, Spinner } from 'react-bootstrap';

const numberFormat = '$0,0.00';

function PortfolioTotal() {
    const { selectedCoins, customCoins, coinsLoaded } = useSelector(state => ({
        selectedCoins: state.selectedCoins,
        customCoins: state.customCoins,
        coinsLoaded: state.coinsLoaded
    }), shallowEqual);

    let total =
        selectedCoins.reduce((a, b) => (a + (b.price * b.count)), 0) +
        customCoins.reduce((a, b) => a + b.amount, 0);

    return (
        <>
            <h3>Your portfolio total</h3>
            <Container>
                <h5>
                    {numeral(total).format(numberFormat)}
                </h5>
                {
                    !coinsLoaded &&
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                }
            </Container>
        </>
    );
}

export default PortfolioTotal;