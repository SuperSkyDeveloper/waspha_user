import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  profileSec: {
    paddingTop: 51,
    paddingRight: 45,
    paddingLeft: 27,
  },

  inputWrap: {
    paddingBottom: 36,
  },

  contactList: {
    paddingTop: 6,
    alignItems: 'flex-end',
  },

  contactListText: {
    fontSize: 10,
    color: Colors.resolutionBlue,
    textDecorationLine: 'underline',
  },

  labelStyle: {
    fontSize: 12,
    color: '#7d7c7c',
    fontWeight: 'bold',
  },

  phoneNumLableStyle: {
    fontSize: 12,
    color: '#7d7c7c',
    fontWeight: 'bold',
    marginBottom: 5,
  },

  submitBtnWrap: {paddingTop: 35, paddingBottom: 150},
  submitBtn: {
    height: 55,

    backgroundColor: Colors.resolutionBlue,
  },

  addressInputWrap: {
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 120,
    backgroundColor: '#e4e4e4',
  },

  pinLocation: {
    alignItems: 'center',
    position: 'absolute',
    marginTop: 120,
  },
  pinIconWrap: {
    paddingRight: 3,
    marginBottom: 5,
  },
  pinIcon: {
    width: 14,
    height: 18,
  },

  pinText: {
    color: Colors.resolutionBlue,
    fontSize: 10,
  },
  addressField: {
    minHeight: 140,
    borderRadius: 5,
    borderWidth: 0,
    backgroundColor: Colors.lightGray,
    textAlignVertical: 'top',
  },

  contactCrossBtn: {position: 'absolute', right: 10, bottom: 10},
  radioBtnIcon: {
    width: 18,
    height: 18,
  },
});
