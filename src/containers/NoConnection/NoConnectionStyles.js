import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: Metrics.mediumBaseMargin,
  },
  img: {
    width: '100%',
    resizeMode: 'contain',
    maxHeight: 200,
    marginTop: Metrics.tripleMediumBaseMargin,
  },
  btnTextStyle: {
    color: Colors.white,
  },
  btn: {
    ...AppStyles.mTop50,
    width: 160,
    backgroundColor: Colors.hepta,
  },
  btnWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
