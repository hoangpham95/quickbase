/**
 * @flow
 */

import { StyleSheet } from 'react-native';

import { COLOR_PRIMARY } from 'src/theme';

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },

  labelStyle: {
    color: COLOR_PRIMARY,
  },

  imageStyle: {
    height: '30%',
    aspectRatio: 1,
    alignSelf: 'center',
  },

  button: {
    marginTop: 12,
  },
});
