import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store/store';


import App from './App';

const store = configureStore();
const anchor = document.getElementById("root");

const jsx = (
    <Provider store={store}>
        <App/>
    </Provider>
);

ReactDOM.render(jsx, anchor);