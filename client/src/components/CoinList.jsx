import React from 'react';
import SelectedCoins from '../components/SelectedCoins';
import CustomCoins from '../components/CustomCoins';
import AddCoin from './AddCoin';

function CoinList() {
    return (
        <>
            <SelectedCoins />
            <CustomCoins />
            <AddCoin />
        </>
    );
};

export default CoinList;