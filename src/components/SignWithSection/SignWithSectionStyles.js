import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles} from '../../theme';

export default StyleSheet.create({
  loginViaSec: {
    marginTop: 22,
    alignItems: 'center',
  },
  loginViaWrap: {
    marginVertical: 11,
  },
  col: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 13,
    marginHorizontal: 3,

    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
  iconSize: {
    width: 17,
    height: 17,
    resizeMode: 'contain',
  },
  fb: {
    backgroundColor: Colors.chambray,
  },
  gmail: {
    backgroundColor: Colors.punch,
  },
  linkedin: {
    backgroundColor: Colors.denim,
  },
  paddingHr: {
    paddingHorizontal: 48,
  },

  fullScreenLoader: {
    position: 'absolute',
    width: Metrics.screenWidth * 3,
    height: Metrics.screenHeight * 2,
    zIndex: 9,
    top: -Metrics.screenHeight,
    left: -Metrics.screenWidth,
    ...AppStyles.centerInner,
  },
  screenLoaderIndicator: {
    position: 'absolute',
    zIndex: 10,
    width: '100%',
    height: '100%',
  },
});
