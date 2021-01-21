import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/index';

import { SNEAKERS_API, QUANTITY_SNEAKERS, SNEAKERS_PATH, SNEAKERS_PAGE_NUMBER } from './constants';

const initialState = {
  sneakers: {
    isLoading: true,
    error: null,
    productsQuery: `${SNEAKERS_API}${SNEAKERS_PATH}?limit=${QUANTITY_SNEAKERS}&page=${SNEAKERS_PAGE_NUMBER}`,
    selectedProduct: null,
    productslist: [],
    totalProducts: 0,
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