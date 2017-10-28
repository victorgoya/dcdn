import reducers from "./reducers";
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

let store = createStore(reducers, applyMiddleware(thunk), applyMiddleware(logger));

export default store;
