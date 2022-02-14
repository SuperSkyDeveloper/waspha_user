import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  linkWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 23,
    flex: 1,
  },
  icon: {
    marginRight: 12,
    tintColor: Colors.white,
  },

  iconMain: {
    top: -3,
    tintColor: Colors.white,
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

  activeBtn: {
    transform: [{rotate: '180deg'}],
  },
});
