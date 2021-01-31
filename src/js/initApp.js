import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import initStore from './store';
import App from './App';
import fetchData from './actions';

const initApp = () => {

  const store = initStore();
  const url = ( store.getState() ).sneakers.productsQuery;

  store.dispatch( fetchData( url ) );

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector('.app')
  );
};

export default initApp;