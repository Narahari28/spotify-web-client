/* Main JS file, specifies how the site renders and where URL's route to */

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import configureStore from './stores/configureStore';
import * as actions from './actions';
import App from './components/App';
import User from './components/User';
import Err from './components/Err';
import Login from './components/Login';
import Playlist from './components/Playlist'

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Login} />
        <Route path="/callback" component={User} />
        <Route path="/error(/:errorMsg)" component={Err} />
        <Route path="/playlist/user/:user/:playlist/:name" component={Playlist} />
        <Route path="*" component={Err} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);

module.hot.accept();