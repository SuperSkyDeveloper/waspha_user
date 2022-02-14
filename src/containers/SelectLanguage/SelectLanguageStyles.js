import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',

    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: Colors.transparent,
    borderWidth: 2,
    borderColor: Colors.white,
    borderRadius: 30,
    marginBottom: 20,
    height: 45,
  },
  contentWrap: {
    paddingHorizontal: 30,
    paddingVertical: 5,
  },
});
