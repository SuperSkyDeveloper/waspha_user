import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';
import util from '../../util';

export default StyleSheet.create({
  searchFieldWrap: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  searchField: {
    marginTop:56,
    backgroundColor: Colors.white,
    // width: '100%',
    marginHorizontal: 10,
    height: 60,
    borderRadius: 10,
    paddingLeft: 20,
  },
  labelStyle: {
    fontSize: Fonts.size.font14,
  },

  shadowStyle: {
    /// shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.85,
    shadowRadius: 3.14,

    elevation: 8,
  },

  productListing: {
    marginTop: 30,
    marginBottom: 60,
    // flex: 1,
  },

  searchIconStyle: {
    top:58,width:80,position:"absolute",
    zIndex:999,padding:20,
  },

  productItemStyle: {
    width: '100%',
    flex: 1,
  },
});
