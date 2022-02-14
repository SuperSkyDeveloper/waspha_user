import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  review: {
    paddingHorizontal: Metrics.baseMargin,

    paddingBottom: Metrics.smallMargin,
    marginBottom: Metrics.smallMargin,
    //// shadow

    backgroundColor: Colors.white,
  },
  profileImg: {
    width: 32,
    height: 32,
    borderRadius: 100,
  },
  startImg: {
    width: 13,
    height: 13,
    marginRight: 1,
  },

  borderStyle: {
    borderBottomWidth: 8,
    borderBottomColor: Colors.athensGraya,
    marginBottom: 27,
  },

  providerRatingWrap: {
    justifyContent: 'flex-end',
    flex: 1,
  },
});
