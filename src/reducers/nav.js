/**
 * @flow
 */
import RootNavigator from 'src/navigator';

const initialState = RootNavigator.router.getStateForAction(
  RootNavigator.router.getActionForPathAndParams('Auth')
);

export const navigation = (state = initialState, action) => {
  const nextState = RootNavigator.router.getStateForAction(action, state);
  return nextState || initialState;
};
