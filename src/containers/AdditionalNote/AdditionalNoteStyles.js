import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  wrap: {
    paddingTop: 55,
    paddingLeft: 14,
    paddingRight: 14,
    flex: 1,
  },

  inputStyle: {
    backgroundColor: Colors.white,
    borderWidth: 0,
    margin: 5,
    paddingVertical: 25,
    paddingHorizontal: 10,
    marginTop: 10,
    height: 147,
    fontSize: 11,
    color: Colors.shark,

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
  richInputStyle: {
    backgroundColor: Colors.white,
    borderWidth: 0,
    margin: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 10,
    minHeight: 147,
    fontSize: 11,
    color: Colors.shark,

    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 5,
    elevation: 5,
  },
  btnWrap: {
    marginTop: 63,
    paddingLeft: 44,
    paddingRight: 44,
    marginBottom: 20,
  },
  btn: {
    height: 48,
    borderRadius: 10,
  },
});
