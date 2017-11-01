import reducers from "./reducers";
import { compose, applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';

const enhancer = compose(
  applyMiddleware(thunk),
  applyMiddleware(logger),
  persistState(['currentToken'])
)

let store = createStore(reducers, enhancer);

export default store;
