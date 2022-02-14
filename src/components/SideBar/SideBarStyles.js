// @flow
import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  imgWrap: {
    width: 75,
    height: 75,
    overflow: 'hidden',
    borderColor: Colors.silverChalice,
    borderRadius: 50,
    borderWidth: 3,
  },

  imgWrapRTL: {
    position: 'absolute',
    right: 53,
    width: 75,
    height: 75,
    overflow: 'hidden',
    borderColor: Colors.silverChalice,
    borderRadius: 50,
    borderWidth: 3,
  },
  profileImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  profileSec: {
    flexDirection: 'row',
    marginTop: 0,
    paddingBottom: 22,
    paddingHorizontal: 22,
  },
  hLine: {
    marginHorizontal: 10,
    borderBottomColor: Colors.white,
    borderBottomWidth: 1,
  },
  linkSec: {
    paddingTop: 15,
    paddingHorizontal: 20,
  },
  linkWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 23,
  },
  icon: {
    marginRight: 12,
  },
  badge: {
    backgroundColor: Colors.red,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.white,
    marginLeft: 10,
  },
  baseIconSec: {
    alignItems: 'flex-end',
    marginTop: 29,
    marginRight: 12,
  },

  baseIconSecRTL: {
    marginBottom: 20,
    top: -10,
    marginLeft: 10,
    marginTop: 50,
  },
});
