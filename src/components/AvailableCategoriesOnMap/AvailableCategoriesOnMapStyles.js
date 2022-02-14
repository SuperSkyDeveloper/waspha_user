import {StyleSheet} from 'react-native';
import {Colors, AppStyles, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    paddingBottom: 15,
  },

  shadowImageWrap: {position: 'absolute', bottom: 0},
  shadowImage: {
    width: 550,
  },
  categoryWrap: {
    ...AppStyles.alignItemsCenter,
    ...AppStyles.basePadding,
  },

  subCategoriesWrap: {
    flexDirection: 'row',
  },

  subCategoryWrap: {
    paddingLeft: 24,
    ...AppStyles.alignItemsCenter,
  },
  iconWrap: {
    backgroundColor: Colors.white,
    borderRadius: 100,
    width: 76,
    height: 76,
    borderWidth: 1,
    borderColor: Colors.purple,
    ...AppStyles.mBottom10,
    ...AppStyles.centerInner,
  },

  subIconWrap: {
    height: 55,
    width: 56,
    borderWidth: 0.2,

    backgroundColor: Colors.white,
    borderRadius: 100,
    ...AppStyles.mBottom10,
    ...AppStyles.centerInner,
  },

  categoryName: {
    color: Colors.white,
    fontSize: Fonts.size.xxSmall,
  },

  selectedCategoryNameWrap: {
    position: 'absolute',
    top: 94,
    paddingLeft: 38,
  },

  selectedSubCategoryNameWrap: {
    position: 'absolute',

    bottom: -10,

    paddingLeft: 35,
  },

  selectedCategoryName: {
    color: Colors.white,
    fontSize: Fonts.size.xxSmall,
  },

  optionImage: {
    marginTop: 12,
    marginLeft: 4,
  },

  selectOptionWrap: {
    flexDirection: 'row',
    marginRight: 15,
    minHeight: 65,
    width: Metrics.screenWidth / 1.6,
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
  horizontalLineStyle: {
    height: '100%',
    width: 1,
    backgroundColor: Colors.grey3,
  },
});
