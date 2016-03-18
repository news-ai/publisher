/**
 *
 * app.js
 *
 * This is the entry file for the application, mostly just setup and boilerplate
 * code. Routes are configured at the end of this file!
 *
 */

// Load the ServiceWorker, the Cache polyfill, the manifest.json file and the .htaccess file
import 'file?name=[name].[ext]!../serviceworker.js';
import 'file?name=[name].[ext]!../manifest.json';
import 'file?name=[name].[ext]!../.htaccess';

import { asyncGetFeed } from './actions/AppActions';

// Check for ServiceWorker support before trying to install it
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/serviceworker.js').then(() => {
//     // Registration was successful
//   }).catch(() => {
//     // Registration failed
//   });
// } else {
//   // No ServiceWorker Support
// }

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import createHistory from 'history/lib/createBrowserHistory';

// Import the pages
import HomePage from './components/pages/HomePage.react';
import NotFoundPage from './components/pages/NotFound.react';
import Article from './components/pages/Article.react';
import Entity from './components/pages/Entity.react';
import App from './components/App.react';

// Import the CSS file, which HtmlWebpackPlugin transfers to the build folder
import '../css/main.css';

// Create the store with the redux-thunk middleware, which allows us
// to do asynchronous things in the actions
import rootReducer from './reducers/rootReducer';
const loggerMiddleware = createLogger();
const createStoreWithMiddleware = applyMiddleware(
  thunk,
  loggerMiddleware
)(createStore);
const store = createStoreWithMiddleware(rootReducer);

// Make reducers hot reloadable, see http://stackoverflow.com/questions/34243684/make-redux-reducers-and-other-non-components-hot-loadable
// if (module.hot) {
//   module.hot.accept('./reducers/rootReducer', () => {
//     const nextRootReducer = require('./reducers/rootReducer').default;
//     store.replaceReducer(nextRootReducer);
//   });
// }

store.dispatch(asyncGetFeed()).then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={createHistory()}>
        <Route path='/' component={App}>
          <IndexRoute component={HomePage} />
          <Route path='/article/:articleId' component={Article} />
          <Route path='/entity/:entityId' component={Entity} />
        </Route>
        <Route path='*' component={NotFoundPage} />
      </Router>
    </Provider>,
    document.getElementById('app')
  );
});
