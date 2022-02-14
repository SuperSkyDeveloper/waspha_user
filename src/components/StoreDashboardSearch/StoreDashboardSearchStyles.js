import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  searchWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingLeft: 26,
    paddingRight: 11,
    borderRadius: 15,
    paddingVertical: 10,

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

  searchFieldWrap: {
    // flex: 1,
  },
  searchField: {
    flex: 1,
    // backgroundColor: Colors.white,
    width: '100%',
    paddingHorizontal: 10,
    height: 40,
  

  

  },
  labelStyle: {
    fontSize: Fonts.size.font14,
  },
});
