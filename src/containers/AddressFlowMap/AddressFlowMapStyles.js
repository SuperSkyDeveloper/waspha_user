import {StyleSheet} from 'react-native';
import {Fonts, Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBarSpacing: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    zIndex: 999,
    marginHorizontal: 10,
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

  optionImage: {
    width: 20,
    height: 25,
    marginTop: 10,
    marginLeft: 4,
  },
  flatListStyle: {
    backgroundColor: Colors.transparent1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.white,
    shadowRadius: 10,
    paddingBottom: 30,
  },
  itemStyle: {
    flexDirection: 'row',
    marginHorizontal: 15,
    padding: 7,
  },
  selectOptionWrap: {
    flexDirection: 'row',
    marginTop: 20,
    marginRight: 15,
    marginLeft: 40,
    minHeight: 65,
    minWidth: '62%',
  },
  textMarginLeft10: {
    marginLeft: 10,
  },
  optionName: {
    fontSize: 12,
    color: '#636363',
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
    backgroundColor: '#cfcfcf',
  },
  option: {
    backgroundColor: Colors.white,
  },

  optionsWrap: {
    flexDirection: 'row',
  },
  centerAlignItem: {
    justifyContent: 'center',
  },
  textViewContainerStyle: {
    flexDirection: 'column',
  },

  submitBtnWrap: {
    marginRight: 15,
    marginLeft: 13,
    marginBottom: 30,
    borderRadius: 30,
  },
  submitBtn: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },

  submitBtnText: {
    fontSize: 14,
  },
});
