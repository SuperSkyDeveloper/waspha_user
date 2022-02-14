import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  paymentWrap: {
    backgroundColor: Colors.white,
    paddingHorizontal: 25,
    paddingBottom: 70,
    paddingTop: 31,
    marginVertical: 10,

    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  firstSec: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  radioBtn: {
    width: 26,
    height: 26,
    borderWidth: 1,
    borderColor: Colors.tundora,
    borderRadius: 100,
  },
});
