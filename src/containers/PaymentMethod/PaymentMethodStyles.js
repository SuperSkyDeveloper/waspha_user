import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,

    paddingTop: 10,
  },
  paymentSec: {
    paddingHorizontal: 16,
    paddingVertical: 22,

    flex: 1,
    backgroundColor: Colors.athensGraya,
  },
  btnWrap: {
    paddingHorizontal: 35,
    marginBottom: 20,
    marginTop: 10,
  },
  btn: {
    height: 55,
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
  addIcon: {
    resizeMode: 'contain',
    marginRight: 8,
    width: 20,
    height: 20,
    marginBottom: 9,
    backgroundColor: 'red',
  },
});
