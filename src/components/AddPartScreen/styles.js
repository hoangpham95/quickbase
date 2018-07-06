/**
 * @flow
 */

import { StyleSheet } from 'react-native';

import { COLOR_PRIMARY } from 'src/theme';

export default StyleSheet.create({
  root: {
    flex: 1,
  },

  fabButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
  },

  headerStyle: {
    backgroundColor: COLOR_PRIMARY,
  },

  labelStyle: {
    color: COLOR_PRIMARY,
  },
});
