import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  headingWrap: {
    alignItems: 'center',
    paddingHorizontal: 38,
    paddingBottom: 15,
  },
  walletSec: {
    marginHorizontal: 21,
    marginTop: 0,
    backgroundColor: Colors.white,
    paddingTop: 18,
    paddingBottom: 26,
    borderRadius: 5,

    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  walletImg: {
    width: 20,
    height: 20,
  },
  pHorizontal: {
    paddingLeft: 22,
    paddingRight: 43,
  },
  line: {
    marginTop: 41,
    marginBottom: 21,
  },
  btnWrap: {
    marginTop: 20,
    paddingHorizontal: 50,
  },
  btn: {
    height: 44,
  },
  qrImg: {
    position: 'absolute',
    right: 40,
    top: 10,
  },

  radioBtn: {
    width: 17,
    height: 17,
    borderWidth: 1,
    borderColor: Colors.resolutionBlue,
    borderRadius: 60,
    overflow: 'hidden',
    marginTop: 3,
  },
  circle: {
    backgroundColor: Colors.athensGray,
    width: 45,
    height: 45,
    borderRadius: 50,
    position: 'absolute',
    bottom: -38,
    right: -25,
  },
  activeRadioBtn: {
    backgroundColor: Colors.resolutionBlue,
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  radioBtnWrap: {
    borderWidth: 1,
    padding: 3,
    overflow: 'hidden',
    marginTop: 3,
    width: 17,
    height: 17,
    borderWidth: 1,
    borderColor: Colors.resolutionBlue,
    borderRadius: 60,
  },
  rightCircle: {
    backgroundColor: Colors.athensGray,
    width: 45,
    height: 45,
    borderRadius: 50,
    position: 'absolute',
    bottom: -38,
    left: -25,
  },

  removePromoWrap: {
    marginLeft: 14,
    marginTop: 4,
    paddingVertical: 8,
    paddingLeft: 8,
  },
});
