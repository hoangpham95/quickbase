/**
 * @flow
 */

import React from 'react';

import { Provider, connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers';

import store from 'src/configureStore';
import Navigator from 'src/navigator';

const addListener = createReduxBoundAddListener('root');

class AppComponent extends React.Component {
  render() {
    return (
      <Navigator
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.navigation,
          addListener,
        })}
      />
    );
  }
}

const mapStateToProps = state => ({
  navigation: state.navigation,
});

const AppContainer = connect(mapStateToProps)(AppComponent);
export default () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};
