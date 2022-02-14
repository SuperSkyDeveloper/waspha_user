import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';

import {Actions} from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  StarRating,
  Loader,
  Text,
  HTMLView,
  VendorProfileInfo,
} from '../../components';
import styles from './NearByStoreItemStyles';
import {Fonts, Colors, Images, AppStyles} from '../../theme';
import {strings} from '../../constants';
import util from '../../util';
import {renderNameStringAndImageRender} from '../../helpers/multilingualHelper';

export default function NearByStoreItemView(props) {
  const {
    badge,
    badgeText,
    item,
    category,
    subCategory,
    onItemPress,
    loading,
    setValue,
    showCustomTime,
  } = props;
  return (
    <>
      {/* <Spinner visible={loading} color={Colors.green} /> */}
      <Loader loading={loading} />
      <TouchableOpacity
        onPress={onItemPress}
        style={styles.list}
        activeOpacity={0.7}>
        {badge && (
          <TouchableOpacity
            style={util.isRTL() ? styles.offerBadgeRTL : styles.offerBadge}
            activeOpacity={0.7}
            onPress={() => {
              Actions.storeDashboard({
                storeId: item.id,
                storeName: renderNameStringAndImageRender(item.business_name),
                rfpVendors: [{...item}],
                categoryId: category.id,
              });
            }}>
            <Text
              size={Fonts.size.font13}
              color={Colors.white}
              type="extraBold">
              {badgeText}
            </Text>
          </TouchableOpacity>
        )}
        <RnImage
          style={styles.shopBanner}
          source={_.isNil(item.image) ? Images.StoreIcon : {uri: item.image}}
        />
        <View
          style={
            util.isRTL()
              ? [styles.info, AppStyles.rowReverse]
              : [styles.info, AppStyles.flexRow]
          }>
          <View>
            <HTMLView
              htmlContent={renderNameStringAndImageRender(item.business_name)}
              size={Fonts.size.font13}
              type="semiBold"
              color={Colors.black}
              textAlign={util.isRTL() ? 'right' : 'left'}
            />
            {/* <Text
              style={{textAlign: util.isRTL() ? 'right' : 'left'}}
              size={Fonts.size.font13}
              color={Colors.black}
              type="semiBold">
              {renderNameStringAndImageRender(item.business_name)}
            </Text> */}
            <View
              style={[
                AppStyles.flexRow,
                styles.providerRatingWrap,
                util.isRTL() && {
                  alignSelf: 'flex-end',
                },
              ]}>
              {/* <AirbnbRating
                count={5}
                defaultRating={item.average_rating}
                size={13}
                showRating={false}
                isDisabled={true}
              /> */}
              <StarRating
                initialRating={item.average_rating}
                readonly={true}
                imageSize={13}
              />
            </View>
          </View>
          <View>
            <View style={styles.cardWrap}>
              <Text
                size={Fonts.size.font7}
                type="medium"
                color={Colors.santasGray}>
                {` ${item.distance} ${strings.KM} ${strings.AWAY}`}
              </Text>
              {/* <RnImage source={Images.CreditCard} style={AppStyles.mLeft10} /> */}
            </View>
            <View style={[AppStyles.mTop5]}>
              {!_.isString(item.timings) && !_.isUndefined(item.timings) && (
                <>
                  <TouchableOpacity
                    style={styles.customTimingsWrap}
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

              {_.isString(item.timings) && (
                <Text
                  size={Fonts.size.xxxSmall}
                  color={Colors.santasGray}
                  type="medium">
                  {strings.FULL_TIME}
                </Text>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {showCustomTime && (
        <VendorProfileInfo
          isModalOpen={showCustomTime}
          modalType="showCustomTime"
          closeModal={setValue}
          items={Object.entries(item.timings)}
        />
      )}
    </>
  );
}
