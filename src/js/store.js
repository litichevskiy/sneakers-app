import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/index';

const initialState = {
  counter: 0,
  // genders: [],
  // brands: [],
  // colors: [],
};

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const configureStore = preloadedState => {
  return createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(
      applyMiddleware( thunkMiddleware )
    )
  )
};

function initStore() {
  return configureStore(initialState);
};

export default initStore;