import React from 'react';
import Root from './src/native/index';
import configureStore from './src/store/index';

import 'globals';

// const Web3 = require('web3');


const { persistor, store } = configureStore();

export default function App() {
  return <Root store={store} persistor={persistor} />;
}
