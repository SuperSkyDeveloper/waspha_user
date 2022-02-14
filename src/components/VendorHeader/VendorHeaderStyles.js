import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';
import util from '../../util';

export default StyleSheet.create({
  header: {
    width: '100%',
    minHeight: 406,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewHeader: {
    width: '100%',
    minHeight: 360,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 125,
    width: 125,
    resizeMode: 'cover',
    marginBottom: 15,
    borderRadius: 100,
  },
  ratingWrap: {
    flexDirection: 'row',
    marginTop: 2,
  },
  starIcon: {
    width: 17,
    height: 17,
  },
  companySec: {
    backgroundColor: 'red',
    paddingHorizontal: 25,
    borderRadius: 60,
    marginTop: 30,
  },

  col: {
    borderLeftColor: Colors.white,
    borderLeftWidth: 1,
    marginLeft: 15,
    paddingLeft: 10,
  },
  pVertical: {
    paddingVertical: 12,
  },
  wraper: {
    alignItems: 'center',
  },
  backBtnWrap: {
    position: 'absolute',
    top: 30,
    left: 10,
    paddingRight: Metrics.doubleBaseMargin,
    paddingLeft: Metrics.smallMargin,
  },

  providerRatingWrap: {
    top: 3,
  },
  backWrap: {
    marginTop: util.isPlatformAndroid()
      ? Metrics.baseMargin
      : Metrics.doubleMediumBaseMargin,
  },
});
