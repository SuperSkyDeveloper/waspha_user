import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics, AppStyles} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  modalStyle: {
    borderRadius: Metrics.borderRadiusMidLarge,
    paddingLeft: Metrics.mediumBaseMargin,
    paddingRight: Metrics.mediumBaseMargin,
    paddingVertical: Metrics.doubleMediumBaseMargin,
  },
  headTextWrap: {
    alignItems: 'center',
    paddingTop: Metrics.doubleBaseMargin,
    paddingBottom: Metrics.doubleMediumBaseMargin,
    marginRight: Metrics.doubleBaseMargin,
  },
  headerText: {
    color: Colors.white,
    fontSize: Fonts.size.large,
  },

  optionItem: {
    marginBottom: Metrics.doubleBaseMargin,
  },

  optionIconStyle: {height: 21, width: 21, marginRight: Metrics.baseMargin},

  optionText: {
    color: Colors.white,
    fontSize: Fonts.size.normal,
  },
  radioBtn: {
    borderColor: Colors.peta,
    opacity: 0.5,
    borderWidth: 3,
    borderRadius: Metrics.borderRadiusXXLarge,
    height: 25,
    width: 25,
  },

  activeRadioBtn: {
    opacity: 0.7,
    borderRadius: Metrics.borderRadiusXXLarge,
    borderColor: Colors.peta,
    borderWidth: 3,
    alignSelf: 'center',
    marginTop: Metrics.xsmallMargin,
    backgroundColor: Colors.peta,
    height: 13,
    width: 13,
  },

  btnWrap: {
    paddingRight: Metrics.doubleBaseMargin,
    paddingLeft: Metrics.baseMargin,
  },

  btnStyle: {
    marginTop: Metrics.baseMargin,
    borderRadius: Metrics.borderRadiusMedium,
    backgroundColor: Colors.octa,
  },

  btnTextStyle: {
    fontSize: Fonts.size.normal,
    color: Colors.white,
    fontWeight: 'bold',
  },
});
