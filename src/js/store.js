import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/index';

import { QUANTITY_SNEAKERS, SNEAKERS_PATH } from './constants';

const initialState = {
  sneakers: {
    isLoading: true,
    error: null,
    productsQuery: `${SNEAKERS_PATH}?releaseYear=${(new Date).getFullYear()}&from=0&to=${QUANTITY_SNEAKERS}`,
    selectedProduct: null,
    productslist: [],
    totalProducts: null,
  },
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