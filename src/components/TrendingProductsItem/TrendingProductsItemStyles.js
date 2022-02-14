import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  horizontalWrp: {
    minWidth: 320,
    marginRight: 13,
    marginBottom: 10,
    marginLeft: 2,
  },
  trendingWrp: {
    marginVertical: 10,
    width: Metrics.screenWidth - 28,
  },

  shadowStyle: {
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

  trendImg: {
    width: '100%',
    minHeight: 148,
  },
  infoSec: {
    alignItems: 'flex-start',
    paddingVertical: 11,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  leftSec: {
    alignItems: 'flex-start',
    flex: 1,
    justifyContent: 'space-between',
  },
  imgWrap: {
    flexDirection: 'row',
    marginRight: -10,
  },
  badge1: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginLeft: 10,
    marginTop: 2,
  },
  badge2: {
    backgroundColor: Colors.malibu,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginLeft: 4,
    marginTop: 2,
  },
  peoplesImgWrap: {
    width: 23,
    height: 23,
    borderColor: Colors.white,
    borderWidth: 3,
    resizeMode: 'contain',
    borderRadius: 30,
    marginLeft: -10,
  },
  peoplesImg: {
    width: '100%',
    height: '100%',
  },
  openBadge: {
    paddingVertical: 5,
    paddingHorizontal: 11,
    backgroundColor: Colors.white,
    borderRadius: 4,
    position: 'absolute',
    top: 12,
    left: 10,
    zIndex: 999,

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
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 11,
    backgroundColor: Colors.white,
    borderRadius: 4,
    position: 'absolute',
    top: 12,
    right: 10,
    zIndex: 999,

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
  starImg: {
    width: 9,
    height: 9,
    marginRight: 4,
  },
  leftTextStyle: {maxWidth: 140},
});
