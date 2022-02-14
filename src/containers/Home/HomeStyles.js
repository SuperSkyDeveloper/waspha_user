import {StyleSheet} from 'react-native';
import {Fonts, Colors} from '../../theme';
import util from '../../util';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBarSpacing: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 999,
    marginHorizontal: 10,
    top: util.isPlatformAndroid() ? 75 : 100,
  },

  ellipseStyle: {
    height: 190,
    width: 100,
    resizeMode: 'contain',
  },
  iconWrap: {alignItems: 'center', marginTop: 55},
  subIconWrap: {alignItems: 'center'},
  categoryImage: {
    width: 45,
    height: 45,
  },
  categoryName: {
    color: Colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 29,
    fontSize: Fonts.size.font12,
  },

  subcategoryWrap: {
    backgroundColor: Colors.white,

    height: 65,

    borderRadius: 50,
  },

  subcategoryName: {
    marginTop: 14,
    fontSize: 12,
    color: Colors.white,
    textAlign: 'center',
  },

  subcategoryImage: {
    marginTop: 13,
    marginLeft: 4,
  },

  selectOptionWrap: {
    flexDirection: 'row',
    marginTop: 20,
    marginRight: 15,
    marginLeft: 40,
    minHeight: 65,
    minWidth: '62%',
  },

  optionName: {
    fontSize: 12,
    color: Colors.white,
    textAlign: 'center',
  },
  custom: {
    alignItems: 'center',
    flex: 1,
    borderBottomStartRadius: 50,
    borderTopStartRadius: 50,
  },
  subCategory: {alignItems: 'flex-start', paddingTop: 20, marginLeft: 22},

  nearby: {
    alignItems: 'center',
    flex: 1,
    borderTopEndRadius: 50,
    borderBottomEndRadius: 50,
  },

  activeOption: {
    backgroundColor: Colors.white,
  },
  option: {
    backgroundColor: Colors.white,
  },

  optionsWrap: {
    position: 'absolute',
    width: 100,
    height: 100,
    top: '27%',
    bottom: 0,
  },

  optionImage: {height: 73, width: 73, resizeMode: 'contain'},

  optionImageActive: {
    opacity: 0.7,
    borderRadius: 0,
    borderWidth: 0,
  },

  currentLocationPin: {
    position: 'absolute',
    top: util.isPlatformAndroid() ? 220 : 240,
    backgroundColor: Colors.lightGray,
    borderRadius: 100,
    width: 40,
    height: 40,
    marginLeft: 20,
  },
});
