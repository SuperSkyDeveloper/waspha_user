import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  category: {
    minWidth: 120,
    height: 120,
    borderRadius: 11,
    overflow: 'hidden',
    marginRight: 7,
  },
  titleWrap: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
    zIndex: 99,
  },
  categoryImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    backgroundColor: '#00000047',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    zIndex: 9,
  },
});
