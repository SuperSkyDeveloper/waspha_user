import React from 'react';
import _ from 'lodash';
import {
  View,
  Image as RnImage,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {Text, AnimatedItem} from '..';
import styles from './AvailableCategoriesOnMapStyles';
import {Images, AppStyles, Colors} from '../../theme';
import {strings} from '../../constants';
import {Actions} from 'react-native-router-flux';
import util from '../../util';

export default function AvailableCategoriesOnMapView(props) {
  const {
    animatedCategories,
    animatedSubCategories,
    isCategoryCollapsed,
    onCategoryPress,
    onSubCategoryPress,
    selectedCategory,
    selectedSubCategory,
    isSubCategoryCollapsed,
    activeOption,
    setValue,
    parentCategories,
    subCategories,
    availableCategories,
    userLocationOn,
    filteredVendors,
    categoriesScrollToStart,
    subCategoriesScrollToStart,
  } = props;

  if (!userLocationOn) {
    return true;
  }
  return (
    !_.isEmpty(availableCategories) && (
      <>
        <LinearGradient
          start={{x: 0, y: 0.9}}
          end={{x: 0, y: -0.3}}
          colors={[
            'rgba(0,0,0,0.6)',
            'rgba(0,0,0,0.2)',
            'transparent',
            'transparent',
          ]}
          style={styles.container}>
          <View style={AppStyles.mBottom10}>
            <FlatList
              ref={ref => {
                props.mainCategoriesRef(ref);
              }}
              scrollEnabled={isCategoryCollapsed ? false : true}
              horizontal={true}
              data={parentCategories}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <AnimatedItem
                    selectedItem={selectedCategory}
                    totalItems={parentCategories.length}
                    itemWrapStyle={styles.categoryWrap}
                    iconWrapStyle={styles.iconWrap}
                    itemOutputRange={104}
                    item={item}
                    animated={animatedCategories}
                    index={index}
                    scrollToStart={categoriesScrollToStart}
                    onItemPress={onCategoryPress}
                    collapseList={isCategoryCollapsed}
                  />
                );
              }}
            />
            {isCategoryCollapsed && (
              <View style={styles.selectedCategoryNameWrap}>
                <Text style={styles.selectedCategoryName}>
                  {util.isRTL()
                    ? selectedCategory.name.ar
                    : selectedCategory.name.en}
                </Text>
              </View>
            )}
          </View>
          {console.log({subCategories})}
          <View style={[!_.isEmpty(subCategories) && styles.subCategoriesWrap]}>
            {isCategoryCollapsed && !_.isEmpty(subCategories) && (
              <View>
                <FlatList
                  ref={ref => {
                    props.subCategoriesRef(ref);
                  }}
                  scrollEnabled={isSubCategoryCollapsed ? false : true}
                  horizontal={true}
                  data={subCategories}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item, index}) => {
                    return (
                      <AnimatedItem
                        tintColor={true}
                        selectedItem={selectedSubCategory}
                        itemWrapStyle={styles.subCategoryWrap}
                        totalItems={subCategories.length}
                        iconWrapStyle={styles.subIconWrap}
                        itemOutputRange={75}
                        item={item}
                        animated={animatedSubCategories}
                        index={index}
                        scrollToStart={subCategoriesScrollToStart}
                        onItemPress={onSubCategoryPress}
                        collapseList={isSubCategoryCollapsed}
                      />
                    );
                  }}
                />
                {isSubCategoryCollapsed && (
                  <View style={styles.selectedSubCategoryNameWrap}>
                    <Text style={styles.selectedCategoryName}>
                      {util.isRTL()
                        ? selectedSubCategory.name.ar
                        : selectedSubCategory.name.en}
                    </Text>
                  </View>
                )}
              </View>
            )}

            {(isSubCategoryCollapsed ||
              (isCategoryCollapsed && _.isEmpty(subCategories))) && (
              <View
                style={[
                  !_.isEmpty(subCategories) && {
                    position: 'absolute',
                    right: 0,
                  },
                  _.isEmpty(subCategories) && {alignSelf: 'flex-end'},
                  styles.selectOptionWrap,
                ]}>
                <TouchableOpacity
                  onPress={() => {
                    Actions.orderPlace({
                      category: selectedCategory,
                      subCategory: selectedSubCategory,
                      fromMapCustomView: true,
                      showRemoveImgBtn: true,
                    });
                  }}
                  style={[styles.custom, styles.option]}>
                  <RnImage
                    source={Images.NeedIcon}
                    style={[styles.optionImage, {height: 30, width: 30}]}
                  />
                  <Text type="medium" style={styles.optionName}>
                    {strings.CUSTOM_NEED}
                  </Text>
                </TouchableOpacity>
                <View style={styles.horizontalLineStyle} />
                <TouchableOpacity
                  onPress={() => {
                    setValue({activeOption: 'nearby'});
                    Actions.nearBy({
                      category: selectedCategory,
                      subCategory: selectedSubCategory,
                      items: filteredVendors,
                    });
                  }}
                  style={[styles.nearby, styles.option]}>
                  <RnImage
                    source={Images.NearbyIcon}
                    style={[styles.optionImage, {height: 30, width: 30}]}
                  />
                  <Text type="medium" style={styles.optionName}>
                    {strings.NEARBY}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </LinearGradient>
      </>
    )
  );
}
