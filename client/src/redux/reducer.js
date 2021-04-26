import * as names from './constants';

let defaultState = {
    coins: [],
    coinsLoaded: false,
    selectedCoins: [], 
    customCoin: {
        count: 0, 
        price: 0,
        name: "",
        id: "",
    }
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case names.FETCH_COINS:
            let selectedCoins = [...state.selectedCoins];
            let newCoins = action.payload.coins;
            selectedCoins.forEach(x => {
                let newCoin = newCoins.find(y => y.id === x.id);
                if (newCoin)
                    x.price = newCoin.price
            });

            return {
                ...state,
                coins: newCoins,
                selectedCoins: selectedCoins,
                сoinsInDropdown: newCoins.map(x => ({ value: x.id, label: x.name })),
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
            }
        default:
            return state
    }
}