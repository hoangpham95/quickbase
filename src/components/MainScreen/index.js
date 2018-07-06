/**
 * @flow
 */

import { connect } from 'react-redux';

import { getParts, deletePart } from 'src/actions/parts';
import MainScreenComponent from 'src/components/MainScreen/component';

const mapStateToProps = state => {
  const {
    ticket,
    parts,
    isGettingParts,
    getPartsFailure,
    getPartsError,

    barcodeDeleting,
    deletePartSuccess,
    deletePartFailure,
    deletePartError,
  } = state;

  return {
    ticket,
    parts,
    isGettingParts,
    getPartsFailure,
    getPartsError,
    barcodeDeleting,
    deletePartSuccess,
    deletePartFailure,
    deletePartError,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    getParts: ticket => dispatch(getParts(ticket)),
    deletePart: (ticket, barcode) => dispatch(deletePart(ticket, barcode)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainScreenComponent);
