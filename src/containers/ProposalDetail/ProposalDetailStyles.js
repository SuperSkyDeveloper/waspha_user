import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  infoSec: {
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 30,
    backgroundColor: Colors.white,
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
  borderStyle: {
    borderWidth: 1,
    borderColor: Colors.jumbo,
    paddingVertical: 4,
    paddingHorizontal: 17,
    marginTop: 6,
    borderStyle: 'dashed',
    borderRadius: 1,
  },
  mtop: {
    marginTop: 20,
  },
  center: {
    alignItems: 'center',
  },
  accordinWrap: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  btnWrap: {
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: 12,
    marginTop: 40,
  },
  redBg: {
    backgroundColor: Colors.sunsetOrange,
  },
  greyBg: {
    backgroundColor: Colors.nobel,
  },
  greenBg: {
    backgroundColor: Colors.pastelGreen,
  },
  btn: {
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',

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

  subBtnWrap: {
    paddingHorizontal: 69,
    marginTop: 25,
    marginBottom: 35,
  },
});
