let defaultState = {
    allcoins: [],
    coinsLoaded: false,
    selectedcoins: []
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'fetch_allcoins':
            return {
                ...state,
                allcoins: action.payload.allcoins,
                coinsLoaded: action.payload.coinsLoaded
            }
        case 'add_coin':
            return { ...state, selectedcoins: [...state.selectedcoins, action.payload.newCoin] };
        default:
            return state
    }
}