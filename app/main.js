import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

import DataStore from './flux/DataStore.js';

const store = new DataStore();

/*eslint-disable */
ReactDOM.render(
  <App datastore={store} />,
  document.getElementById('main')
);
