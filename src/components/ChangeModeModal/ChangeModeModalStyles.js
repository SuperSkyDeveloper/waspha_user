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
    paddingBottom: Metrics.doubleMediumBaseMargin,
  },
  headTextWrap: {
    alignSelf: 'center',
    paddingTop: Metrics.doubleBaseMargin,
    paddingBottom: Metrics.doubleMediumBaseMargin,
    marginRight: 28,
    marginLeft: Metrics.smallMargin,
  },
  headerText: {
    color: Colors.white,
    fontSize: Fonts.size.large,
    textAlign: 'center',
  },

  optionItem: {
    ...AppStyles.flexRow,
    marginBottom: Metrics.doubleBaseMargin,
    marginLeft: Metrics.mediumBaseMargin,
  },

  optionIconStyle: {
    height: 21,
    width: 21,
    marginRight: Metrics.baseMargin,
    tintColor: Colors.white,
  },

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
    marginRight: Metrics.mediumBaseMargin,
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
    backgroundColor: Colors.blue,
  },

  btnTextStyle: {
    fontSize: Fonts.size.normal,
    color: Colors.white,
    fontWeight: 'bold',
  },
});
