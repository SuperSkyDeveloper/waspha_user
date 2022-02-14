import {StyleSheet} from 'react-native';
import {AppStyles, Colors} from '../../theme';

export default StyleSheet.create({
  wrapper: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 8,
    paddingVertical: 20,
    backgroundColor: Colors.white,
    marginHorizontal: 11,
    marginTop: 20,
  },
  contentStyle: {
    flex: 1,
    ...AppStyles.Bottom5,
    width: '100%',
    flexDirection: 'row',
  },
  imageWrap: {
    // borderRadius: 100,
    top: -14,
    marginLeft: 10,
    marginTop: 25,
    marginBottom: 30,
  },

  promoCodeWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 66,
    maxWidth: '52%',
  },
  expiryTimeWrap: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 10,
    marginTop: 20,
  },
  noOfUsesWrap: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 10,
    top: 22,
  },

  discountWrap: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 10,
  },
});
