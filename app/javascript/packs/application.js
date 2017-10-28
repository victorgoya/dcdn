import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Main from './components/main';
import { Provider } from 'react-redux';

import store from "./store";
import { updateConfiguration } from './actions/configuration';

const App = () => (
  <Provider store={store}>
    <MuiThemeProvider>
      <Main />
    </MuiThemeProvider>
  </Provider>
);

document.addEventListener("DOMContentLoaded", e => {
  const configuration = {};
  const AppElement = document.getElementById('app');
  for (const attribute of AppElement.attributes) {
    if (attribute.nodeName.match(/^data/)) {
      configuration[attribute.nodeName.replace(/^data-/, '')] = attribute.nodeValue;
    }
  }
  store.dispatch(updateConfiguration(configuration));

  ReactDOM.render(
    <App />, document.getElementById('app')
  );
})
