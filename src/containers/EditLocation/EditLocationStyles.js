import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  innerContainer: {
    flexDirection: 'column',
    paddingVertical: 20,
    paddingHorizontal: 25,
    marginTop: 20,
  },
  viewStyle: {
    flexDirection: 'row',
  },
  completLocationStyle: {
    flexDirection: 'row',
    marginTop: 30,
  },
  textMarginLeft10: {
    marginLeft: 10,
  },
  textMarginTop30: {
    marginTop: 30,
  },
  submitBtnWrap: {
    paddingTop: 35,
  },
});
