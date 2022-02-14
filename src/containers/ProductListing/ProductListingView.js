import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, FlatList, ScrollView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  Text,
  ProductItem,
  CustomNavbar,
  CategoryItem,
  Button,
  Loader,
} from '../../components';
import styles from './ProductListingStyles';
import {strings} from '../../constants';
import {Colors, AppStyles, Images, Fonts} from '../../theme';
import util from '../../util';
import {renderNameStringAndImageRender} from '../../helpers/multilingualHelper';

export default function ProductListingView(props) {
  const {
    productsList,
    categoriesList,
    category,
    storeId,
    selectedShopId,
    categoryId,
    loading,
    cartItems,
    rfpVendors,
  } = props;
  const regex = /(<([^>]+)>)/gi;

  return (
    <View style={styles.container}>
      <CustomNavbar
        title={renderNameStringAndImageRender(category.name).replace(regex, '')}
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={[
              styles.categoryListing,
              util.isRTL() ? {paddingRight: 10} : {paddingLeft: 10},
            ]}>
            <FlatList
              horizontal
              inverted={util.isRTL()}
              data={categoriesList}
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
            />
          </View>

          {/* product listing sec start */}
          <View
            style={[
              styles.productListing,
              util.isRTL() ? AppStyles.pRight15 : AppStyles.pLeft15,
            ]}>
            <FlatList
              data={productsList}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => {
                return <ProductItem item={item} storeId={storeId} />;
              }}
              // ListEmptyComponent={
              //   <Text style={AppStyles.mTop30} textAlign="center">
              //     {strings.NO_PRODUCTS_FOUND}
              //   </Text>
              // }
            />
          </View>
        </ScrollView>
      )}
      {/* product listing sec end */}

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
    </View>
  );
}
