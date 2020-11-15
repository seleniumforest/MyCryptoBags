import { createStore } from 'redux'
import portfolio from './reducers/portfolio'

//todo need to create bridge between localstorage and state
let persistedState = undefined;
const cacheKey = 'portfolio';
const cacheData = localStorage.getItem(cacheKey);

if (cacheData)
    persistedState = JSON.parse(cacheData);

const store = createStore(portfolio, persistedState);

export default store;
