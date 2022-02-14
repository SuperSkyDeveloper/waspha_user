import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  product: {
    alignItems: 'flex-start',
    // paddingVertical: 12,
    paddingBottom: 12,
    paddingRight: 15,
    backgroundColor: Colors.white,
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 6,
    marginHorizontal: Metrics.baseMargin,
    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 5,
  },

  rightWrap: {
    marginTop: 18,
    flex: 1,
    alignItems: 'flex-start',
    marginRight: 4,
  },
});
