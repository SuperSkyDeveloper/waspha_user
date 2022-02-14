import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';
import util from '../../util';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  bgImage: {
    width: '100%',
    minHeight: 169,
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginContent: {
    paddingHorizontal: 65,
  },

  loginSection: {
    marginTop: 38,
    paddingHorizontal: 50,
  },
  forgetPwd: {
    alignSelf: 'flex-end',
    marginTop: 9,
  },
  paddingHr: {
    paddingHorizontal: 48,
  },
  loginBtnWrap: {
    marginTop: 20,
  },
  signupSec: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 55,
  },
  loginBtn: {
    height: 50,
  },
  gradBtn: {
    borderRadius: 7,
  },
  showPwsdWrap: {
    position: 'absolute',
  },
  termsSec: {
    alignItems: 'center',
    marginTop: 37,
  },
  memeSec: {
    alignItems: 'center',
    marginTop: -24,
  },
  termWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
