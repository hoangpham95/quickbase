/**
 * @flow
 */

import { connect } from 'react-redux';

import { getParts } from 'src/actions/parts';
import MainScreenComponent from 'src/components/MainScreen/component';

const mapStateToProps = state => {
  const {
    ticket,
    parts,
    isGettingParts,
    getPartsFailure,
    getPartsError,
  } = state;
  return { ticket, parts, isGettingParts, getPartsFailure, getPartsError };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    getParts: ticket => dispatch(getParts(ticket)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainScreenComponent);
