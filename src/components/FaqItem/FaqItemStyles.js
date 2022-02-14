import {StyleSheet} from 'react-native';
import {Metrics, Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  hLine: {
    marginHorizontal: Metrics.smallMargin,
    borderBottomColor: Colors.border.hepta,
    borderBottomWidth: 0.5,
  },

  iconStyle: {
    transform: [{rotate: '-180deg'}],
  },

  questionText: {
    maxWidth: Metrics.screenWidth - 70,
    fontSize: Fonts.size.xxSmall,
  },

  descText: {
    paddingVertical: Metrics.mediumBaseMargin,
  },

  icon: {
    marginTop: Metrics.smallMargin,

    tintColor: Colors.black,
  },

  spacing: {
    paddingVertical: Metrics.mediumBaseMargin,
    marginLeft: Metrics.smallMargin,
    marginRight: Metrics.baseMargin,
    justifyContent: 'space-between',
  },

  idTextStyle: {marginLeft: Metrics.xsmallMargin, fontSize: Fonts.size.xxSmall},
});
