import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import initStore from './store';
import App from './App';

const store = initStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('.app')
);