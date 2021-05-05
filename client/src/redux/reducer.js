import * as names from './constants';

let defaultState = {
    coins: [],
    coinsLoaded: false,
    selectedCoins: [],
    customCoins: []
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
                selectedCoins: selectedCoins.sort((a, b) => a.count * a.price > b.count * b.price ? -1 : 1)
            };
        case names.SET_LOADED:
            return {
                ...state, 
                coinsLoaded: action.payload.coinsLoaded
            }
        case names.ADD_COIN_VALUE:
            let newCoinList = [...state.selectedCoins];
            newCoinList.find(x => x.id === action.payload.id).count = action.payload.count;
            //newCoinList = newCoinList.sort((a, b) => a.count * b.count < b.price * a.price ? -1 : 1);
            return {
                ...state,
                selectedCoins: newCoinList
            };
        case names.ADD_COIN:
            if (state.selectedCoins.filter(x => x.id === action.payload.newCoin.id).length !== 0)
                return state;
            console.log(action.payload.newCoin);
            return {
                ...state,
                selectedCoins: [...state.selectedCoins, action.payload.newCoin]
            };
        case names.REMOVE_COIN:
            return {
                ...state,
                selectedCoins: [...state.selectedCoins.filter(x => x.id !== action.payload.id)],
                customCoins: [...state.customCoins.filter(x => x.id !== action.payload.id)]
            };
        case names.SORT_LIST:

            return {
                ...state,
                selectedCoins: state.selectedCoins.sort((a, b) => a.count * a.price > b.count * b.price ? -1 : 1)
            }
        case names.ADD_CUSTOM_COIN:
            return {
                ...state,
                customCoins: [...state.customCoins, action.payload.newCoin]
            };
        case names.SET_FIELD_VALUE:
            let newSelectedCoinList = [...state.selectedCoins];
            let newCustomCoinList = [...state.customCoins];

            let matchSelected = newSelectedCoinList.find(x => x.id === action.payload.coinId);
            if (matchSelected)
                matchSelected[action.payload.fieldName] = action.payload.value;

            let matchCustom = newCustomCoinList.find(x => x.id === action.payload.coinId);
            if (matchCustom)
                matchCustom[action.payload.fieldName] = action.payload.value;

            return {
                ...state,
                selectedCoins: newSelectedCoinList,
                customCoins: newCustomCoinList

            }
        default:
            return state
    }
}