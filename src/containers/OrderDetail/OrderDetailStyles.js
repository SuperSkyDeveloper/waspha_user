import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.athensGraya,
  },
  wrap: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 18,
  },
  productRow: {
    justifyContent: 'space-between',
    marginTop: 12,
  },
});
