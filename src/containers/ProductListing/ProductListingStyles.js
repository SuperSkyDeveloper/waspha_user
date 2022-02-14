import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  categoryListing: {
    marginTop: 15,
    marginBottom: 30,
  },

  productListing: {
    flex: 1,
  },

  btnWrap: {
    paddingHorizontal: 30,
    backgroundColor: Colors.white,
    paddingVertical: 10,
  },
});
