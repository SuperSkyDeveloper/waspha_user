import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';
import util from '../../util';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    paddingHorizontal: 20,
    width: Metrics.screenWidth,
    minHeight: 375,
    flexDirection: 'row',
    alignItems: 'center',
    resizeMode: 'stretch',
  },
  loginContent: {
    marginHorizontal: 35,
    marginTop: 80,
    flex: 1,
  },
  loginViaSec: {
    marginTop: 30,
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
    paddingVertical: 10,
    marginHorizontal: 3,
  },
  iconSize: {
    width: 20,
    height: 20,
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
  loginSection: {
    marginTop: 38,
    paddingHorizontal: 58,
  },
  forgetPwd: {
    flexDirection: 'row',
  },
  paddingHr: {
    paddingHorizontal: 48,
  },
  loginBtnWrap: {
    marginTop: 20,
  },
  signupSec: {
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 55,
  },
  loginBtn: {
    height: 50,
  },
  mask3: {
    position: 'absolute',
    top: -50,
    left: 0,
  },
  mask1: {
    position: 'absolute',
    bottom: -30,
    right: 0,
  },
  mask2: {
    position: 'absolute',
    bottom: -40,
    left: 20,
  },
  showPwsdWrap: {
    position: 'absolute',
    // top: 26 ,
  },
  gradBtn: {
    borderRadius: 7,
  },
  forgetWrap: {
    justifyContent: 'space-between',
    marginTop: 12,
  },
  radioBtn: {
    width: 16,
    height: 16,
    borderWidth: 1.5,
    borderRadius: 30,
    marginRight: 5,
  },
});
