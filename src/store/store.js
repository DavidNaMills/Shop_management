import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import auth from './reducers/auth';
import notification from './reducers/notification';
import staff from './reducers/staff';
import customers from './reducers/customers';
import inventory from './reducers/inventory';

const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk];

export default ()=>{
    const store = createStore(
        combineReducers({
            auth,
            alert: notification,
            staff,
            customers,
            inventory
        }),
        enhancer(),
        applyMiddleware(...middleware)
    );
    return store;
}