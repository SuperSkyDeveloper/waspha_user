import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';
import util from '../../util';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  loginBtnWrap: {
    paddingHorizontal: 36,
    marginTop: 80,
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
  wraper: {
    paddingHorizontal: 53,
  },
  showPwsdWrap: {
    position: 'absolute',
    right: 0,
    top: util.isPlatformAndroid() ? 20 : 18,
  },
  radioBtn: {
    position: 'absolute',
  
    padding:20
  },
  radioBtnTwo: {
    position: 'absolute',
    left: -30,
    top: 16,
  },
  radio: {
    width: 16,
    height: 16,
    borderColor: Colors.black,
    borderWidth: 2,
    marginTop: 2,
    borderRadius: 30,
  },
  activeRadio: {
    width: 16,
    height: 16,
    borderColor: Colors.black,
    borderWidth: 2,
    marginTop: 2,
    borderRadius: 30,
    backgroundColor: Colors.black,
  },
  radioImg: {
    width: 22,
    height: 22,
  },
});
