/**
 * @flow
 */

import api from 'src/api';

import { AsyncStorage } from 'react-native';
import { parseString } from 'react-native-xml2js';
import { TICKET } from 'src/constants';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN_ERROR = 'LOGIN_ERROR';

const requestLogin = () => {
  return {
    type: LOGIN,
  };
};

const successLogin = ticket => {
  return {
    type: LOGIN_SUCCESS,
    ticket,
  };
};

const failedLogin = error => {
  return {
    type: LOGIN_FAILED,
    error,
  };
};

const errorLogin = error => {
  return {
    type: LOGIN_ERROR,
    error,
  };
};

export const checkToken = () => {
  return dispatch => {
    AsyncStorage.getItem(TICKET, (err, ticket) => {
      if (ticket && !err) {
        dispatch(successLogin(ticket));
      }
    });
  };
};

export const login = user => {
  return dispatch => {
    dispatch(requestLogin());
    let query =
      'a=API_Authenticate' +
      `&username=${user.email}&password=${user.password}`;

    api
      .get(`/main?${query}`)
      .then(result => {
        const data = result.data;
        parseString(data, async (err, xmlResult) => {
          console.log('xmlResult', xmlResult);
          if (xmlResult && parseInt(xmlResult.qdbapi.errcode[0], 10) === 0) {
            const ticket = xmlResult.qdbapi.ticket[0];
            await AsyncStorage.setItem(TICKET, ticket);
            dispatch(successLogin(ticket));
          } else if (xmlResult.qdbapi.errcode) {
            const error = xmlResult.qdbapi.errtext[0];
            dispatch(failedLogin(error));
          } else {
            dispatch(errorLogin(err));
          }
        });
      })
      .catch(err => {
        dispatch(errorLogin(err));
      });
  };
};
