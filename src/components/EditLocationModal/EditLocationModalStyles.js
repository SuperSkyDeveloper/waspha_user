import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  editLocation: {
    borderTopStartRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2e43',
  },
  editTextWrap: {
    flex: 1,
    flexDirection: 'row',
    paddingRight: 20,
    paddingLeft: 27,
    paddingTop: 16,
    paddingBottom: 18,
  },

  editText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 16,
  },

  editDetails: {
    flex: 1,
    paddingTop: 26,
    paddingBottom: 38,
    paddingLeft: 20,
    paddingRight: 72,
  },

  editSubDetails: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingBottom: 10,
  },

  editSubDetailsHeading: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
    paddingBottom: 5,
  },

  editSubDetailsText: {
    color: Colors.white,
    opacity: 0.72,
    fontWeight: '600',
    fontSize: 12,
  },

  editDetailsSec: {
    paddingLeft: 10,
  },

  icons: {
    paddingTop: 10,
  },
  iconStyle: {
    width: 19,
    height: 22,
  },
});
