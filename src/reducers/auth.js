/**
 * @flow
 */

import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_ERROR,
} from 'src/actions/login';

export const isLoggingIn = (state: boolean, action) => {
  switch (action.type) {
    case LOGIN:
      return true;
    default:
      return false;
  }
};

export const ticket = (state: string = null, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.ticket;
    default:
      return state;
  }
};

export const loginFailure = (state: any = null, action) => {
  switch (action.type) {
    case LOGIN_FAILED:
      return action.error;
    default:
      return null;
  }
};

export const loginError = (state: any = null, action) => {
  switch (action.type) {
    case LOGIN_ERROR:
      return action.error;
    default:
      return null;
  }
};
