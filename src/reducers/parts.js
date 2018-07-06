/**
 * @flow
 */

import {
  GET_PARTS,
  GET_PARTS_SUCCESS,
  GET_PARTS_FAILED,
  GET_PARTS_ERROR,
  ADD_PART,
  ADD_PART_SUCCESS,
  ADD_PART_FAILED,
  ADD_PART_ERROR,
  DELETE_PART,
  DELETE_PART_SUCCESS,
  DELETE_PART_ERROR,
  DELETE_PART_FAILED,
} from 'src/actions/parts';

export const isGettingParts = (state: boolean, action) => {
  switch (action.type) {
    case GET_PARTS:
      return true;
    default:
      return false;
  }
};

export const parts = (state: Array<any> = [], action) => {
  switch (action.type) {
    case GET_PARTS_SUCCESS:
      return action.parts;
    default:
      return state;
  }
};

export const getPartsFailure = (state: any = null, action) => {
  switch (action.type) {
    case GET_PARTS_FAILED:
      return action.error;
    default:
      return null;
  }
};

export const getPartsError = (state: any = null, action) => {
  switch (action.type) {
    case GET_PARTS_ERROR:
      return action.error;
    default:
      return null;
  }
};

export const isAddingPart = (state: boolean, action) => {
  switch (action.type) {
    case ADD_PART:
      return true;
    default:
      return false;
  }
};

export const addPartSuccess = (state: Array<any> = [], action) => {
  switch (action.type) {
    case ADD_PART_SUCCESS:
      return true;
    default:
      return false;
  }
};

export const addPartFailure = (state: any = null, action) => {
  switch (action.type) {
    case ADD_PART_FAILED:
      return action.error;
    default:
      return null;
  }
};

export const addPartError = (state: any = null, action) => {
  switch (action.type) {
    case ADD_PART_ERROR:
      return action.error;
    default:
      return null;
  }
};

export const barcodeDeleting = (state: string = '', action) => {
  switch (action.type) {
    case DELETE_PART:
      return action.barcode;
    default:
      return '';
  }
};

export const deletePartSuccess = (state: boolean = false, action) => {
  switch (action.type) {
    case DELETE_PART_SUCCESS:
      return true;
    default:
      return false;
  }
};

export const deletePartFailure = (state: any = null, action) => {
  switch (action.type) {
    case DELETE_PART_FAILED:
      return action.error;
    default:
      return null;
  }
};

export const deletePartError = (state: any = null, action) => {
  switch (action.type) {
    case DELETE_PART_FAILED:
      return action.error;
    default:
      return null;
  }
};
