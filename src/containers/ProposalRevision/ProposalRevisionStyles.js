import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headingWrap: {
    alignItems: 'center',
    marginTop: 34,
  },
  dashBorder: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 1,
    borderColor: Colors.grey2,
    paddingVertical: 11,
    paddingHorizontal: 20,
    marginTop: 8,
  },
  accordionSec: {
    flex: 1,
    marginTop: 18,
    paddingHorizontal: 22,
  },
  subBtnWrap: {
    marginTop: 30,
    marginBottom: 20,
    paddingHorizontal: 65,
  },
});
