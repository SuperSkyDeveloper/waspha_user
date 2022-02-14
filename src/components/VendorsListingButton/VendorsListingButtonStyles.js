import {StyleSheet} from 'react-native';
import util from '../../util';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: util.isPlatformAndroid() ? 160 : 190,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  buttonStyle: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },

  buttonsRTLStyle: {
    position: 'absolute',
    top: util.isPlatformAndroid() ? 160 : 190,
    flexDirection: 'row-reverse',
    right: 0,
  },
});
