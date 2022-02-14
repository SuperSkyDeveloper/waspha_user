import {StyleSheet} from 'react-native';
import {Colors, AppStyles, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {},

  imageSelectorWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  linearWrap: {
    ...AppStyles.flex,

    paddingVertical: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    borderRadius: Metrics.borderRadiusLarge,
  },

  titleWrap: {
    alignSelf: 'center',
    paddingBottom: Metrics.doubleBaseMargin,
  },

  titleStyle: {
    fontSize: Fonts.size.large,
    color: Colors.white,
  },
  btnSec: {
    flexDirection: 'row',
    paddingBottom: Metrics.baseMargin,
  },
  btnWrap: {
    ...AppStyles.flex,
    marginRight: Metrics.smallMargin,
    marginLeft: Metrics.smallMargin,
  },
  btn1Text: {
    fontSize: Fonts.size.xSmall,
    color: Colors.white,
  },

  btn2Text: {
    fontSize: Fonts.size.xSmall,
    color: Colors.black,
  },

  btn1Style: {
    borderRadius: Metrics.borderRadiusMedium,
    backgroundColor: Colors.green2,
  },

  btn2Style: {
    borderRadius: Metrics.borderRadiusMedium,

    backgroundColor: Colors.white,
  },
  modal: {
    alignItems: 'center',
    margin: 20,
  },
});
