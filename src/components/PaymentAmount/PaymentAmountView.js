import React from 'react';
import _, {toPlainObject} from 'lodash';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {Text, TextInput, ShareModal, HTMLView} from '../../components';
import styles from './PaymentAmountStyles';
import {Fonts, Colors, AppStyles, Images, Metrics} from '../../theme';
import {
  PAYMENT_TYPE,
  strings,
  PROMO_TYPES,
  PLACED_ORDER_TYPE,
  RIDER_TYPE,
} from '../../constants';
import Button from '../Button';
import util from '../../util';
import {renderNameStringAndImageRender} from '../../helpers/multilingualHelper';

export default function PaymentAmountView(props) {
  const {
    handleShareBtn,
    isShareModelShow,
    makePayment,
    paymentDetails,
    showWallet,
    proposalDetails,
    user,
    selectedMethod,
    isDiscounted,
    billItems,
    validateApplyPromo,
    getPromoCodeTotal,
    isConfirmBtn,
  } = props;
  let currencyCode = _.isNil(user.currency_code) ? 'ESP' : user.currency_code;

  // let paymentDetails={...props.paymentDetails, waspha_fee_type_user: "fixed"}

  return (
    <View style={styles.container}>
      <View style={styles.walletSec}>
        <View style={styles.pHorizontal}>
          <View style={styles.headWrap}>
            <Text
              style={util.isRTL() && {textAlign: 'right', width: '100%'}}
              size={Fonts.size.font14}
              color={Colors.grey2}
              type="semiBold">
              {strings.PAYMENT_AMOUNT}
            </Text>
            {/* <TouchableOpacity style={styles.shareWrap} onPress={handleShareBtn}>
              <RnImage source={Images.ShareIcon} />
            </TouchableOpacity> */}
            <ShareModal open={isShareModelShow} onPress={handleShareBtn} />
          </View>

          <View style={[AppStyles.mTop25]}>
            <View style={AppStyles.mBottom20}>
              {proposalDetails.items.map(item => {
                let AmountAfterDiscount = '';
                if (
                  !_.isNil(item.menu_promotion) &&
                  item.menu_promotion.type === PROMO_TYPES.DISCOUNT
                ) {
                  AmountAfterDiscount =
                    (item.price / 100) *
                    (100 - item.menu_promotion.extra_data.discount);
                }
                return (
                  <>
                    <View
                      style={[
                        util.isRTL() ? AppStyles.rowReverse : AppStyles.flexRow,
                        styles.itemStyle,
                      ]}>
                      <View style={styles.dot} />
                      <>
                        <View
                          style={[
                            AppStyles.flex,
                            util.isRTL() && {textAlign: 'right'},
                          ]}>
                          <HTMLView
                            htmlContent={` ${
                              item.quantity
                            } x ${renderNameStringAndImageRender(item.name)} `}
                            type="semiBold"
                            color={Colors.grey2}
                          />
                        </View>

                        {/* <Text
                          style={[
                            AppStyles.flex,
                            util.isRTL() && {textAlign: 'right'},
                          ]}
                          color={Colors.grey2}
                          size={Fonts.size.normal}
                          type="semiBold">{` ${
                          item.quantity
                        } x ${renderNameStringAndImageRender(
                          item.name,
                        )} `}</Text> */}
                        <Text
                          color={Colors.grey2}
                          size={Fonts.size.small}
                          style={[
                            !_.isNil(item.menu_promotion) &&
                              item.menu_promotion.type ===
                                PROMO_TYPES.DISCOUNT && {
                                textDecorationLine: 'line-through',
                                textDecorationStyle: 'solid',
                              },
                          ]}
                          type="semiBold">
                          {`${currencyCode} ${(
                            item.price * item.quantity
                          ).toFixed(2)}`}
                        </Text>
                      </>
                    </View>
                    {!_.isNil(item.menu_promotion) && (
                      <View
                        style={{
                          marginLeft: Metrics.baseMargin,
                          marginRight:
                            item.menu_promotion.type === PROMO_TYPES.DISCOUNT
                              ? 0
                              : Metrics.tripleMediumBaseMargin,
                        }}>
                        {item.menu_promotion.type ===
                          PROMO_TYPES.BUY_1_GET_1 && (
                          <Text
                            type="semiBold"
                            size={Fonts.size.small}
                            color={Colors.grey2}>
                            {`${strings.BUY1_GET1_OFFER}: ${
                              item.quantity
                            } x ${renderNameStringAndImageRender(item.name)}`}
                          </Text>
                        )}

                        {item.menu_promotion.type === PROMO_TYPES.DISCOUNT && (
                          <View
                            style={[
                              styles.contentSec,
                              util.isRTL() && AppStyles.rowReverse,
                            ]}>
                            <View
                              style={[
                                styles.titleWrap,
                                util.isRTL() && AppStyles.rowReverse,
                              ]}>
                              <Text
                                type="semiBold"
                                size={Fonts.size.small}
                                color={Colors.grey2}>
                                {strings.DISCOUNTED_PRICE}
                              </Text>
                            </View>
                            <View style={[styles.priceWrap]}>
                              <Text
                                style={{
                                  textAlign: 'right',
                                }}
                                type="semiBold"
                                size={Fonts.size.small}
                                color={Colors.grey2}>
                                {`${currencyCode} ${AmountAfterDiscount.toFixed(
                                  2,
                                )}`}
                              </Text>
                            </View>
                          </View>
                        )}
                        {item.menu_promotion.type ===
                          PROMO_TYPES.GIFT_PRODUCT && (
                          <Text
                            type="semiBold"
                            size={Fonts.size.small}
                            color={Colors.grey2}>
                            {`${strings.GIFT_PRODUCT_OFFER}: ${
                              item.quantity
                            } x ${renderNameStringAndImageRender(
                              item.menu_promotion.extra_data.product_name,
                            )}`}
                          </Text>
                        )}
                      </View>
                    )}
                  </>
                );
              })}
            </View>

            {!_.isNil(billItems) &&
              billItems.map(item => {
                if (
                  item.key === 'waspha_fee_amount_vendor' ||
                  item.key === 'waspha_fee_vendor'
                ) {
                  return true;
                }

                if (
                  paymentDetails.waspha_fee_type_user === 'fixed' &&
                  item.key === 'waspha_fee_amount_user'
                ) {
                  return true;
                }

                return (
                  !_.isNil(item.value) && (
                    <>
                      <View
                        style={[
                          util.isRTL()
                            ? AppStyles.rowReverse
                            : AppStyles.flexRow,
                          styles.row,
                        ]}>
                        <View
                          style={[
                            styles.dot,
                            validateApplyPromo(item) && {
                              top: -9,
                            },
                          ]}
                        />
                        <View
                          style={[
                            {
                              justifyContent: 'space-between',

                              flex: 1,
                            },
                            util.isRTL()
                              ? AppStyles.rowReverse
                              : AppStyles.flexRow,
                          ]}>
                          <View>
                            <Text
                              style={[
                                AppStyles.flex,
                                util.isRTL()
                                  ? {
                                      textAlign: 'right',
                                      marginRight: 8,
                                    }
                                  : {marginLeft: 6},
                              ]}
                              color={Colors.grey2}
                              size={Fonts.size.xxxSmall}
                              type="semiBold">
                              {item.label}
                            </Text>
                            {validateApplyPromo(item) && (
                              <Text
                                style={{left: 4}}
                                color={Colors.grey2}
                                size={Fonts.size.xxxSmall}
                                type="semiBold">
                                {`(${strings.PROMO_APPLIED})`}
                              </Text>
                            )}
                          </View>

                          <View>
                            <Text
                              style={
                                item.key === 'subtotal' &&
                                isDiscounted && {
                                  textDecorationLine: 'line-through',
                                  textDecorationStyle: 'solid',
                                }
                              }
                              color={Colors.grey2}
                              size={Fonts.size.xxSmall}
                              type="semiBold">
                              {/* {item.label.includes('percentage') */}

                              {proposalDetails.delivery_mode ===
                                RIDER_TYPE.WASPHA_EXPRESS &&
                              item.key === 'delivery_fee'
                                ? '--'
                                : paymentDetails.waspha_fee_type_user ===
                                    'percentage' &&
                                  item.key === 'waspha_fee_user'
                                ? `${item.value} %`
                                : `${currencyCode} ${item.value.toFixed(2)}`}
                            </Text>
                            {validateApplyPromo(item) &&
                              !_.isNil(
                                paymentDetails.total.discounted_value,
                              ) && (
                                <Text
                                  color={Colors.grey2}
                                  size={Fonts.size.xxSmall}
                                  type="bold">
                                  {`- ${currencyCode} ${paymentDetails.total.discounted_value.toFixed(
                                    2,
                                  )}`}
                                </Text>
                              )}
                          </View>
                        </View>
                      </View>
                    </>
                  )
                );
              })}
            <View style={styles.lineWrap}>
              <View style={util.isRTL() ? styles.rightLine : styles.leftLine} />
              <View style={styles.mHorizontal} />
              <View style={util.isRTL() ? styles.leftLine : styles.rightLine} />
            </View>
            <View
              style={[
                util.isRTL() ? AppStyles.rowReverse : AppStyles.flexRow,
                styles.row,
              ]}>
              <View style={AppStyles.flex}>
                <Text
                  style={[util.isRTL() && {textAlign: 'right'}]}
                  color={Colors.grey2}
                  size={Fonts.size.font14}
                  type="semiBold">
                  {paymentDetails.total.label}
                </Text>
                {getPromoCodeTotal() && (
                  <Text
                    style={[
                      AppStyles.flex,
                      util.isRTL() && {textAlign: 'right'},
                    ]}
                    color={Colors.grey2}
                    size={Fonts.size.font14}
                    type="semiBold">
                    {`(${strings.TOTAL_AFTER_PROMO})`}
                  </Text>
                )}
              </View>
              <View>
                <Text
                  style={
                    getPromoCodeTotal() && {
                      textDecorationLine: 'line-through',
                      textDecorationStyle: 'solid',
                    }
                  }
                  color={Colors.grey2}
                  size={Fonts.size.font14}
                  type="semiBold">
                  {`${currencyCode} ${paymentDetails.total.value.toFixed(2)}`}
                </Text>
                {getPromoCodeTotal() && (
                  <Text
                    color={Colors.grey2}
                    size={Fonts.size.font14}
                    type="bold">
                    {`${currencyCode} ${(
                      paymentDetails.total.value -
                      paymentDetails.total.discounted_value
                    ).toFixed(2)}`}
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>
        <View />
        <View style={styles.btnWrap}>
          <Button
            color={Colors.white}
            background={Colors.resolutionBlue}
            style={[AppStyles.btnStyle1, AppStyles.shadow5]}
            size={Fonts.size.font17}
            isLoading={!isConfirmBtn}
            indicatorColor={Colors.white}
            disabled={!isConfirmBtn}
            type="bold"
            onPress={makePayment}>
            {selectedMethod === PAYMENT_TYPE.CASH_ON_DELIVERY
              ? strings.CONFIRM_ORDER
              : strings.MAKE_PAYMENT}
          </Button>
        </View>
      </View>
    </View>
  );
}
