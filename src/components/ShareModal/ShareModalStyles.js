import {StyleSheet} from 'react-native';
import {Metrics, Colors} from '../../theme';

export default StyleSheet.create({
  shareWrap: {
    backgroundColor: Colors.transparent,
    position: 'absolute',
    width: Metrics.screenWidth - 48,
  },
  overlay: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  header: {
    borderRadius: 12,
    paddingTop: 85,
    paddingBottom: 16,
    backgroundColor: '#663399',
    marginBottom: -22,
    zIndex: 1,

    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  content: {
    zIndex: -1,
    borderRadius: 12,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    paddingTop: 48,
    paddingBottom: 32,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  imgWrap: {
    marginHorizontal: 6,
  },
  closeBtn: {
    position: 'absolute',
    top: 17,
    right: 17,
  },
});
