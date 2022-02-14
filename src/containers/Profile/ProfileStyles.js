import {StyleSheet} from 'react-native';
import {Colors, AppStyles, Metrics} from '../../theme';

export default StyleSheet.create({
  header: {
    paddingTop: 40,
    paddingBottom: 40,
    paddingRight: 22,
    borderBottomLeftRadius: 17,
    borderBottomRightRadius: 17,
  },
  rightSec: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 25,
    marginTop: 10,
  },
  profileImgWrap: {
    width: 98,
    height: 98,
    borderColor: Colors.white,
    borderWidth: 1,
    borderRadius: 50,
    padding: 2,
  },
  profileImg: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomColor: Colors.athensGray,
    borderBottomWidth: 1,
  },
  listingSec: {
    backgroundColor: Colors.white,

    paddingHorizontal: 22,
  },
  arrowImg: {
    width: 7,
    height: 12,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  cameraIconWrap: {
    position: 'absolute',
    bottom: -4,
    right: -10,
    backgroundColor: Colors.white,
    padding: 10,
    zIndex: 999,
    borderRadius: 100,
  },

  ////////////////////////////////
  inputStyle: {
    ...AppStyles.inputStyle,

    borderBottomWidth: 0,
    marginLeft: 20,
  },

  btnWrap: {
    paddingHorizontal: 35,
    marginBottom: 20,
    marginTop: 40,
  },
  btn: {
    height: 55,
    borderRadius: 10,

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

  contactWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomColor: Colors.athensGray,
    borderBottomWidth: 1,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '60%',
  },

  nameTextRTL: {
    textAlign: 'right',
    width: '90%',
    flex: 1,

    right: 20,
  },
});
