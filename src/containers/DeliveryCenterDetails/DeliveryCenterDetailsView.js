import React from 'react';
import _ from 'lodash';
import {
  View,
  Image as RnImage,
  ScrollView,
  ImageBackground,
  FlatList,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import {
  Text,
  CustomNavbar,
  Button,
  DeliveryLocation,
  DateItem,
  OrderItemAccordian,
  StarRating,
  Loader,
} from '../../components';
import styles from './DeliveryCenterDetailsStyles';
import {strings, ORDER_ITEM_TYPE, DATE_FORMAT2} from '../../constants';
import {Colors, Images, AppStyles, Fonts} from '../../theme';
import {getTimeDiff, ISOToFormat} from '../../helpers/generalHelper';
import util from '../../util';

export default function DeliveryCenterDetailsView(props) {
  const {deliveryDetails, activeIndex, handleIndex, loading, user} = props;
  return (
    <View style={styles.container}>
      <CustomNavbar
        title={strings.DELIVERY_CENTER}
        titleColor={Colors.white}
        hasBottomRadius={true}
      />
      {loading && _.isEmpty(deliveryDetails) ? (
        <Loader loading={loading || _.isEmpty(deliveryDetails)} />
      ) : (
        <ScrollView
          style={styles.contentSection}
          showsVerticalScrollIndicator={false}>
          <View style={[styles.cardOne, AppStyles.spaceAround]}>
            <View style={AppStyles.flexRow}>
              <View style={styles.downArrowImageWrap}>
                <RnImage
                  source={Images.ArrowDownCircleIcon}
                  style={styles.downArrowImage}
                />
              </View>
              <View style={[styles.proposalWrap, {alignItems: 'center'}]}>
                <Text style={styles.proposalText}>{strings.PROPOSAL}</Text>
                <Text style={styles.orderCodeText}>{`${strings.ORDER_CODE} : ${
                  deliveryDetails.id
                }`}</Text>
              </View>
            </View>
            <DateItem
              date={ISOToFormat(deliveryDetails.order_date, DATE_FORMAT2)}
              fontSize={Fonts.size.font10}
              color={Colors.jumbo}
            />
          </View>
          {/* {} */}
          <View style={[styles.cardTwo]}>
            <View
              style={[
                styles.cardTwoChildOne,
                util.isRTL() && AppStyles.rowReverse,
              ]}>
              <View style={styles.storeName}>
                <Text size={Fonts.size.font13} color={Colors.grey4} type="bold">
                  {deliveryDetails.store.name}
                </Text>
              </View>
              <View style={styles.timeAgo}>
                <Text size={Fonts.size.font12} color={Colors.grey4} type="bold">
                  {getTimeDiff(deliveryDetails.order_date)}
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.cardTwoChildTwo,
                util.isRTL() && AppStyles.rowReverse,
              ]}>
              <View>
                <View
                  style={[
                    util.isRTL() ? AppStyles.mRight10 : styles.beautyImageWrap,
                  ]}>
                  <RnImage
                    source={
                      _.isNil(deliveryDetails.store.image) ||
                      _.isEmpty(deliveryDetails.store.image)
                        ? Images.ItemImagePlaceholder
                        : {uri: deliveryDetails.store.image}
                    }
                    style={styles.beautyImageStyle}
                  />
                </View>
                <View
                  style={[
                    util.isRTL()
                      ? [AppStyles.alignItemsFlexEnd, AppStyles.mRight5]
                      : AppStyles.alignStart,
                    AppStyles.mTop5,
                  ]}>
                  <DateItem
                    date={ISOToFormat(deliveryDetails.order_date, DATE_FORMAT2)}
                    fontSize={Fonts.size.font10}
                    color={Colors.jumbo}
                  />
                </View>
              </View>
              <View style={util.isRTL() ? {marginRight: 10} : {marginLeft: 10}}>
                <View style={styles.cardTwoMargin}>
                  <View style={AppStyles.mBottom5}>
                    <Text style={styles.storeNameTextTwo}>
                      {deliveryDetails.store.name}
                    </Text>
                  </View>
                  <View style={styles.riderRatingWrap}>
                    {/* <Rating
                      isDisabled={true}
                      ratingCount={5}
                      imageSize={18}
                      readonly={true}
                      startingValue={deliveryDetails.store.rating}
                    /> */}

                    <StarRating
                      initialRating={deliveryDetails.store.rating}
                      readonly={true}
                      imageSize={18}
                    />
                  </View>
                  <Text style={[styles.lightColorTextStyle, AppStyles.mTop5]}>
                    {Math.round(deliveryDetails.store.distance)} {strings.KM}{' '}
                    {strings.AWAY}
                  </Text>
                  <Text style={[styles.lightColorTextStyle, AppStyles.mTop5]}>
                    {deliveryDetails.store.timings === 'fulltime'
                      ? strings.FULL_TIME
                      : strings.CUSTOM_TIMINGS}
                  </Text>
                  <View style={AppStyles.mTop5}>
                    {/* <RnImage
                      source={Images.CreditCard}
                      style={styles.creditCardStyle}
                    /> */}
                  </View>
                </View>
                <View style={styles.totalAmountWrap}>
                  <Text
                    style={styles.totalAmountText}
                    size={
                      deliveryDetails.estimate_bill.toFixed(2).length > 7
                        ? 18
                        : 22
                    }>
                    {_.isNil(user.currency_code) ? 'ESP' : user.currency_code}{' '}
                    {_.isNil(deliveryDetails.total)
                      ? deliveryDetails.estimate_bill.toFixed(2)
                      : deliveryDetails.total.toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* //// */}

          <DeliveryLocation
            category={deliveryDetails.store.category.name}
            categoryImg={deliveryDetails.store.category.image}
            locationAddress={deliveryDetails.delivery_location.address}
          />
          <View style={[AppStyles.flex, AppStyles.mTop10]}>
            <FlatList
              data={deliveryDetails.items}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => {
                const active = index === activeIndex;
                return (
                  <OrderItemAccordian
                    active={active}
                    toggleAccordinPress={handleIndex}
                    data={item}
                    index={index}
                    itemType={ORDER_ITEM_TYPE.deliveryDetails}
                  />
                );
              }}
            />
          </View>
          {/* {!orderRated && (
            <View style={styles.submitBtnWrap}>
              <Button
                color={Colors.white}
                background={Colors.resolutionBlue}
                style={[AppStyles.btnStyle1, AppStyles.shadow5]}
                size={Fonts.size.font17}
                onPress={() => {
                  deliveryDetails.type !== 'delivery'
                    ? Actions.rateMyService({
                        orderId: deliveryDetails.id,
                        storeId: deliveryDetails.store.id,
                      })
                    : Actions.rateMyService({
                        orderId: deliveryDetails.id,
                        storeId: deliveryDetails.store.id,
                        driverId: deliveryDetails.driver.id,
                      });
                }}
                isLoading={false}
                indicatorColor={Colors.white}
                disabled={false}
                type="bold">
                {
                  // deliveryDetails.status === 'assigned_offline'
                  //   ?
                  strings.RECEIVED
                  // : strings.DELIVERY
                }
              </Button>
            </View>
          )} */}
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              marginLeft: 23,
            }}>
            <ImageBackground
              source={Images.EstimatedBillWrapper}
              style={[
                styles.billWrap,
                util.isRTL() ? [AppStyles.rowReverse] : AppStyles.flexRow,
              ]}>
              <View
                style={[
                  styles.estimatedTextWrap,
                  util.isRTL() ? {marginRight: 22} : {marginLeft: 40},
                ]}>
                <Text
                  size={util.isRTL() ? Fonts.size.medium : Fonts.size.large}
                  color={Colors.white}
                  type={'bold'}>{`${strings.TOTAL}
      ${strings.BILL}
            `}</Text>
              </View>
              <View
                style={[styles.espTextStyle, util.isRTL() && {marginLeft: 20}]}>
                <Text
                  size={Fonts.size.medium}
                  color={Colors.white}
                  type={'bold'}>
                  {_.isNil(user.currency_code) ? 'ESP' : user.currency_code}
                </Text>
                <Text
                  style={{right: 6, top: 13}}
                  size={Fonts.size.large}
                  color={Colors.grey2}
                  type={'bold'}>
                  {_.isNil(deliveryDetails.total)
                    ? deliveryDetails.estimate_bill.toFixed(2)
                    : deliveryDetails.total.toFixed(2)}
                </Text>
              </View>
            </ImageBackground>
          </View>
        </ScrollView>
      )}
    </View>
  );
}
