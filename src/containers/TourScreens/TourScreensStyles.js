import {StyleSheet} from 'react-native';

import {Colors, Metrics, AppStyles} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
    paddingTop: Metrics.navBarHeight,
  },
  page1Wrapper: {
    ...AppStyles.flex,
    ...AppStyles.alignItemsCenter,
  },
  skipParent: {
    top: 30,
    right: 30,
    position: 'absolute',
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingTop: 3,
  },
  narration: {
    fontSize: 25,
    textAlign: 'center',
    paddingHorizontal: 50,
    fontWeight: '500',
    ...AppStyles.basePadding,
  },
  bold: {fontSize: 25, ...AppStyles.fontBold},
  centerImage: {
    ...AppStyles.flex,
  },
  button: {
    backgroundColor: Colors.blue,
    height: 66,
    marginBottom: 70,
    ...AppStyles.baseMargin,
  },
  buttonText: {
    backgroundColor: Colors.red,
    color: Colors.white,
  },
});
