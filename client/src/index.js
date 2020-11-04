import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux'
import portfolio from './reducers/portfolio'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

let persistedState = undefined;
const cacheKey = 'portfolio';
const cacheData = localStorage.getItem(cacheKey);

if (cacheData)
    persistedState = JSON.parse(cacheData);

const store = createStore(portfolio, persistedState);

const render = () => ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>, document.getElementById('root'));

render();

store.subscribe(() => {
    var state = store.getState();
    var data = {
        selectedCoins: state.selectedCoins
    }
    localStorage.setItem(cacheKey, JSON.stringify(data))
})

store.subscribe(render);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
