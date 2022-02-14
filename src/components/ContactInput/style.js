import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {},
  containerStyle: {
    backgroundColor: Colors.transparent,
    height: 50,

    flexDirection: 'row',
  },
  textContainerStyle: {
    backgroundColor: Colors.transparent,
    paddingHorizontal: Metrics.smallMargin,
  },
  flagButtonStyle: {width: 60},
  textInputProps: {
    top: 0.75,
    height: 40,
    backgroundColor: Colors.transparent,
    fontSize: Fonts.size.xxSmall,
  },
  codeTextStyle: {
    fontSize: Fonts.size.xxSmall,
  },
});
