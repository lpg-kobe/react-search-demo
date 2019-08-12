import React from 'react';
import ReactDOM from 'react-dom';
import '@/assets/scss/reset.scss';
import '@/assets/scss/global.scss';
// rem2px
import '@/utils/rem.js';
import App from './App';
import * as serviceWorker from './serviceWorker';
// use Provider to send store around components
import { Provider } from 'react-redux';
import store from '@/store/index.js';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
