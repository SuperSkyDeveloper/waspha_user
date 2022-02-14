import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 10,
  },
  imageSelectorWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modal: {
    alignItems: 'center',
    margin: 20,
  },
  linearWrap: {
    ...AppStyles.flex,

    paddingVertical: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    borderRadius: Metrics.borderRadiusLarge,
  },
});
