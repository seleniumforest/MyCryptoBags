export const fetchCoins = (coins) => ({
    type: 'fetch_coins',
    payload: { coins: coins, coinsLoaded: true }  
})

export const addValue = (coinId, count) => ({
    type: 'add_coin_value',
    payload: { id: coinId, count: count }  
})

export const addCoin = (coin) => ({
    type: 'add_coin',
    payload: { newCoin: coin } 
})

export const removeCoin = (coinId) => ({
    type: 'remove_coin',
    payload: { id: coinId } 
})

export const sortCoinList = () => ({
    type: 'sort_coin_list'
})