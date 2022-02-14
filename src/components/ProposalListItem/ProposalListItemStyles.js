import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    paddingTop: 31,
    paddingBottom: 70,
    paddingLeft: 24,
    paddingRight: 15,
    backgroundColor: Colors.white,
    borderRadius: 10,
    width: Metrics.screenWidth - 70,
    marginRight: 10,

    // shahdow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
  dateSec: {
    marginTop: 16,
  },
  ratingWrp: {
    flexDirection: 'row',
    marginTop: 3,
    marginBottom: 5,
  },
  startImg: {
    width: 20,
    height: 20,
    marginRight: 2,
  },
  mTop: {
    marginBottom: 3,
  },
  cardImg: {
    width: 40,
    height: 30,
    marginTop: 5,
  },
  detailSec: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  totalWrap: {
    paddingHorizontal: 17,
    borderRadius: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: Colors.black,
  },

  customTextStyle: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    marginBottom: 10,
    paddingBottom: Metrics.baseMargin,
  },

  storeImgWrap: {width: 93, height: 93, borderRadius: 200, borderWidth: 1},
  storeImg: {
    width: 90,
    height: 90,
    borderRadius: 100,
  },
});
