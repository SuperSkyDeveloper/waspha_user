import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  incrementWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,

    backgroundColor: Colors.white,
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

  minusWrapper: {paddingVertical: 10, paddingLeft: 9, paddingRight: 15},

  plusWrapper: {paddingVertical: 10, paddingRight: 9, paddingLeft: 15},

  roundBtn: {
    backgroundColor: Colors.lightRaven,
    width: 16,
    height: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mT10: {
    marginTop: 20,
  },
  darkStyle: {
    backgroundColor: Colors.shark,
    paddingVertical: 3,
    paddingHorizontal: 3,
  },
  darkRoundBtn: {
    backgroundColor: Colors.raven,
    opacity: 0.3,
  },
});
