import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingBottom: 42,
  },

  timerSecWrap: {
    marginLeft: 16,
    marginRight: 12,
  },

  timeSecContent: {
    paddingRight: 5,
    marginTop: 20,
  },

  cancelWrap: {
    paddingTop: 12,
    paddingBottom: 12,
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginLeft: 16,
    marginRight: 12,
  },

  connectedToText: {
    fontSize: 10,
  },

  orderplaceTimeText: {
    marginTop: 20,
    fontSize: 9,
    color: Colors.grey1,
  },
  timeStyle: {
    color: Colors.grey1,
    fontSize: 18,
  },
  timeStyleWrap: {
    paddingBottom: 20,
  },
  cancelTextStyle: {
    fontSize: 18,
    color: Colors.lightGrey,
  },

  orderProposalPicWrap: {
    position: 'absolute',
    width: 50,
    height: 50,
    top: 140,
    right: 25,
  },

  loaderStyle: {
    position: 'absolute',
    zIndex: 9999,
    top: Metrics.screenHeight / 3 + 20,
    left: Metrics.screenWidth / 2 - 10,
  },
});
