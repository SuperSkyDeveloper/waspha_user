import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  list: {
    marginBottom: 11,
    backgroundColor: Colors.white,
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
  info: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    padding: 7,
  },
  cardWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  shopBanner: {
    width: '100%',
    height: 180,
  },
  offerBadge: {
    marginRight: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: Colors.thunderbird,
    position: 'absolute',
    right: -13,
    zIndex: 99,
  },

  offerBadgeRTL: {
    alignSelf: 'flex-start',

    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: Colors.thunderbird,
    position: 'absolute',
    zIndex: 99,
  },
  starIcon: {
    width: 13,
    height: 13,
    marginRight: 2,
    marginTop: 2,
    resizeMode: 'cover',
  },

  providerRatingWrap: {
    flex: 1,
    top: 3,
  },

  customTimingsWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Metrics.xsmallMargin,
  },

  multiShiftStyle: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
});
