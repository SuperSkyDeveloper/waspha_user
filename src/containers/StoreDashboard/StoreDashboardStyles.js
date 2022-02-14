import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  wrap: {
    marginTop: 20,
    paddingLeft: 15,
  },
  headingWrap: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 31,
    marginBottom: 20,
  },
  productListing: {
    marginTop: 30,
    marginBottom: 20,
  },
  roundBtn: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  searchWrap: {
    paddingRight: 24,
    marginBottom: 34,
    paddingTop: 5,
  },
  btnWrap: {
    paddingHorizontal: 30,
    backgroundColor: Colors.white,
    paddingVertical: 10,
  },
});
