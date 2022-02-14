import React from 'react';
import _ from 'lodash';
import {
  View,
  Image as RnImage,
  ScrollView,
  FlatList,
  StatusBar,
} from 'react-native';
import {
  Text,
  CustomNavbar,
  AccordionItem,
  DeliveryLocation,
  DateItem,
  OrderItemAccordian,
  Loader,
} from '../../components';
import styles from './OrderDetailStyles';
import {strings, DATE_FORMAT2, ORDER_ITEM_TYPE} from '../../constants';
import {Colors, Fonts, Images, AppStyles} from '../../theme';
import util from '../../util';
import Spinner from 'react-native-loading-spinner-overlay';

export default function OrderDetailView(props) {
  const {activeIndex, handleIndex, orderDetails, loading} = props;
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <CustomNavbar
        title={strings.ORDER_DETAILS_1}
        titleColor={Colors.white}
        hasBottomRadius={true}
        showBackgroundColor={false}
      />

      <Loader loading={loading || _.isEmpty(orderDetails)} />
      {!loading && !_.isEmpty(orderDetails) && (
        <ScrollView style={styles.wrap} showsVerticalScrollIndicator={false}>
          {/*productRow start*/}
          <View
            style={[
              util.isRTL() ? AppStyles.rowReverse : AppStyles.flexRow,
              styles.productRow,
            ]}>
            <View style={styles.leftCol}>
              <Text
                size={Fonts.size.font20}
                color={Colors.black}
                type="semiBold">
                {strings.PRODUCT_CATEGORY}
              </Text>
              <Text
                style={[
                  AppStyles.alignItemsCenter,
                  util.isRTL() && {textAlign: 'right'},
                ]}
                size={Fonts.size.font15}
                color={Colors.black}
                type="medium">
                {util.isRTL()
                  ? orderDetails.category.name.ar
                  : orderDetails.category.name.en}
                {/* {'->'} {orderDetails.subcategory.name} */}
              </Text>
            </View>
            <View style={styles.rightCol}>
              <DateItem
                date={util.getFormattedDateTime(
                  orderDetails.order_date,
                  DATE_FORMAT2,
                )}
                fontSize={Fonts.size.font12}
                color={Colors.black}
              />
            </View>
          </View>
          {/* productRow end */}
          {/*  */}

          <DeliveryLocation
            category={orderDetails.category.name}
            categoryImg={orderDetails.category.image}
            locationAddress={
              orderDetails.type === 'pickup'
                ? ''
                : orderDetails.delivery_location.address
            }
          />

          {/*  */}
          {/*  */}

          <View style={[AppStyles.flex, AppStyles.mTop10]}>
            <FlatList
              data={orderDetails.items}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => {
                const active = index === activeIndex;
                return (
                  <OrderItemAccordian
                    active={active}
                    toggleAccordinPress={handleIndex}
                    data={item}
                    index={index}
                    itemType={ORDER_ITEM_TYPE.onlyForRead}
                  />
                );
              }}
            />
          </View>

          {/*  */}
        </ScrollView>
      )}
    </View>
  );
}
