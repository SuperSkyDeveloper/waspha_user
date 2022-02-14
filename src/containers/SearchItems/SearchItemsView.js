import React from 'react';
import _ from 'lodash';
import {
  View,
  Image as RnImage,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {
  Text,
  TextInput,
  ProductItem,
  CustomNavbar,
  CategoryItem,
  Loader,
} from '../../components';
import styles from './SearchItemsStyles';
import {Fonts, Colors, Images, AppStyles, Metrics} from '../../theme';
import Spinner from 'react-native-loading-spinner-overlay';
import {strings} from '../../constants';
import util from '../../util';

export default function SearchItemsView(props) {
  const {
    placeholder,
    searchValue,
    searchedProducts,
    searchedCategories,
    loading,
    searchForItems,
    setValue,
    storeId,
    categoryId,
    rfpVendors,
  } = props;
  return (
    <View style={AppStyles.flex}>
      <CustomNavbar
        hasBack={true}
        // title={strings.ORDER_PLACEMENT}
        titleColor={Colors.white}
        hasBottomRadius={true}
        showBackgroundColor={false}
      />
      {/* <Spinner visible={loading} color={Colors.green} /> */}
      <Loader loading={loading} />

      <View showsVerticalScrollIndicator={false} style={styles.searchFieldWrap}>
        <TouchableOpacity
          // onPress={searchForItems}
          style={[
            util.isRTL()
              ? {left: 10, alignItems: 'flex-start'}
              : {right: 10, alignItems: 'flex-end'},
            styles.searchIconStyle,
          ]}>
          <RnImage source={Images.SearchIcon} />
        </TouchableOpacity>
        <TextInput
          autoFocus={true}
          textAlign={util.isRTL() ? 'right' : 'left'}
          style={[
            styles.searchField,
            util.isRTL() && {paddingRight: 10},
            styles.shadowStyle,
          ]}
          labelStyle={styles.labelStyle}
          placeholder={placeholder}
          value={searchValue}
          onChangeText={val => {
            setValue({searchValue: val});
          }}
          ref={ref => {
            props.searchValueRef(ref);
          }}
          onSubmitEditing={() => {
            Keyboard.dismiss();
          }}
        />
        {!_.isEmpty(searchedProducts) && (
          <View style={styles.productListing}>
            <FlatList
              data={searchedProducts}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => {
                return (
                  <View
                    style={[
                      styles.productItemStyle,
                      util.isRTL() ? {right: 10} : AppStyles.mLeft15,
                    ]}>
                    <ProductItem item={item} storeId={storeId} />
                  </View>
                );
              }}
            />
          </View>
        )}

        <View
          style={[
            [util.isRTL() ? AppStyles.mRight15 : AppStyles.mLeft15],
            AppStyles.mTop35,
          ]}>
          <FlatList
            inverted={util.isRTL()}
            data={searchedCategories}
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
        {/* {!_.isEmpty(searchValue) &&
          !loading &&
          _.isEmpty(searchedProducts) &&
          _.isEmpty(searchedCategories) && (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                marginTop: Metrics.mediumBaseMargin,
              }}>
              <Text
                textAlign="center"
                color={'black'}
                size={Fonts.size.xLarge}
                type="semiBold">
                {strings.NO_DATA_FOUND}
              </Text>
            </View>
          )} */}
      </View>
    </View>
  );
}
