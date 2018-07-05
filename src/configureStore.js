/**
 * @flow
 */

import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

import reducers from 'src/reducers';

const navMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.navigation
);

export default createStore(
  reducers,
  applyMiddleware(thunk, navMiddleware, createLogger())
);
