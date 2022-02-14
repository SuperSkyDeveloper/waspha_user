import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  categoryWrap: {
    ...AppStyles.alignItemsCenter,
    ...AppStyles.basePadding,
  },

  categoryName: {
    color: Colors.white,
    fontSize: Fonts.size.xxSmall,
  },

  getFocus: {},
});
