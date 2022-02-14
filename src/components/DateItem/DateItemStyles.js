import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  dateWrap: {
    paddingHorizontal: 15,
    paddingVertical: 13,
    backgroundColor: Colors.white,
    alignItems: 'center',
    borderRadius: 6,
    margin: 5,

    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});
