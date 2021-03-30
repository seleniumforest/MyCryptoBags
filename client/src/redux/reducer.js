import * as names from './constants';

let defaultState = {
    coins: [],
    coinsLoaded: false,
    selectedCoins: []
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case names.FETCH_COINS:
            let selectedCoins = [...state.selectedCoins];
            let newCoins = action.payload.coins;
            selectedCoins.forEach(x => x.price = newCoins.find(y => y.id === x.id).price);

            return {
                ...state,
                coins: newCoins,
                selectedCoins: selectedCoins,
                coinsLoaded: action.payload.coinsLoaded
            };
        case names.ADD_COIN_VALUE:
            let newCoinList = [...state.selectedCoins];
            newCoinList.find(x => x.id === action.payload.id).count = action.payload.count;
            newCoinList = newCoinList.sort((a, b) => a.count * b.count < b.price * a.price ? -1 : 1);
            return {
                ...state,
                selectedCoins: newCoinList
            };
        case names.ADD_COIN:
            if (state.selectedCoins.filter(x => x.id === action.payload.newCoin.id).length !== 0)
                return state;

            return {
                ...state,
                selectedCoins: [...state.selectedCoins, action.payload.newCoin]
            };
        case names.REMOVE_COIN:
            return {
                ...state,
                selectedCoins: [...state.selectedCoins.filter(x => x.id !== action.payload.id)]
            };  
        case names.SORT_LIST:
            return {
                ...state,
                selectedCoins: state.selectedCoins.sort((a, b) => a.count * a.price > b.count * b.price ? -1 : 1)
            }; 
        default:
            return state
    }
}