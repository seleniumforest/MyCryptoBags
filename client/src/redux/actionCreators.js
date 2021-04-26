import * as names from '../redux/constants';

export const fetchCoins = (coins) => ({
    type: names.FETCH_COINS,
    payload: { coins: coins, coinsLoaded: true }  
})

export const addValue = (coinId, count) => ({
    type: names.ADD_COIN_VALUE,
    payload: { id: coinId, count: count }  
})

export const addCoin = (coin) => ({
    type: names.ADD_COIN,
    payload: { newCoin: coin } 
})

export const removeCoin = (coinId) => ({
    type: names.REMOVE_COIN,
    payload: { id: coinId } 
})

export const sortCoinList = () => ({
    type: names.SORT_LIST
})
