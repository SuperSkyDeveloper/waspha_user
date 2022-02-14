import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  loginBtnWrap: {
    paddingHorizontal: 36,
    marginTop: 90,
    paddingBottom: 35,
  },
  gradBtn: {
    borderRadius: 7,
  },
  loginBtn: {
    height: 50,
  },
  mask2: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    resizeMode: 'contain',
  },
  wrap: {
    marginTop: 60,
    paddingHorizontal: 60,
  },
  resendWrap: {
    alignItems: 'flex-end',
  },
  size: {
    width: 32,
    height: 32,
  },

  enterCodeStyle: {top: 26},
  modalWrap: {
    backgroundColor: Colors.white,
    width: Metrics.screenWidth - 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 7,
  },
  square: {
    borderBottomColor: Colors.grey,
    borderBottomWidth: 1,
    color: Colors.black,
  },
});
