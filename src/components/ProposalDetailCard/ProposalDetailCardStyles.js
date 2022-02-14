import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginTop: 10,

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
  header: {
    paddingLeft: 19,
    paddingRight: 27,
    paddingVertical: 13,
    backgroundColor: Colors.seashell,
    justifyContent: 'space-between',
  },
  content: {
    paddingLeft: 15,
    paddingRight: 18,
    paddingTop: 22,
    paddingBottom: 16,
    justifyContent: 'space-between',
  },
  prdImg: {
    width: 124,
    height: 124,
    borderRadius: 100,
  },
  ratingWrp: {
    flexDirection: 'row',
  },
  startImg: {
    width: 25,
    height: 25,
  },
  mTop: {
    marginTop: 5,
  },
  total: {
    right: 6,
    borderRadius: 4,
    backgroundColor: Colors.purple2,
    paddingHorizontal: 8,
    flexDirection: 'row',
    paddingVertical: 6,
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },

  dateWrap: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    marginTop: 5,

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
  wrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 26,
  },
  cardImg: {
    marginLeft: 5,
    width: 45,
    height: 45,
  },

  customTextStyle: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
});
