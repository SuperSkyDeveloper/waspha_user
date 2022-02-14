import React from 'react';
import _ from 'lodash';
import {
  View,
  Image as RnImage,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {Text, VendorHeader, Loader, VendorProfileInfo} from '../../components';
import styles from './VendorProfileStyles';
import {Images, Fonts, Colors, AppStyles} from '../../theme';
import {strings, TIME_FORMAT1} from '../../constants';
import {Actions} from 'react-native-router-flux';
import {ISOToFormat} from '../../helpers/generalHelper';
import util from '../../util';
import {renderNameStringAndImageRender} from '../../helpers/multilingualHelper';

export default function VendorProfileView(props) {
  const {
    loading,
    shopDetails,
    category,
    subCategory,
    showCustomTime,
    setValue,
    user,
  } = props;

  if (loading) {
    return (
      <View style={styles.loaderWrap}>
        <Loader loading={loading} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        //keyboardShouldPersistTaps="always"
        nestedScrollEnabled={true}
        style={styles.infoSec}
        showsVerticalScrollIndicator={false}>
        <VendorHeader item={shopDetails} showRating={true} showBtn={true} />
        <View style={styles.inner}>
          {/* <View
            style={[
              styles.distanceSec,
              util.isRTL() ? AppStyles.rowReverse : AppStyles.flexRow,
            ]}>
            <View style={styles.col}>
              <RnImage
                style={AppStyles.mRight5}
                source={Images.DirectionIcon}
              />
              <View>
                <Text
                  size={Fonts.size.font14}
                  color={Colors.abbey}
                  type="semiBold"
                  style={util.isRTL() && {textAlign: 'center'}}>
                  {strings.DISTANCE}
                </Text>
                <Text
                  size={Fonts.size.xxxSmall}
                  color={Colors.santasGray}
                  type="medium">
                  {`${shopDetails.distance} ${
                    strings.KM
                  } ${strings.AWAY.toUpperCase()}`}
                </Text>
              </View>
            </View>
            <View style={styles.col}>
              <RnImage style={AppStyles.mRight5} source={Images.ClockIcon02} />
              <View>
                <Text
                  size={Fonts.size.font14}
                  color={Colors.abbey}
                  type="semiBold">
                  {strings.OPENING_HOURS}
                </Text>
              </View>

              <View style={[AppStyles.mTop10, {height: 10}]}>
                {!_.isString(shopDetails.timings) &&
                  !_.isUndefined(shopDetails.timings) && (
                    <>
                      <TouchableOpacity
                        style={
                          (styles.customTimingsWrap,
                          util.isRTL() && {paddingVertical: 30, top: -32})
                        }
                        onPress={() => {
                          setValue({showCustomTime: !showCustomTime});
                        }}>
                        <Text
                          style={styles.multiShiftStyle}
                          size={Fonts.size.xxxSmall}
                          color={Colors.blue}
                          type="bold">
                          {strings.MULTIPLE_SHIFTS}
                        </Text>
                      </TouchableOpacity>
                    </>
                  )}

                {_.isString(shopDetails.timings) && (
                  <Text
                    size={Fonts.size.xxxSmall}
                    color={Colors.santasGray}
                    type="medium">
                    {shopDetails.timings}
                  </Text>
                )}
              </View>
            </View>
          </View>
         */}

          {!_.isNil(shopDetails.more_information) && (
            <View style={[styles.moreInofSec]}>
              <Text
                style={util.isRTL() && {textAlign: 'right', marginTop: 20}}
                color={Colors.abbey}
                size={Fonts.size.font16}
                type="semiBold">
                {strings.MORE_INFORMATION}
              </Text>
              <Text
                style={[util.isRTL() && {textAlign: 'right'}, {marginTop: 20}]}
                color={Colors.abbey}
                size={Fonts.size.font16}
                type="semiBold">
                {strings.Location}
              </Text>
              <Text
                style={[AppStyles.mTop10, util.isRTL() && {textAlign: 'right'}]}
                color={Colors.manatee}
                size={Fonts.size.font12}
                type="medium">
                {`${
                  !_.isNil(shopDetails.more_information.address)
                    ? shopDetails.more_information.address
                    : ''
                }`}
              </Text>
              <Text
                style={[util.isRTL() && {textAlign: 'right'}, {marginTop: 20}]}
                color={Colors.abbey}
                size={Fonts.size.font16}
                type="semiBold">
                {strings.OPENING_HOURS}
              </Text>
              {!_.isString(shopDetails.timings) &&
                !_.isUndefined(shopDetails.timings) && (
                  <>
                    <TouchableOpacity
                      style={[styles.customTimingsWrap, {marginTop: 5}]}
                      onPress={() => {
                        setValue({showCustomTime: !showCustomTime});
                      }}>
                      <Text
                        style={[
                          styles.multiShiftStyle,
                          util.isRTL() && {textAlign: 'right'},
                        ]}
                        size={Fonts.size.xxxSmall}
                        color={Colors.blue}
                        type="bold">
                        {strings.MULTIPLE_SHIFTS}
                      </Text>
                    </TouchableOpacity>
                  </>
                )}

              {_.isString(shopDetails.timings) && (
                <Text
                  style={[
                    util.isRTL() && {textAlign: 'right'},
                    {marginTop: 10},
                  ]}
                  size={Fonts.size.xSmall}
                  color={Colors.santasGray}
                  type="medium">
                  {shopDetails.timings}
                </Text>
              )}
              <Text
                size={Fonts.size.font14}
                color={Colors.abbey}
                type="semiBold"
                style={[util.isRTL() && {textAlign: 'right'}, {marginTop: 20}]}>
                {strings.DISTANCE}
              </Text>
              <Text
                style={[util.isRTL() && {textAlign: 'right'}, {marginTop: 10}]}
                size={Fonts.size.xxxSmall}
                color={Colors.santasGray}
                type="medium">
                {`${shopDetails.distance} ${
                  strings.KM
                } ${strings.AWAY.toUpperCase()}`}
              </Text>
            </View>
          )}
          <View
            style={[
              styles.customNeedSec,
              util.isRTL() && AppStyles.rowReverse,
            ]}>
            <TouchableOpacity
              onPress={() => {
                Actions.orderPlace({
                  storeId: shopDetails.id,
                  rfpVendors: [
                    {
                      ...shopDetails,
                    },
                  ],
                  category: category,
                  subCategory: subCategory,
                  isParticularStore: true,
                  showRemoveImgBtn: true,
                });
              }}
              style={styles.box}>
              <RnImage
                source={Images.NeedIcon}
                style={{height: 37, width: 37}}
                resizeMode="contain"
              />
              <Text
                style={[AppStyles.mTop15, util.isRTL() && {textAlign: 'right'}]}
                size={Fonts.size.font10}
                color={Colors.resolutionBlue}
                type="semiBold">
                {strings.CUSTOM_NEED}
              </Text>
            </TouchableOpacity>
            {!_.isNil(user.access_token) && shopDetails.has_previous_orders && (
              <TouchableOpacity
                onPress={() => {
                  Actions.reOrder({
                    storeId: shopDetails.id,
                    rfpVendors: [
                      {
                        ...shopDetails,
                      },
                    ],
                  });
                }}
                style={styles.box}>
                <RnImage
                  source={Images.ReloadIcon}
                  style={{height: 37, width: 37}}
                  resizeMode="contain"
                />
                <Text
                  style={[
                    AppStyles.mTop15,
                    util.isRTL()
                      ? {textAlign: 'right'}
                      : {alignItems: 'flex-end'},
                  ]}
                  size={Fonts.size.font10}
                  color={Colors.resolutionBlue}
                  type="semiBold">
                  {strings.RE_ORDER}
                </Text>
              </TouchableOpacity>
            )}
            {shopDetails.has_menu && (
              <TouchableOpacity
                onPress={() => {
                  Actions.storeDashboard({
                    storeId: shopDetails.id,
                    rfpVendors: [
                      {
                        ...shopDetails,
                      },
                    ],
                    categoryId: shopDetails.category_id,
                    storeName: renderNameStringAndImageRender(
                      shopDetails.business_name,
                    ),
                  });
                }}
                style={styles.box}>
                <RnImage
                  source={Images.MenuIcon}
                  style={{height: 37, width: 37}}
                  resizeMode="contain"
                />
                <Text
                  style={[
                    AppStyles.mTop15,
                    util.isRTL()
                      ? {textAlign: 'right'}
                      : {justifyContent: 'flex-end'},
                  ]}
                  size={Fonts.size.font10}
                  color={Colors.resolutionBlue}
                  type="semiBold">
                  {strings.MENU_OFFER}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>

      {showCustomTime && (
        <VendorProfileInfo
          isModalOpen={showCustomTime}
          modalType="showCustomTime"
          closeModal={setValue}
          items={Object.entries(shopDetails.timings)}
        />
      )}
    </View>
  );
}
