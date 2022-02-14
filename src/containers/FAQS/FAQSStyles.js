import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },

  emptyComponent: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 270,
    fontSize: Fonts.size.xxLarge,
  },
});
