import React from 'react';
import ReactDOM from 'react-dom';
import Portfolio from './components/Portfolio';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';

const cacheKey = 'portfolio';

const render = () => ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Portfolio />
        </BrowserRouter>
    </Provider>, document.getElementById('root'));

render();

store.subscribe(() => {
    var state = store.getState();
    var data = {
        selectedCoins: state.selectedCoins,
        customCoins: state.customCoins
    }
    localStorage.setItem(cacheKey, JSON.stringify(data))
})

store.subscribe(render);

console.log(`running in ${process.env.NODE_ENV} mode`);