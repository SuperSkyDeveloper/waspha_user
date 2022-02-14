import {StyleSheet} from 'react-native';
import {Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  list: {
    flex: 1,
    width: Metrics.screenWidth,
    paddingLeft: 17,
    paddingTop: 38,
    paddingRight: 13,
  },
});
