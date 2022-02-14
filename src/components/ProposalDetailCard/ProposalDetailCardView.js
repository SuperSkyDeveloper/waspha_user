import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {
  Text,
  DateItem,
  VendorProfileInfo,
  StarRating,
  HTMLView,
} from '../../components';
import styles from './ProposalDetailCardStyles';
import {Fonts, Colors, Images, AppStyles, Metrics} from '../../theme';
import util from '../../util';
import {
  DATE_FORMAT2,
  TIME_FORMAT3,
  strings,
  TIME_FORMAT1,
} from '../../constants';
import {getTimeDiff, human, ISOToFormat} from '../../helpers/generalHelper';
import {renderNameStringAndImageRender} from '../../helpers/multilingualHelper';

export default function ProposalDetailCardView(props) {
  const {proposalDetails, showCustomTime, setValue, user} = props;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.header,
          util.isRTL() ? AppStyles.rowReverse : AppStyles.flexRow,
        ]}>
        {/* <Text size={Fonts.size.font13} color={Colors.jumbo} type="semiBold">
          {renderNameStringAndImageRender(proposalDetails.store.name)}
        </Text> */}
        <HTMLView
          htmlContent={renderNameStringAndImageRender(
            proposalDetails.store.name,
          )}
          size={Fonts.size.font13}
          color={Colors.jumbo}
          type="semiBold"
        />
        <Text size={Fonts.size.font10} color={Colors.jumbo} type="semiBold">
          {getTimeDiff(proposalDetails.order_date)}
        </Text>
      </View>
      <View
        style={[
          styles.content,
          util.isRTL() ? AppStyles.rowReverse : AppStyles.flexRow,
        ]}>
        <View style={styles.leftCol}>
          {!_.isNil(proposalDetails.store.image) && (
            <RnImage
              style={styles.prdImg}
              source={{uri: proposalDetails.store.image}}
            />
          )}
          <View style={styles.wrap}>
            <DateItem
              date={util.getFormattedDateTime(
                proposalDetails.order_date,
                DATE_FORMAT2,
              )}
              fontSize={Fonts.size.font10}
              color={Colors.jumbo}
            />
            {/* <RnImage source={Images.CreditCard} style={styles.cardImg} /> */}
          </View>
        </View>
        <View
          style={[
            {left: 9},
            util.isRTL()
              ? {paddingLeft: Metrics.screenWidth / 10}
              : {paddingRight: Metrics.screenWidth / 10},
          ]}>
          {/* <Text
            numberOfLines={3}
            ellipsizeMode="tail"
            size={Fonts.size.font20}
            type="semiBold"
            color={Colors.shark}>
            {renderNameStringAndImageRender(proposalDetails.store.name)}
          </Text> */}
          <HTMLView
            numberOfLines={3}
            ellipsizeMode="tail"
            size={Fonts.size.font20}
            type="semiBold"
            color={Colors.shark}
            htmlContent={renderNameStringAndImageRender(
              proposalDetails.store.name,
            )}
          />
          <View style={styles.ratingWrp}>
            {/* <Rating
              isDisabled={true}
              ratingCount={5}
              imageSize={15}
              readonly={true}
              startingValue={proposalDetails.store.avg_rating}
            /> */}

            <StarRating
              initialRating={proposalDetails.store.avg_rating}
              readonly={true}
              imageSize={15}
            />
          </View>
          <View>
            <Text
              style={styles.mTop}
              color={Colors.santasGray}
              size={Fonts.size.font10}
              type="medium">
              {proposalDetails.store.distance} {strings.KM} {strings.AWAY}
            </Text>

            <View
              style={[
                {
                  height: 40,
                  marginTop: 10,
                },
              ]}>
              {!_.isString(proposalDetails.store.timings) &&
                !_.isUndefined(proposalDetails.store.timings) && (
                  <>
                    <TouchableOpacity
                      style={{paddingVertical: 10, top: -3}}
                      onPress={() => {
                        setValue({showCustomTime: !showCustomTime});
                      }}>
                      <Text
                        style={[styles.customTextStyle]}
                        size={Fonts.size.xxSmall}
                        color={Colors.blue}
                        type="bold">
                        {strings.MULTIPLE_SHIFTS}
                      </Text>
                    </TouchableOpacity>
                    {/* <View style={[AppStyles.flex]}>
                      {showCustomTime && (
                        <VendorProfileInfo
                          proposalDetailss={Object.entries(proposalDetails.store.timings)}
                        />
                      )}
                    </View> */}
                  </>
                )}

              {_.isString(proposalDetails.store.timings) && (
                <Text
                  size={Fonts.size.xxxSmall}
                  color={Colors.santasGray}
                  type="medium">
                  {strings.FULL_TIME}
                </Text>
              )}
            </View>

            {!_.isNil(proposalDetails.type) && (
              <Text
                style={styles.mTop}
                color={Colors.santasGray}
                size={Fonts.size.font10}
                type="medium">
                {strings.ORDER_TYPE} :{' '}
                {proposalDetails.type === 'delivery'
                  ? strings.DELIVERY
                  : strings.PICK_UP}
              </Text>
            )}
          </View>
          <View style={styles.total}>
            <Text
              size={Fonts.size.normal}
              textAlign="center"
              type="semiBold"
              color={Colors.white}>
              {_.isNil(user.currency_code) ? 'ESP' : user.currency_code}{' '}
              {proposalDetails.invoice.total.value.toFixed(2)}
            </Text>
          </View>

          <View style={[AppStyles.mTop15, AppStyles.mLeft10, {right: 6}]}>
            <Text
              textAlign="center"
              type="semiBold"
              color={Colors.black}
              size={Fonts.size.xxxSmall}>
              {`${strings.ESTIMATE}: ${human(proposalDetails.eta)}`}
            </Text>
          </View>
        </View>
      </View>
      {showCustomTime && (
        <VendorProfileInfo
          isModalOpen={showCustomTime}
          modalType="showCustomTime"
          closeModal={setValue}
          items={Object.entries(proposalDetails.store.timings)}
        />
      )}
    </View>
  );
}
