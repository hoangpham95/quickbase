/**
 * @flow
 */

import { StyleSheet } from 'react-native';

import { COLOR_PRIMARY } from 'src/theme';

export default StyleSheet.create({
  refreshButton: {
    marginRight: 12,
  },

  fabButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
  },

  rootContainer: {
    flex: 1,
  },

  headerStyle: {
    backgroundColor: COLOR_PRIMARY,
  },

  loadingText: {
    textAlign: 'center',
    color: COLOR_PRIMARY,
    fontSize: 16,
    marginVertical: 8,
  },

  listItem: {
    padding: 8,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderColor: COLOR_PRIMARY,
  },

  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});
