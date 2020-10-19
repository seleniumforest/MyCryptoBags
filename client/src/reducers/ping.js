let defaultState = {
    isLoaded: false,
    geckoSays: '',
    errorMessage: ''
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'ping':
            return { 
                isLoaded: action.payload.isLoaded, 
                geckoSays: action.payload.geckoSays, 
                errorMessage: action.payload.errorMessage 
            };    
        default:
            return state
    }
}