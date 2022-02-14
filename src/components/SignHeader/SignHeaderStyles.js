import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  bgImage: {
    width: '100%',
  },
  content: {
    marginTop: 140,
    marginBottom: 45,
    paddingHorizontal: 26,
  },
  headingSec: {
    alignItems: 'center',
    marginTop: 30,
  },
  mask1: {
    position: 'absolute',
    left: 0,
    bottom: -60,
  },

  backBtnWrap: {
    height: 40,
    width: 40,
    backgroundColor: Colors.black,
    borderRadius: 100,
    marginTop: 50,
  },

  backBtnStyle: {height: 25, width: 25, top: 7, left: 6},
});
