import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics, AppStyles} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  bgImage: {
    width: '100%',
    minHeight: 289,
  },

  backBtnStyle: {
    top: 45,
    left: 20,
    paddingRight: Metrics.baseMargin,
    paddingBottom: Metrics.baseMargin,
  },

  backBtnStyleRTL: {
    position: 'absolute',
    right: 6,
    paddingHorizontal: Metrics.mediumBaseMargin,
    paddingVertical: Metrics.mediumBaseMargin,
    top: 10,
    transform: [{rotate: '180deg'}],
  },

  contactUsTextStyle: {
    color: Colors.white,
    fontSize: Fonts.size.xxLarge,
  },
  contactUsTextWrap: {
    alignSelf: 'center',
    padding: Metrics.baseMargin,
    marginTop: Metrics.doubleMediumBaseMargin,
  },
  cardWrap: {
    flex: 1,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 8,
    borderTopColor: Colors.white,
    marginLeft: Metrics.baseMargin,
    marginRight: Metrics.baseMargin,
    marginBottom: Metrics.baseMargin,

    borderRadius: Metrics.borderRadiusMedium,
    marginTop: -(Metrics.tripleMediumBaseMargin + 20),
  },
  imgStyle: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    marginTop: Metrics.mediumBaseMargin,
  },
  inputFieldsStyle: {
    marginRight: Metrics.doubleMediumBaseMargin,
    marginLeft: Metrics.doubleMediumBaseMargin,
    flex: 1,
    flexDirection: 'column',
  },
  subjectFieldStyle: {
    ...AppStyles.mTop30,
  },
  submitBtnWrap: {
    marginTop: Metrics.tripleBaseMargin,
    marginBottom: Metrics.tripleBaseMargin,
  },
  submitBtnText: {
    fontSize: Fonts.size.small,
    color: Colors.white,
  },
  submitBtn: {
    height: 50,
    borderRadius: Metrics.smallMargin,
    backgroundColor: Colors.resolutionBlue,
  },
});
