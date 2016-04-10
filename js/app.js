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
import createHistory from 'history/lib/createBrowserHistory';
import * as actionCreators from './actions/AppActions';
import configureStore from './configureStore';

// Import the pages
import HomePage from './components/pages/HomePage.react';
import NotFoundPage from './components/pages/NotFound.react';
import Article from './components/pages/Article.react';
import Entity from './components/pages/Entity.react';
import Author from './components/pages/Author.react';
import Publisher from './components/pages/Publisher.react';
import Login from './components/pages/Login.react';
import App from './components/App.react';

// Import the CSS file, which HtmlWebpackPlugin transfers to the build folder
import '../css/main.css';

const store = configureStore();

// Make reducers hot reloadable, see http://stackoverflow.com/questions/34243684/make-redux-reducers-and-other-non-components-hot-loadable
if (module.hot) {
  module.hot.accept('./reducers/rootReducer', () => {
    const nextRootReducer = require('./reducers/rootReducer').default;
    store.replaceReducer(nextRootReducer);
  });
}

// FETCH PERSON
let routes = (
      <Route path='/' component={App}>
        <IndexRoute component={Login} />
      </Route>
  );
if (store.getState().personReducer.person === undefined) store.dispatch(actionCreators.fetchPerson());

if (store.getState().personReducer.person) {
  routes = (
        <Route path='/' component={App}>
          <IndexRoute component={HomePage} />
          <Route path='/articles/:articleId' component={Article} />
          <Route path='/entities/:entityId' component={Entity} />
          <Route path='/authors/:authorId' component={Author} />
          <Route path='/publishers/:publisherId' component={Publisher} />
        </Route>
    );
}

routes = (
      <Route path='/' component={App}>
        <IndexRoute component={HomePage} />
        <Route path='/articles/:articleId' component={Article} />
        <Route path='/entities/:entityId' component={Entity} />
        <Route path='/authors/:authorId' component={Author} />
        <Route path='/publishers/:publisherId' component={Publisher} />
      </Route>
  );

ReactDOM.render(
  <Provider store={store}>
      <Router onUpdate={() => window.scrollTo(0, 0)} history={createHistory()}>
      {routes}
        <Route path='*' component={NotFoundPage} />
      </Router>
    </Provider>,
  document.getElementById('app')
);
