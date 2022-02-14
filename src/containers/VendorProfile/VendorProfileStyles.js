import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  loaderWrap: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  infoSec: {},
  inner: {
    marginTop: -40,
    paddingHorizontal: 22,
  },
  distanceSec: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 18,
    justifyContent: 'space-between',

    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  col: {
    // flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
  },
  moreInofSec: {
    marginTop: 60,
    paddingHorizontal: 16,
  },
  customNeedSec: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 20,
  },
  box: {
    flex: 1,
    marginHorizontal: 6,
    marginVertical: 10,
    borderRadius: 11,
    paddingHorizontal: 10,
    paddingVertical: 16,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'flex-end',
    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },

  customTimingsWrap: {
    marginBottom: 10,
    top: -4,
  },

  multiShiftStyle: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
});
