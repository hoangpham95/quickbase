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

import {
  isGettingParts,
  parts,
  getPartsFailure,
  getPartsError,
  isAddingPart,
  addPartSuccess,
  addPartFailure,
  addPartError,
  barcodeDeleting,
  deletePartSuccess,
  deletePartFailure,
  deletePartError,
} from 'src/reducers/parts';

export default combineReducers({
  navigation,

  ticket,
  isLoggingIn,
  loginFailure,
  loginError,

  isGettingParts,
  parts,
  getPartsFailure,
  getPartsError,

  isAddingPart,
  addPartSuccess,
  addPartFailure,
  addPartError,

  barcodeDeleting,
  deletePartSuccess,
  deletePartFailure,
  deletePartError,
});
