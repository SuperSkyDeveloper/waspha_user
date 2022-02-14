import React from 'react';
import _ from 'lodash';

import {
  View,
  Image as RnImage,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  Text,
  CustomNavbar,
  TextInput,
  TrendingProductsItem,
  CategoryItem,
  ProductItem,
  StoreDashboardSearch,
  Button,
  Loader,
} from '../../components';
import styles from './StoreDashboardStyles';
import {Colors, Fonts, AppStyles, Images} from '../../theme';
import {strings} from '../../constants';
import {Actions} from 'react-native-router-flux';
import util from '../../util';

export default function StoreDashboardView(props) {
  const {
    trendingProductList,
    storeParentCategories,
    loading,
    storeId,
    selectedShopId,
    cartItems,
    unCategorizedProducts,
    categoryId,
    storeName,
    rfpVendors,
  } = props;
  return (
    <>
      <StatusBar hidden={true} />
      <CustomNavbar
        title={storeName}
        titleColor={Colors.white}
        hasBottomRadius={true}
        rightBtnImage={Images.CartIcon}
        rightBtnPress={() => {
          _.isEmpty(cartItems)
            ? () => {}
            : Actions.myCart({storeId, categoryId, rfpVendors});
        }}
        activeRightBtn={
          _.isNil(selectedShopId) ||
          selectedShopId !== storeId ||
          _.isEmpty(cartItems)
        }
      />

      {loading ? (
        <View style={styles.container}>
          <Loader loading={loading} />
        </View>
      ) : (
        <>
          <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}>
            <View style={styles.wrap}>
              <View style={[styles.searchWrap]}>
                <StoreDashboardSearch
                  onSearchBarPress={() => {
                    Actions.searchItems({
                      storeId: storeId,
                      categoryId: categoryId,
                      rfpVendors: rfpVendors,
                      placeholder: strings.FIND_PRODUCTS,
                    });
                  }}
                />
              </View>
              {/* trending sec start */}
              {!_.isEmpty(trendingProductList) && (
                <View style={styles.trendingSec}>
                  <View
                    style={[
                      util.isRTL()
                        ? [AppStyles.rowReverse]
                        : [AppStyles.flexRow, {paddingRight: 31}],
                      styles.headingWrap,
                    ]}>
                    <Text
                      style={
                        util.isRTL() && {
                          marginRight: 20,
                        }
                      }
                      size={Fonts.size.font17}
                      color={Colors.portGore}
                      type="semiBold">
                      {strings.TRENDING_PRODUCTS}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        Actions.trendingProduct({trendingProductList});
                      }}
                      style={
                        util.isRTL() && {
                          marginLeft: -25,
                        }
                      }>
                      <Text
                        size={Fonts.size.font10}
                        color={Colors.bermudaGray}
                        type="semiBold">
                        {strings.SEE_ALL} ({trendingProductList.length})
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <FlatList
                    data={trendingProductList}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => {
                      return (
                        <TrendingProductsItem
                          item={item}
                          storeId={storeId}
                          horizontal={trendingProductList.length !== 1}
                        />
                      );
                    }}
                    ListEmptyComponent={
                      <Text style={styles.emptyComponent} textAlign="center">
                        {strings.NO_PRODUCTS_FOUND}
                      </Text>
                    }
                  />
                </View>
              )}
              {/* trending sec end */}
              {/* category sec start */}
              <View style={[styles.categorySec, AppStyles.mTop25]}>
                {!_.isEmpty(storeParentCategories) && (
                  <View
                    style={[
                      util.isRTL()
                        ? [AppStyles.rowReverse, {right: 20}]
                        : [AppStyles.flexRow],
                      styles.headingWrap,
                    ]}>
                    <Text
                      size={Fonts.size.font17}
                      color={Colors.portGore}
                      type="semiBold">
                      {strings.CATEGORY}
                    </Text>
                  </View>
                )}
                <View>
                  <FlatList
                    inverted={util.isRTL()}
                    data={storeParentCategories}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => {
                      return (
                        <CategoryItem
                          item={item}
                          storeId={storeId}
                          categoryId={categoryId}
                          rfpVendors={rfpVendors}
                        />
                      );
                    }}
                    // ListEmptyComponent={
                    //   <Text style={styles.emptyComponent} textAlign="center">
                    //     {strings.NO_PRODUCTS_FOUND}
                    //   </Text>
                    // }
                  />
                </View>
              </View>
              {/* category sec end */}
              {/* product listing sec start */}
              <View
                style={[
                  styles.productListing,
                  util.isRTL() && {marginRight: 10, marginLeft: -20},
                ]}>
                <FlatList
                  data={unCategorizedProducts}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item}) => {
                    return <ProductItem item={item} storeId={storeId} />;
                  }}
                />
              </View>
              {/* product listing sec end */}
            </View>
          </ScrollView>
          <View style={styles.btnWrap}>
            <Button
              color={Colors.white}
              background={Colors.resolutionBlue}
              style={[AppStyles.shadow5, AppStyles.btnStyle1]}
              size={Fonts.size.font17}
              isLoading={false}
              indicatorColor={Colors.white}
              disabled={
                _.isNil(selectedShopId) ||
                selectedShopId !== storeId ||
                _.isEmpty(cartItems)
              }
              type="bold"
              onPress={() => {
                Actions.myCart({storeId, categoryId, rfpVendors});
              }}>
              {strings.PROCEED_TO_CART}
            </Button>
          </View>
        </>
      )}
    </>
  );
}
