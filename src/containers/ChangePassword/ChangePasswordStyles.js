import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  submitBtnWrap: {
    paddingTop: Metrics.tripleBaseMargin,
    paddingBottom: Metrics.doubleMediumBaseMargin,
    paddingRight: Metrics.doubleBaseMargin,
    paddingLeft: Metrics.doubleBaseMargin,
  },

  submitBtn: {
    height: 50,
    borderRadius: Metrics.borderRadiusMedium,
    backgroundColor: Colors.resolutionBlue,
  },

  contentSec: {
    marginHorizontal: Metrics.mediumBaseMargin,
  },

  showPwsdWrap: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});
