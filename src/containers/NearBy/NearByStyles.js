import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  bgImage: {
    width: '100%',
    height: 250,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    overflow: 'hidden',
  },
  listingSec: {
    marginTop: 11,
  },
  backBtn: {
    marginLeft: 20,
    marginTop: 24,
  },
  nearByText: {
    marginLeft: 20,
    marginTop: 145,
  },

  backBtnWrapRTL: {
    position: 'absolute',
    right: -10,
    top: 10,
    transform: [{rotate: '180deg'}],
    paddingHorizontal: Metrics.mediumBaseMargin,
    paddingVertical: Metrics.baseMargin,
  },
});
