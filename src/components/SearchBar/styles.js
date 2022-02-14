// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles, Fonts} from '../../theme';
import Util from '../../util';

export default StyleSheet.create({
  container: {
    ...AppStyles.mTop5,
    ...AppStyles.mBottom5,

    // paddingHorizontal: Metrics.baseMargin
  },
  searchWrapper: {
    backgroundColor: Colors.transparent1,
    alignSelf: 'center',
    height: 50,
    borderRadius: 10,
    ...AppStyles.flexRow,
    ...AppStyles.centerInner,
  },
  icon: {
    width: 28,
    height: 28,
    marginVertical: 10,
    marginLeft: 10,
  },
  textInput: {
    fontSize: 16,
    fontWeight: 'bold',
    opacity: 0.8,
    color: '#676767',
    fontFamily: Fonts.type.base,
    ...AppStyles.flex,
    ...AppStyles.pRight10,
    height: Util.isPlatformAndroid() ? 40 : 36,

    ...AppStyles.pTop0,
    ...AppStyles.pBottom0,
  },
});
