import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 29,
  },
  walletSec: {
    marginHorizontal: 21,
    marginTop: 31,
    backgroundColor: Colors.white,
    paddingTop: 18,
    paddingBottom: 26,
    borderRadius: 5,

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
  pHorizontal: {
    paddingLeft: 21,
    paddingRight: 26,
  },

  itemStyle: {
    alignItems: 'center',
    paddingRight: 0,
  },

  row: {
    alignItems: 'center',
    marginVertical: 4,
    paddingRight: 0,
  },
  dot: {
    width: 12,
    height: 12,
    backgroundColor: Colors.purple,
    opacity: 0.6,
    borderRadius: 40,
  },
  btnWrap: {
    marginTop: 28,
    paddingHorizontal: 50,
  },
  headWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lineWrap: {
    flexDirection: 'row',
    marginTop: 26,
    marginBottom: 15,
  },
  leftLine: {
    flex: 3,
    borderColor: Colors.grey2,
    borderWidth: 1,
  },
  mHorizontal: {
    marginHorizontal: 20,
  },
  rightLine: {
    flex: 1,
    borderColor: Colors.grey2,
    borderWidth: 1,
  },
  shareWrap: {
    width: 32,
    height: 22,
    alignItems: 'flex-end',
  },

  contentSec: {
    ...AppStyles.flexRow,
    justifyContent: 'space-between',
    marginBottom: Metrics.baseMargin,
  },
});
