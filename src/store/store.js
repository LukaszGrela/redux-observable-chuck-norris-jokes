import { createStore, compose, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

import rootEpic from './epics';

const epicMiddleware = createEpicMiddleware();

const middleware = [epicMiddleware, thunk];
const enhancers = [];
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(...middleware), ...enhancers)
);
epicMiddleware.run(rootEpic);

export default store;
