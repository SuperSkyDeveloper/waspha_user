import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  header: {
    backgroundColor: Colors.seashell,
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
  },
  pHorizontal: {
    // paddingHorizontal: 20,
  },

  container: {
    backgroundColor: Colors.white,
    paddingBottom: 27,
    alignItems: 'center',
    marginHorizontal: 5,
    // marginTop: 10,
    marginBottom: -30,
    borderRadius: 16,
    // width: '30%',
    maxWidth: Metrics.screenWidth / 2 - 20,

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

  imgWrap: {
    marginTop: 10,
    width: 50,
    height: 50,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: Colors.purple,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,

    // shahdow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,

    elevation: 20,
  },
  prdImg: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  content: {
    alignItems: 'center',
    marginTop: 7,
  },
  closeWrap: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.silver,
    // overflow: 'hidden',
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 13,
    marginHorizontal: 5,
    alignSelf: 'center',

    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,

    elevation: 6,
  },
  underline: {
    borderBottomColor: Colors.dodgerBlue,
    borderBottomWidth: 1,
  },
  additionalNote: {
    width: '100%',
    marginTop: 9,
    paddingVertical: 9,
    paddingHorizontal: 21,
    backgroundColor: Colors.white,

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
  codeWrap: {
    marginTop: 3,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
