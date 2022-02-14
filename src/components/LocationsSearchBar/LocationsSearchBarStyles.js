import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    ...AppStyles.mTop5,
    ...AppStyles.mBottom5,

    // paddingHorizontal: Metrics.baseMargin
  },
  searchWrapper: {
    backgroundColor: Colors.transparent1,

    height: 50,
    borderRadius: 10,
    ...AppStyles.flexRow,
    paddingRight: 10,
    // ...AppStyles.centerInner,
  },
  icon: {
    width: 28,
    height: 28,
    marginVertical: 10,
    marginLeft: 10,
  },

  iconRTL: {
    position: 'absolute',
    right: 5,
    top: 11,
  },

  locationTextWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '85%',
  },

  locationTextWrapRTL: {
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '80%',
    marginLeft: 39,
  },

  favIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 14,
    top: 13,
  },

  favIconRTL: {
    position: 'absolute',
    top: 13,
    left: 10,
    marginRight: 30,
  },
});
