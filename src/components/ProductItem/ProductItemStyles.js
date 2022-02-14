import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  product: {
    alignItems: 'flex-start',
    paddingVertical: 12,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: Colors.white,
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 6,
    marginRight: 29,

    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  productImgWrap: {
    width: 47,
    height: 80,
  },
  productImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.guardsmanRed,
    paddingVertical: 2,
    paddingHorizontal: 3,
    transform: [{rotate: '-18deg'}],
    position: 'absolute',
    right: -10,
    zIndex: 999,
  },
  dot: {
    width: 6,
    height: 6,
    backgroundColor: Colors.white,
    borderRadius: 40,
    marginRight: 2,
  },

  rightWrap: {
    marginTop: 18,
    flex: 1,
    alignItems: 'flex-start',
    marginRight: 4,
  },
});
