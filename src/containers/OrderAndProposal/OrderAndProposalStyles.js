import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingTop: 76,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 9,
  },
  tabWrap: {
    borderBottomColor: Colors.transparent,
    borderBottomWidth: 3,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  active: {
    borderBottomColor: Colors.white,
  },

  tabSec: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  opacity: {
    opacity: 0.43,
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  backWrap: {
    position: 'absolute',
    left: 10,
    paddingRight: Metrics.doubleMediumBaseMargin,
    paddingVertical: Metrics.doubleMediumBaseMargin,
  },
  backWrapRTL: {
    position: 'absolute',
    right: 1,
    transform: [{rotate: '180deg'}],
    paddingHorizontal: Metrics.mediumBaseMargin,
    paddingVertical: Metrics.mediumBaseMargin,
  },
});
