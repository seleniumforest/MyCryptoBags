import React from 'react';
import numeral from 'numeral';
import { shallowEqual, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import './PortfolioTotal.scss';

const numberFormat = '$0,0.00';

function PortfolioTotal() {
    const { selectedcoins } = useSelector(state => ({
        selectedcoins: state.selectedcoins
    }), shallowEqual);

    return (
        <Container>
            <p>
                {numeral(selectedcoins.reduce((a, b) => a + (b.price * b.count), 0)).format(numberFormat)}
            </p>
        </Container>
    );
}

export default PortfolioTotal;