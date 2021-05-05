import * as names from '../redux/constants';

export const fetchCoins = (coins) => ({
    type: names.FETCH_COINS,
    payload: { coins: coins, coinsLoaded: true }
})

export const setDataLoaded = (isLoaded) => ({
    type: names.SET_LOADED,
    payload: { coinsLoaded: isLoaded }
})

export const addValue = (coinId, count) => ({
    type: names.ADD_COIN_VALUE,
    payload: { id: coinId, count: count }
})

export const addCoin = (coin) => ({
    type: names.ADD_COIN,
    payload: { newCoin: coin }
})

export const addCustomCoin = (coin) => ({
    type: names.ADD_CUSTOM_COIN,
    payload: { newCoin: coin }
})

export const removeCoin = (coinId) => ({
    type: names.REMOVE_COIN,
    payload: { id: coinId }
})

export const sortCoinList = () => ({
    type: names.SORT_LIST
})

export const setCoinPrice = (coinId, price) => ({
    type: names.SET_COIN_PRICE,
    payload: { coinId: coinId, price: price }
})

export const addNotes = (coinId, notes) => ({
    type: names.ADD_NOTES,
    payload: { coinId: coinId, notes: notes }
})

export const setFieldValue = (coinId, fieldName, value) => ({
    type: names.SET_FIELD_VALUE,
    payload: { coinId, fieldName, value }
})