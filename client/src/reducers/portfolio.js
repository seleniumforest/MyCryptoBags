let defaultState = {
    coins: [],
    coinsLoaded: false,
    selectedCoins: [],
    userAddress: '',
    updating: {
        timerId: 0,
        lastUpdatedTime: 0,
        hasChanges: false
    }
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
            newCoinList = newCoinList.sort((a, b) => a.count * b.count < b.price * a.price ? -1 : 1);
            return {
                ...state,
                selectedCoins: newCoinList,
                updating: {
                    ...state.updating,
                    hasChanges: true
                }
            };
        case 'add_coin':
            if (state.selectedCoins.filter(x => x.id === action.payload.newCoin.id).length !== 0)
                return state;

            return {
                ...state,
                selectedCoins: [...state.selectedCoins, action.payload.newCoin],
                updating: {
                    ...state.updating,
                    hasChanges: true
                }
            };
        case 'remove_coin':
            return {
                ...state,
                selectedCoins: [...state.selectedCoins.filter(x => x.id !== action.payload.id)],
                updating: {
                    ...state.updating,
                    hasChanges: true
                }
            };  
        case 'sort' :
            return {
                ...state,
                selectedCoins: state.selectedCoins.sort((a, b) => a.count * a.price > b.count * b.price ? -1 : 1),
                updating: {
                    ...state.updating,
                }
            }; 
        default:
            return state
    }
}