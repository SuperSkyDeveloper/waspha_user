import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  titleWrap: {
    marginTop: 3,
    backgroundColor: Colors.white,
    paddingTop: 15,
    paddingBottom: 20,
    paddingLeft: 38,
    paddingRight: 15,
    borderRadius: 6,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 5,
    //// shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  optionWrap: {
    flexDirection: 'row',
  },

  inputWrap: {},

  option: {
    width: 19,
    height: 19,
    backgroundColor: Colors.lightRaven,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 40,
  },
  downArrow: {
    transform: [{rotate: '90deg'}],
  },
  upArrow: {
    transform: [{rotate: '-90deg'}],
  },
  bodyWrap: {
    backgroundColor: Colors.white,
    paddingTop: 13,
    paddingBottom: 15,
    paddingLeft: 20,
    marginBottom: 18,
    borderRadius: 6,

    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    minHeight: 195,
  },
  addressInputWrap: {
    paddingRight: 65,
  },
  inputStyle: {
    fontSize: 10,
    opacity: 0.77,
  },

  submitBtnWrap: {
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf: 'flex-end',
    backgroundColor: '#002286',
    paddingBottom: 9,
    paddingTop: 9,
    borderRadius: 30,
    flexDirection: 'row',
    right: 18,
    bottom: 15,
    width: '50%',
  },

  submitBtnText: {
    fontSize: 11,
    color: Colors.white,
  },
  uploadImageIconStyleWrap: {},
  uploadImageIconStyle: {
    width: 16,
    height: 16,
  },

  imageSec: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: 0,
  },

  itemImageStyle: {
    height: 60,
    width: 60,
  },
});
