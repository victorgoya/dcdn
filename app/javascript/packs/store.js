import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from "./reducers";

let store = createStore(reducers, applyMiddleware(thunk), applyMiddleware(logger));

export default store;
