import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  reviewsWrap: {
    marginTop: 45,
  },
  ratingSec: {
    paddingVertical: 15,
    marginHorizontal: 10,
    backgroundColor: Colors.white,
    marginTop: -60,
    marginBottom: 10,

    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  noReviewsWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Metrics.doubleMediumBaseMargin,
  },
});
