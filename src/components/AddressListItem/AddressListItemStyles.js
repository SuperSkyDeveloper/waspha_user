import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  addressItem: {
    width: '100%',
    marginBottom: 25,
  },
  header: {
    backgroundColor: Colors.seashell,
    justifyContent: 'space-between',
    paddingRight: 25,
    paddingLeft: 12,
    paddingVertical: 8,
  },
  content: {
    minHeight: 190,
  },
  addressCard: {
    backgroundColor: Colors.silver1,
    paddingHorizontal: 15,
    paddingVertical: 8,
    position: 'absolute',
    bottom: 0,
    maxWidth: 230,
  },
});
