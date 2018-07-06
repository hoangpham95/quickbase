import { StackNavigator } from 'react-navigation';

import AuthScreen from 'src/components/AuthScreen';
import MainScreen from 'src/components/MainScreen';
import AddPartScreen from 'src/components/AddPartScreen';

export default StackNavigator({
  Auth: {
    screen: AuthScreen,
    headers: {
      visible: false,
    },
  },
  Main: {
    screen: MainScreen,
  },
  AddPart: {
    screen: AddPartScreen,
  },
});
