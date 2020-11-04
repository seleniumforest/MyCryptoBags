let defaultState = {
    coins: [],
    coinsLoaded: false,
    selectedCoins: [],
    userAddress: ''
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'fetch_coins':
            let selectedCoins = [...state.selectedCoins];
            let newCoins = action.payload.coins;
            selectedCoins.forEach(x => x.price = newCoins.find(y => y.id === x.id).price);

            return {
                ...state,
                coins: newCoins,
                selectedCoins: selectedCoins,
                coinsLoaded: action.payload.coinsLoaded
            };
        case 'add_coin_value':
            let newCoinList = [...state.selectedCoins];
            newCoinList.find(x => x.id === action.payload.id).count = action.payload.count;

            return {
                ...state,
                selectedCoins: newCoinList
            };
        case 'add_coin':
            if (state.selectedCoins.filter(x => x.id === action.payload.newCoin.id).length !== 0)
                return state;

            return { ...state, selectedCoins: [...state.selectedCoins, action.payload.newCoin] };
        case 'remove_coin':
            return { ...state, selectedCoins: [...state.selectedCoins.filter(x => x.id !== action.payload.id)] };
        case 'set_user_address':
            return { ...state, userAddress: action.payload.userAddress };
        default:
            return state
    }
}