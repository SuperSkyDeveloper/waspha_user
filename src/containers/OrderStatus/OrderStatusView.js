import React from 'react';
import _ from 'lodash';
import {
  View,
  Image as RnImage,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Actions} from 'react-native-router-flux';
import {
  Text,
  Button,
  Maps,
  DateItem,
  OptionsModal,
  BottomSheet,
  StarRating,
  ChangeModeModal,
  Loader,
  HTMLView,
} from '../../components';
import styles from './OrderStatusStyles';
import {Images, AppStyles, Colors, Fonts, Metrics} from '../../theme';
import {strings, DATE_FORMAT2, TIME_FORMAT1} from '../../constants';
import util from '../../util';
import {ISOToFormat} from '../../helpers/generalHelper';

export default function OrderStatusView(props) {
  const {
    deliveryStatusDetails,
    loading,
    isChatOption,
    setValue,
    shouldEnableContactOption,
    showMapOptions,
    openMapSheet,
    selectMapOption,
    orderRated,
    driverCordsAfterInterval,
    driverTimeAndKMAfterInterval,
    riderOrderRejected,
    isPhoneOption,
  } = props;
  console.log({driverCordsAfterInterval});
  return (
    <View style={styles.container}>
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <>
          <ScrollView
            style={AppStyles.flex}
            showsVerticalScrollIndicator={false}>
            <Maps
              riderTimeAndKM={driverTimeAndKMAfterInterval}
              mapHeight={300}
              isDirection={true}
              rfpVendors={
                _.isNil(deliveryStatusDetails.driver)
                  ? [
                      {
                        lat: deliveryStatusDetails.vendor.store.location.lat,
                        lng: deliveryStatusDetails.vendor.store.location.lng,
                        category_id:
                          deliveryStatusDetails.vendor.store.category_id,
                        isVendor: true,
                      },
                    ]
                  : [
                      {
                        lat: deliveryStatusDetails.vendor.store.location.lat,
                        lng: deliveryStatusDetails.vendor.store.location.lng,
                        category_id:
                          deliveryStatusDetails.vendor.store.category_id,
                        isVendor: true,
                      },
                      {
                        lat: driverCordsAfterInterval.latitude,
                        lng: driverCordsAfterInterval.longitude,
                        showRiderTimeAndKM: true,
                      },
                    ]
              }
              showDriverLocation={
                deliveryStatusDetails.type === 'delivery' ? true : false
              }
              driverImg={
                !_.isNil(deliveryStatusDetails.driver) &&
                deliveryStatusDetails.driver.avatar
              }
              vendorImg={deliveryStatusDetails.vendor.store.image}
              fromOrderStatus={true}
            />

            {!util.isPlatformAndroid() && (
              <TouchableOpacity
                onPress={() => Actions.pop()}
                style={[
                  AppStyles.flex,
                  {alignItems: util.isRTL() ? 'flex-end' : 'flex-start'},
                ]}>
                <View
                  style={[
                    styles.backBtnWrap,
                    util.isRTL() ? {marginRight: 20} : {marginLeft: 17},
                  ]}>
                  <RnImage
                    source={Images.BackBtn}
                    style={[
                      styles.backBtnStyle,
                      util.isRTL() && {transform: [{rotate: '-180deg'}]},
                    ]}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
            )}
            <View
              style={
                deliveryStatusDetails.type === 'delivery'
                  ? styles.contentSec
                  : util.isPlatformAndroid()
                  ? {marginTop: Metrics.screenHeight / 2.3}
                  : {marginTop: Metrics.screenHeight / 3.3}
              }>
              {deliveryStatusDetails.type === 'delivery' && (
                <View
                  style={[
                    styles.card,
                    util.isRTL() && AppStyles.rowReverse,
                    {marginTop: util.isPlatformAndroid() ? 38 : -20},
                  ]}>
                  <View style={styles.cardOneSec}>
                    <View style={styles.driverImageParentStyle}>
                      <View style={styles.riderImageWrap}>
                        <RnImage
                          source={
                            _.isNil(deliveryStatusDetails.driver.avatar)
                              ? Images.ProfilePlaceholder
                              : {uri: deliveryStatusDetails.driver.avatar}
                          }
                          style={styles.riderImage}
                          resizeMode="cover"
                        />
                      </View>
                      <View>
                        <RnImage
                          source={Images.DriverCircular}
                          style={styles.driverCircularWrap}
                        />
                      </View>
                    </View>
                    <View style={styles.bikeWrap}>
                      <RnImage
                        source={{
                          uri: deliveryStatusDetails.driver.vehicle_icon,
                        }}
                        resizeMode="contain"
                        style={styles.bikeImage}
                      />
                    </View>
                    <View style={styles.riderNameWrap}>
                      <Text style={styles.riderNameText} size={14}>
                        {deliveryStatusDetails.driver.name}
                      </Text>
                    </View>
                    <View style={styles.riderRatingWrap}>
                      {/* <Rating
                        isDisabled={true}
                        ratingCount={5}
                        imageSize={15}
                        readonly={true}
                        startingValue={deliveryStatusDetails.driver.rating}
                      /> */}
                      <StarRating
                        initialRating={deliveryStatusDetails.driver.rating}
                        readonly={true}
                        imageSize={15}
                      />
                    </View>
                  </View>
                  <View style={styles.cardTwoSec}>
                    <View style={styles.cardTwoSecChildOne}>
                      <View
                        style={[
                          AppStyles.flexRow,
                          util.isRTL() && {
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1,
                          },
                        ]}>
                        <View style={styles.etaWrap}>
                          <Text style={styles.etaText}>ETA</Text>
                        </View>
                        <View style={styles.timeCard}>
                          <View style={styles.timeWrap}>
                            <Text style={styles.time} size={11}>
                              {ISOToFormat(
                                deliveryStatusDetails.driver.delivery_time,
                                TIME_FORMAT1,
                              )}
                            </Text>
                          </View>
                        </View>
                      </View>

                      {/* //// */}

                      <View
                        style={[
                          styles.userContactWrap,
                          util.isRTL() && {
                            position: 'absolute',
                            left: -13,
                          },
                        ]}>
                        <TouchableOpacity
                          disabled={
                            !shouldEnableContactOption ||
                            (_.isNil(deliveryStatusDetails.driver.contact) &&
                              _.isNil(
                                deliveryStatusDetails.vendor.store.contact,
                              ))
                          }
                          onPress={() => {
                            setValue({isPhoneOption: true});
                          }}
                          style={
                            shouldEnableContactOption
                              ? [styles.contactImage, AppStyles.mRight5]
                              : [styles.disableContactImage, AppStyles.mRight5]
                          }>
                          <RnImage
                            style={styles.image}
                            source={Images.PhoneIcon1}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          disabled={!shouldEnableContactOption}
                          onPress={() => setValue({isChatOption: true})}
                          style={
                            shouldEnableContactOption
                              ? [styles.contactImage]
                              : [styles.disableContactImage]
                          }>
                          <RnImage
                            style={styles.image}
                            source={Images.Chat}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                      </View>

                      {/* ////// */}
                    </View>

                    <View style={styles.itemCollectWrap}>
                      <Text style={styles.itemCollect} size={14}>
                        {strings.ITEMS_TO_BE_COLLECTED}
                      </Text>
                    </View>
                    <View style={styles.itemsCollectWraps}>
                      {/* <Text style={styles.itemsCollect} size={10}>
                        {deliveryStatusDetails.driver.items_received}
                      </Text> */}

                      <HTMLView
                        size={10}
                        style={styles.itemsCollect}
                        htmlContent={
                          deliveryStatusDetails.driver.items_received
                        }
                      />
                    </View>
                  </View>
                </View>
              )}
              <View style={styles.orderstatusWrap}>
                <Text style={styles.orderstatusText} type="medium" size={13}>
                  {strings.ORDER_STATUS}
                </Text>
                <Text
                  style={styles.orderstatusText}
                  size={13}
                  type="medium">{`${strings.ORDER_CODE}: ${
                  deliveryStatusDetails.id
                }`}</Text>
              </View>
              <View style={styles.statusOptionWrap}>
                {deliveryStatusDetails.order_flow.map((item, index) => {
                  const isLastItem = util.isLastItem(
                    deliveryStatusDetails.order_flow,
                    index,
                  );
                  return (
                    <View
                      style={[
                        util.isRTL()
                          ? [AppStyles.rowReverse, styles.borderStyleRTL]
                          : [AppStyles.flexRow, styles.borderStyle],
                        styles.statusWrap,
                        isLastItem
                          ? util.isRTL()
                            ? styles.noBorderRTL
                            : styles.noBorder
                          : {},
                      ]}>
                      <View
                        style={
                          util.isRTL()
                            ? AppStyles.rowReverse
                            : AppStyles.flexRow
                        }>
                        <View
                          style={[
                            util.isRTL()
                              ? {marginRight: -12}
                              : {marginLeft: -Metrics.baseMargin},
                            styles.statusOptionIconWrap,
                          ]}>
                          <RnImage
                            source={item.status ? Images.Tick : ''}
                            style={styles.tickImage}
                          />
                        </View>

                        <Text
                          style={[
                            util.isRTL()
                              ? {marginRight: Metrics.smallMargin}
                              : {marginLeft: Metrics.smallMargin},
                            styles.statusOptionText,
                          ]}
                          size={13}>
                          {item.title}
                        </Text>
                      </View>

                      <View
                        style={[
                          styles.dateWrap,
                          _.isNil(item.date) && AppStyles.mTop35,
                        ]}>
                        {!_.isNil(item.date) && (
                          <DateItem
                            date={ISOToFormat(item.date, DATE_FORMAT2)}
                            fontSize={Fonts.size.font10}
                            color={Colors.jumbo}
                          />
                        )}
                      </View>
                    </View>
                  );
                })}
              </View>
              {deliveryStatusDetails.type !== 'delivery' && (
                <TouchableOpacity
                  style={styles.mapNavIconStyle}
                  onPress={openMapSheet}>
                  <RnImage source={Images.MapNavIcon} />
                </TouchableOpacity>
              )}
            </View>

            {showMapOptions && (
              <BottomSheet
                setSheet={openMapSheet}
                selectOption={selectMapOption}
              />
            )}
          </ScrollView>

          {!orderRated && (
            <View style={styles.submitBtnWrap}>
              <Button
                color={Colors.white}
                background={Colors.resolutionBlue}
                style={[AppStyles.btnStyle1, AppStyles.shadow5]}
                size={Fonts.size.font17}
                onPress={() => {
                  deliveryStatusDetails.type !== 'delivery'
                    ? Actions.rateMyService({
                        orderId: deliveryStatusDetails.id,
                        storeId: deliveryStatusDetails.vendor.store.id,
                      })
                    : Actions.rateMyService({
                        orderId: deliveryStatusDetails.id,
                        storeId: deliveryStatusDetails.vendor.store.id,
                        driverId: deliveryStatusDetails.driver.id,
                      });
                }}
                isLoading={false}
                indicatorColor={Colors.white}
                disabled={false}
                type="bold">
                {// deliveryDetails.status === 'assigned_offline'
                //   ?
                strings.RECEIVED.toUpperCase()
                // : strings.DELIVERY
                }
              </Button>
            </View>
          )}
          <View style={styles.submitBtnWrap}>
            <Button
              color={Colors.white}
              background={Colors.resolutionBlue}
              style={[AppStyles.btnStyle1, AppStyles.shadow5]}
              size={Fonts.size.font17}
              onPress={() => {
                Actions.deliveryCenterDetails({
                  deliveryId: deliveryStatusDetails.id,
                });
              }}
              isLoading={false}
              indicatorColor={Colors.white}
              disabled={false}
              type="bold">
              {strings.ORDER_DETAILS}
            </Button>
          </View>
        </>
      )}

      {riderOrderRejected && (
        <ChangeModeModal
          isModalOpen={riderOrderRejected}
          closeModal={setValue}
          modalType="riderOrderRejected"
          showOneBtn={true}
        />
      )}

      {isChatOption && (
        <OptionsModal
          data={deliveryStatusDetails}
          isModalOpen={isChatOption}
          closeModal={setValue}
          modalType="isChatOption"
          isUserChat={true}
          isDeliveryChat={true}
          isGroupChat={true}
        />
      )}

      {isPhoneOption && (
        <OptionsModal
          showPhoneOptions={true}
          showHeading={false}
          data={deliveryStatusDetails}
          isModalOpen={isPhoneOption}
          closeModal={setValue}
          modalType="isPhoneOption"
        />
      )}
    </View>
  );
}
