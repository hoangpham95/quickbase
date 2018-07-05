/**
 * @flow
 */

import { combineReducers } from 'redux';

import { navigation } from 'src/reducers/nav';

import {
  isLoggingIn,
  ticket,
  loginFailure,
  loginError,
} from 'src/reducers/auth';

export default combineReducers({
  navigation,

  ticket,
  isLoggingIn,
  loginFailure,
  loginError,
});
