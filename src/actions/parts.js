/**
 * @flow
 */

import api from 'src/api';
import { APP_TOKEN, DB_ID } from 'src/constants';
import xml2js, { parseString } from 'react-native-xml2js';

export const GET_PARTS = 'GET_PARTS';
export const GET_PARTS_SUCCESS = 'GET_PARTS_SUCCESS';
export const GET_PARTS_FAILED = 'GET_PARTS_FAILED';
export const GET_PARTS_ERROR = 'GET_PARTS_ERROR';

export const ADD_PART = 'ADD_PART';
export const ADD_PART_SUCCESS = 'ADD_PART_SUCCESS';
export const ADD_PART_FAILED = 'ADD_PART_FAILURE';
export const ADD_PART_ERROR = 'ADD_PART_ERROR';

export const DELETE_PART = 'DELETE_PART';
export const DELETE_PART_SUCCESS = 'DELETE_PART_SUCCESS';
export const DELETE_PART_FAILED = 'DELETE_PART_FAILED';
export const DELETE_PART_ERROR = 'DELETE_PART_ERROR';

const requestGetParts = () => {
  return {
    type: GET_PARTS,
  };
};

const successGetParts = parts => {
  return {
    type: GET_PARTS_SUCCESS,
    parts,
  };
};

const failedGetParts = error => {
  return {
    type: GET_PARTS_FAILED,
    error,
  };
};

const errorGetParts = error => {
  return {
    type: GET_PARTS_ERROR,
    error,
  };
};

const parseParts = (array: Array<any>) => {
  const result = [];
  array.forEach(itm => {
    const part = {};
    part.barcode = itm.barcode[0];
    part.name = itm.name[0];
    part.update_id = itm.update_id[0];

    result.push(part);
  });

  return result;
};

export const getParts = (ticket: string) => {
  return dispatch => {
    dispatch(requestGetParts());
    let query = `a=API_DoQuery&ticket=${ticket}&apptoken=${APP_TOKEN}`;

    api
      .get(`/${DB_ID}?${query}`)
      .then(result => {
        const data = result.data;
        parseString(data, (err, xmlResult) => {
          if (xmlResult && parseInt(xmlResult.qdbapi.errcode[0], 10) === 0) {
            const parts = parseParts(xmlResult.qdbapi.record);
            console.log(parts);
            dispatch(successGetParts(parts));
          } else if (xmlResult.qdbapi.errcode) {
            const error = xmlResult.adbapi.errtext[0];
            dispatch(failedGetParts(error));
          } else {
            dispatch(errorGetParts(err));
          }
        });
      })
      .catch(err => {
        dispatch(errorGetParts(err));
      });
  };
};

const requestAddPart = part => {
  return {
    type: ADD_PART,
    part,
  };
};

const successAddPart = () => {
  return {
    type: ADD_PART_SUCCESS,
  };
};

const failedAddPart = error => {
  return {
    type: ADD_PART_FAILED,
    error,
  };
};

const errorAddPart = error => {
  return {
    type: ADD_PART_ERROR,
    error,
  };
};

export const addPart = (ticket: string, part: Object) => {
  return dispatch => {
    dispatch(requestAddPart(part));

    if (!part.name || !part.barcode) {
      return dispatch(failedAddPart('Error: empty name and barcode'));
    }

    const query =
      'a=API_AddRecord' +
      `&ticket=${ticket}&apptoken=${APP_TOKEN}` +
      `&_fnm_name=${part.name}&_fnm_barcode=${part.barcode}`;

    api
      .get(`/${DB_ID}?${query}`)
      .then(result => {
        const data = result.data;
        parseString(data, (err, xmlResult) => {
          if (xmlResult && parseInt(xmlResult.qdbapi.errcode, 10) === 0) {
            dispatch(successAddPart());
          } else if (xmlResult.qdbapi.errcode) {
            const error = xmlResult.adbapi.errtext[0];
            dispatch(failedAddPart(error));
          } else {
            dispatch(errorAddPart(err));
          }
        });
      })
      .catch(err => dispatch(errorAddPart(err)));
  };
};

const requestDeletePart = barcode => {
  return {
    type: DELETE_PART,
    barcode,
  };
};

const successDeletePart = () => {
  return {
    type: DELETE_PART_SUCCESS,
  };
};

const failedDeletePart = error => {
  return {
    type: DELETE_PART_FAILED,
    error,
  };
};

const errorDeletePart = error => {
  return {
    type: DELETE_PART_ERROR,
    error,
  };
};

export const deletePart = (ticket: string, barcode: string) => {
  return dispatch => {
    dispatch(requestDeletePart(barcode));
    const xmlquery = new xml2js.Builder().buildObject({
      qdbapi: {
        ticket: ticket,
        apptoken: APP_TOKEN,
        query: `{'8'.EX.'${barcode}'}`,
      },
    });
    console.log('query', xmlquery);
    api({
      method: 'POST',
      url: 'https://hoangpham.quickbase.com/db/bnts6segz',
      data: xmlquery,
      headers: {
        'Content-Type': 'application/xml',
        'QUICKBASE-ACTION': 'API_PurgeRecords',
      },
    })
      .then(result => {
        const data = result.data;
        parseString(data, (err, xmlResult) => {
          console.log(xmlResult);
          if (xmlResult && parseInt(xmlResult.qdbapi.errcode, 10) === 0) {
            dispatch(successDeletePart());
          } else if (xmlResult.qdbapi.errcode) {
            const error = xmlResult.adbapi.errtext[0];
            dispatch(failedDeletePart(error));
          } else {
            dispatch(errorDeletePart(err));
          }
        });
      })
      .catch(err => dispatch(errorDeletePart(err)));
  };
};
