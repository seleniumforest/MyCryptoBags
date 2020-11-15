import React from 'react';
import numeral from 'numeral';
import { shallowEqual, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import './PortfolioTotal.scss';

const numberFormat = '$0,0.00';

function PortfolioTotal() {
    const { selectedCoins } = useSelector(state => ({
        selectedCoins: state.selectedCoins
    }), shallowEqual);

    return (
        <>
            <h3>Your portfolio total</h3>
            <Container>
                <p>
                    {numeral(selectedCoins.reduce((a, b) => a + (b.price * b.count), 0)).format(numberFormat)}
                </p>
            </Container>
        </>
    );
}

export default PortfolioTotal;