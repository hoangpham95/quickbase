/**
 * @flow
 */

import { connect } from 'react-redux';

import { addPart } from 'src/actions/parts';
import AddPartScreenComponent from 'src/components/AddPartScreen/component';

const mapStateToProps = state => {
  const {
    ticket,
    isAddingPart,
    addPartSuccess,
    addPartError,
    addPartFailure,
  } = state;

  return {
    ticket,
    isAddingPart,
    addPartSuccess,
    addPartError,
    addPartFailure,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    addPart: (ticket, part) => {
      dispatch(addPart(ticket, part));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPartScreenComponent);
