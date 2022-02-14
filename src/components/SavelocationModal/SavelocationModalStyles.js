import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  imageSelectorWrapper: {
    borderRadius: 15,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2e43',
  },
  imageDetails: {
    flex: 1,
    paddingTop: 19,
    paddingBottom: 10,
    paddingLeft: 23,
    paddingRight: 9,
  },

  selectImageText: {
    color: Colors.white,
    fontWeight: 'bold',
    opacity: 0.9,
    fontSize: 18,
  },
  selectImageTextWrap: {},
  selectImageWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  crossIconStyle: {color: Colors.white},

  imageSelectorChild: {
    marginTop: 7,
  },

  submitBtnWrap: {
    flex: 1,
    marginRight: 15,
    marginLeft: 13,
  },
  submitBtn: {
    height: 50,
    borderRadius: 14,
    backgroundColor: Colors.white,
  },

  submitBtnText: {
    fontSize: 14,
  },

  imagePlaceholderStyle: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: Colors.white,
    opacity: 0.85,
    borderRadius: 10,
    paddingLeft: 4,
    paddingRight: 40,
    marginRight: 5,
  },

  pin4StyleWrap: {},
  pin4Style: {
    resizeMode: 'contain',
    width: 35,
    height: 35,
  },

  addressInput: {
    paddingVertical: 18,
    paddingLeft: 13,
    fontWeight: 'bold',
    width: '100%',
    fontSize: Fonts.size.font17,
  },

  btnSec: {
    marginTop: 40,
    marginBottom: 20,
    flexDirection: 'row',
  },
});
