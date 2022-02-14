// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    width: Metrics.screenWidth,
    backgroundColor: Colors.transparent,
    paddingTop: Metrics.statusBarHeight,
    height: Metrics.navBarHeight,
    justifyContent: 'center',
    paddingRight: 20,
    paddingLeft: 15,
    overflow: 'hidden',
  },
  borderBottom: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.grey3,
  },
  btnImage: {},
  btnWrapper: {
    marginTop: Metrics.smallMargin,
    padding: Metrics.smallMargin,
    justifyContent: 'center',
    minWidth: 80,
  },

  btnWrapperRTL: {
    marginTop: Metrics.smallMargin,
    paddingRight: Metrics.mediumBaseMargin,
    paddingLeft: Metrics.mediumBaseMargin,
    paddingVertical: Metrics.mediumBaseMargin,
    alignItems: 'flex-end',
    minWidth: 80,
    position: 'absolute',
    right: -30,
    top: -28,
    zIndex: 999,
    transform: [{rotate: '180deg'}],
  },

  btnWrapperRTLRightBtn: {
    marginTop: Metrics.smallMargin,
    paddingRight: Metrics.mediumBaseMargin,
    paddingLeft: Metrics.mediumBaseMargin,
    paddingVertical: Metrics.mediumBaseMargin,

    alignItems: 'flex-start',
    minWidth: 80,
    position: 'absolute',
    left: -30,
    top: -28,
  },

  rightBtn: {
    alignItems: 'flex-end',
  },
  searchHeader: {
    height: Metrics.navBarHeight + 50,
  },
  borderRadius: {
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  bgImage: {
    width: '100%',
    backgroundColor: 'red',
  },
});
