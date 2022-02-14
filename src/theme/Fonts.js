// @flow

import {Platform} from 'react-native';

const type = {
  /* base: "ParalucentText-Book",
  medium: "Paralucent-Medium" */
  light: Platform.select({
    ios: 'Montserrat-Light',
    android: 'Montserrat-Light',
  }),
  base: Platform.select({
    ios: 'Montserrat-Regular',
    android: 'Montserrat-Regular',
  }),
  medium: Platform.select({
    ios: 'Montserrat-Medium',
    android: 'Montserrat-Medium',
  }),
  semiBold: Platform.select({
    ios: 'Montserrat-SemiBold',
    android: 'Montserrat-SemiBold',
  }),
  bold: Platform.select({
    ios: 'Montserrat-Bold',
    android: 'Montserrat-Bold',
  }),
  extraBold: Platform.select({
    ios: 'Montserrat-ExtraBold',
    android: 'Montserrat-ExtraBold',
  }),
  italic: Platform.select({
    ios: 'Montserrat-Italic',
    android: 'Montserrat-Italic',
  }),
};

// Metrics.generatedFontSize(ios, android)

const size = {
  xxxxSmall: 10,
  xxxSmall: 11,
  xxSmall: 13,
  xSmall: 14,
  small: 15,
  normal: 17,
  medium: 18,
  large: 20,
  xLarge: 24,
  xxLarge: 30,
  xxxLarge: 36,
  xxxxLarge: 40,

  // new
  font6: 6,
  font7: 7,
  font8: 8,
  font9: 9,
  font10: 10,
  font11: 11,
  font12: 12,
  font13: 13,
  font14: 14,
  font15: 15,
  font16: 16,
  font17: 17,
  font18: 18,
  font20: 20,
  font21: 21,
  font22: 22,
  font23: 23,
  font24: 24,
  font27: 27,
  font28: 28,
  font30: 30,
  font36: 36,
  font40: 40,
  font41: 41,
  font45: 45,
  font47: 47,
};

export default {
  type,
  size,
};
