/**
 * @flow
 */

import { connect } from 'react-redux';

import { login, checkToken } from 'src/actions/login';
import AuthComponent from 'src/components/AuthScreen/component';

const mapStateToProps = state => {
  const { isLoggingIn, ticket, loginFailure, loginError } = state;

  return {
    isLoggingIn,
    ticket,
    loginFailure,
    loginError,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    login: user => dispatch(login(user)),
    checkToken: () => dispatch(checkToken()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthComponent);
