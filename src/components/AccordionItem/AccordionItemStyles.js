import {StyleSheet} from 'react-native';
import {Colors, Fonts, AppStyles, Metrics} from '../../theme';

export default StyleSheet.create({
  titleWrap: {
    marginTop: 12,
    backgroundColor: Colors.white,
    paddingTop: 15,
    paddingBottom: 15,
    // paddingLeft: 38,
    paddingLeft: 10,
    paddingRight: 15,
    borderRadius: 6,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    flex: 1,
    justifyContent: 'flex-end',
  },
  editTitleWrap: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 28,
    paddingRight: 15,
  },
  option: {
    width: 19,
    height: 19,
    backgroundColor: Colors.lightRaven,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 9,
  },
  downArrow: {
    transform: [{rotate: '90deg'}],
  },
  upArrow: {
    transform: [{rotate: '-90deg'}],
  },
  bodyWrap: {
    flexDirection: 'row',
  },

  accordionSec: {
    backgroundColor: Colors.white,
    paddingLeft: 5,
    paddingRight: 20,
    paddingTop: 13,
    paddingBottom: 23,
    marginTop: 10,
    borderRadius: 6,
    marginBottom: 10,
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

  editSec: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
  },
  quantityWrap: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 24,
    marginLeft: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  remarkSec: {
    paddingLeft: 20,
    marginTop: 10,
  },
  acceptSec: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 25,
    margin: 20,
  },
  commentInput: {
    maxHeight: 80,
    borderColor: Colors.transparent,
    fontSize: Fonts.size.font13,
  },
  commentArea: {
    marginTop: 15,
    paddingLeft: 12,
  },
  comtWrap: {
    backgroundColor: Colors.white,
    paddingRight: 11,
    paddingVertical: 0,
    paddingLeft: Metrics.xsmallMargin,
    marginTop: 5,

    //shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  uploadWrap: {
    borderStyle: 'dashed',
    borderWidth: 2,
    borderRadius: 1,
    paddingVertical: 6,
    borderColor: Colors.grey2,
    alignSelf: 'flex-end',

    paddingHorizontal: 14,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelStyle: {
    fontSize: 20,
    opacity: 0.8,
    color: Colors.black1,
  },

  // editSec
  submitBtnWrap: {
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
    backgroundColor: Colors.resolutionBlue,
    paddingVertical: 10,
    marginTop: Metrics.xsmallMargin,
    borderRadius: 30,
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  submitBtnText: {
    fontSize: 10,
    color: Colors.white,
    marginRight: 10,
  },
  uploadImageIconStyleWrap: {
    marginLeft: Metrics.smallMargin,
  },
  uploadImageIconStyle: {
    width: 16,
    height: 16,
  },

  itemImageStyle: {
    height: 60,
    width: 60,
  },
  proposalRevisionImageStyle: {
    height: 120,
    width: 110,
    marginLeft: 10,
  },

  commentImageStyle: {
    height: 65,
    width: 90,
    marginLeft: 10,
    marginTop: Metrics.smallMargin,
  },
  uploadSec: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  inputFiled: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
    minWidth: '50%',
  },
  inputStyle: {
    fontSize: 12,
    color: Colors.grey7,
    height: 65,
    textAlignVertical: 'top',
  },
  leftSec: {
    flex: 1.3,
  },
  rightCol: {
    flex: 2,
  },
  rotateImg: {
    transform: [{rotate: '180deg'}],
  },

  errorBorder: {
    borderWidth: 2,
    borderColor: Colors.red,
  },
  errorText: {
    justifyContent: 'flex-start',
    marginLeft: 20,
    marginTop: 6,
    fontSize: 12,
  },
  removeItemButton: {
    backgroundColor: Colors.red2,
    height: 26,
    width: 26,
    borderRadius: 50,
    alignSelf: 'center',
    marginRight: 10,
    marginTop: 5,
  },
  crossTextStyle: {
    color: Colors.white,
  },
  crossBtnWrap: {
    height: 35,
    width: 35,
  },
});
