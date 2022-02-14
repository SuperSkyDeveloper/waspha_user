import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  wrapper: {
    marginBottom: 8,
  },
  container: {
    marginBottom: -30,
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 30,
    paddingTop: 12,
    paddingBottom: 27,
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 10,

    borderRadius: 16,
    // width: '30%',
    maxWidth: Metrics.screenWidth / 2 - 28,

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
    minWidth: 90,
    maxWidth: 90,
    minHeight: 120,
    maxHeight: 120,
  },
  prdImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  content: {
    alignItems: 'center',
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
    marginTop: 5,
    marginHorizontal: 5,
    alignSelf: 'center',
    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 6,
  },
  underline: {
    borderBottomColor: Colors.dodgerBlue,
    borderBottomWidth: 1,
    textAlign: 'center',
  },
  additionalNote: {
    marginTop: 9,
    marginBottom: 10,
    paddingVertical: 9,
    paddingHorizontal: 8,
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
});
