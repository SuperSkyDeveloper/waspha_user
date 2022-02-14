import {StyleSheet} from 'react-native';
import {Colors, AppStyles} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    // padding: 10,
    paddingRight: 0,
    justifyContent: 'flex-end',
  },
  backBtn: {
    marginLeft: 16,
    marginBottom: 22,
  },

  backBtnRTL: {
    position: 'absolute',
    right: 19,
    transform: [{rotate: '-180deg'}],
  },
});
