let defaultState = {
    coins: [],
    coinsLoaded: false,
    selectedcoins: []
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'fetch_coins':
            return {
                ...state,
                coins: action.payload.coins,
                coinsLoaded: action.payload.coinsLoaded
            };
        case 'add_coin_value':
            var newCoinList = [...state.selectedcoins];
            newCoinList.find(x => x.id === action.payload.id).count = action.payload.count;

            return {
                ...state,
                selectedcoins: newCoinList
            };
        case 'add_coin':
            if (state.selectedcoins.filter(x => x.id === action.payload.newCoin.id).length !== 0)
                return state;

            return { ...state, selectedcoins: [...state.selectedcoins, action.payload.newCoin] };
        case 'remove_coin':
            return { ...state, selectedcoins: [...state.selectedcoins.filter(x => x.id !== action.payload.id)] };
        default:
            return state
    }
}