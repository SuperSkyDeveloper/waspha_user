import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  locationWrap: {
    paddingHorizontal: 50,
    paddingVertical: 21,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 25,
  },

  leftCircle: {
    width: 50,
    height: 50,
    backgroundColor: Colors.athensGraya,
    borderRadius: 40,
    position: 'absolute',
    left: -25,
  },
  rightCircle: {
    width: 50,
    height: 50,
    backgroundColor: Colors.athensGraya,
    borderRadius: 40,
    position: 'absolute',
    right: -25,
  },

  prdDetail: {
    flex: 1,
    marginRight: 5,
  },
  addressDetail: {
    flex: 2,
  },

  categoryImgStyle: {},
});
