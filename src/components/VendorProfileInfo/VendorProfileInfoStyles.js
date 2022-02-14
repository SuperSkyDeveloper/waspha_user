import {StyleSheet} from 'react-native';
import {Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  modalStyle: {
    borderRadius: Metrics.borderRadiusMidLarge,
    paddingLeft: Metrics.mediumBaseMargin,
    paddingVertical: Metrics.mediumBaseMargin,
  },
});
