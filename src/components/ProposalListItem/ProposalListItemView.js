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
import styles from './ProposalListItemStyles';
import {Fonts, Colors, Images, AppStyles} from '../../theme';
import {Actions} from 'react-native-router-flux';
import util from '../../util';
import {DATE_FORMAT2, TIME_FORMAT3, strings} from '../../constants';
import {getTimeDiff} from '../../helpers/generalHelper';
import CountDown from 'react-native-countdown-component';
import {renderNameStringAndImageRender} from '../../helpers/multilingualHelper';

export default function ProposalListItemView(props) {
  const {
    item,
    isFirstItem,
    showCustomTime,
    setValue,
    fromPastRFP,
    expiryDuration,
    user,
  } = props;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[
        styles.container,
        isFirstItem && util.isRTL() ? AppStyles.mRight10 : AppStyles.mLeft10,
      ]}
      onPress={() => {
        Actions.proposalDetail({
          proposalId: item.proposal_id,
          disableButtons:
            item.status === 'accepted' ||
            item.status === 'rejected' ||
            item.status === 'expired' ||
            fromPastRFP,

          fromPastRFP: fromPastRFP,
        });
      }}>
      <View style={{alignItems: 'flex-start', top: -19, right: 10}}>
        {!_.isNil(expiryDuration) &&
        !fromPastRFP &&
        item.status === 'pending' &&
        !item.is_revised ? (
          <View style={{marginLeft: 62}}>
            <CountDown
              until={props.expiryDuration}
              //duration of countdown in seconds
              timetoShow={['D', 'H', 'M', 'S']}
              //formate to show
              // onFinish={() => alert('finished')}
              //on Finish call
              digitStyle={{
                backgroundColor: Colors.red,
              }}
              digitTxtStyle={{color: Colors.white}}
              timeLabels={{
                d: 'Days',
                h: 'Hours',
                m: 'Mins',
                s: 'Secs',
              }}
              timeLabelStyle={{
                color: Colors.red,
                fontWeight: 'bold',

                fontSize: 10,
                paddingLeft: 6,
              }}
              //on Press call
              size={10}
            />
          </View>
        ) : (
          <View style={{height: 43}} />
        )}
      </View>

      {item.is_read === true && (
        <View
          style={
            util.isRTL()
              ? {alignItems: 'flex-start', top: -15}
              : {alignItems: 'flex-end', top: -15}
          }>
          <RnImage
            source={Images.ProposalReadIcon}
            style={{width: 20, height: 20}}
          />
        </View>
      )}
      <View
        style={[
          util.isRTL() ? AppStyles.rowReverse : AppStyles.flexRow,
          styles.row,
        ]}>
        {/* <Text color={Colors.jumbo} size={Fonts.size.font13} type="semiBold">
          {renderNameStringAndImageRender(item.store.name)}
        </Text> */}
        <HTMLView
          htmlContent={renderNameStringAndImageRender(item.store.name)}
          color={Colors.jumbo}
          size={Fonts.size.font13}
          type="semiBold"
        />
        <Text color={Colors.jumbo} size={Fonts.size.font10} type="semiBold">
          {getTimeDiff(item.order_date)}
        </Text>
      </View>
      <View
        style={[
          util.isRTL() ? {alignItems: 'flex-start'} : {alignItems: 'flex-end'},
          styles.dateSec,
        ]}>
        <DateItem
          date={util.getFormattedDateTime(item.order_date, DATE_FORMAT2)}
        />
      </View>
      <View>
        <View
          style={[
            util.isRTL() && AppStyles.alignItemsFlexEnd,
            AppStyles.mBottom50,
          ]}>
          <View style={_.isNil(item.store.image) && styles.storeImgWrap}>
            <RnImage
              source={
                _.isNil(item.store.image)
                  ? Images.StoreIcon
                  : {uri: item.store.image}
              }
              style={styles.storeImg}
            />
          </View>
        </View>
        {/* <Text
          size={Fonts.size.font20}
          type="semiBold"
          style={util.isRTL() && {textAlign: 'right'}}
          color={Colors.shark}>
          {renderNameStringAndImageRender(item.store.name)}
        </Text> */}

        <HTMLView
          htmlContent={renderNameStringAndImageRender(item.store.name)}
          size={Fonts.size.font20}
          type="semiBold"
          style={util.isRTL() && {textAlign: 'right'}}
          color={Colors.shark}
        />
        <View
          style={[styles.ratingWrp, util.isRTL() && {alignSelf: 'flex-end'}]}>
          {/* <Rating
            isDisabled={true}
            ratingCount={5}
            imageSize={15}
            readonly={true}
            startingValue={item.store.avg_rating}
          /> */}

          <StarRating
            initialRating={item.store.avg_rating}
            readonly={true}
            imageSize={15}
          />
        </View>
        <View style={styles.detailSec}>
          <View style={util.isRTL() && {alignItems: 'flex-end', width: '100%'}}>
            <Text
              style={styles.mTop}
              color={Colors.santasGray}
              size={Fonts.size.font10}
              type="medium">
              {item.store.distance} {strings.KM} {strings.AWAY}
            </Text>

            <View
              style={[
                {
                  height: 40,
                  marginTop: 10,
                },
              ]}>
              {!_.isString(item.store.timings) &&
                !_.isUndefined(item.store.timings) && (
                  <>
                    <TouchableOpacity
                      style={{paddingVertical: 10, top: -8}}
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
                          items={Object.entries(item.store.timings)}
                        />
                      )}
                    </View> */}
                  </>
                )}

              {_.isString(item.store.timings) && (
                <Text
                  size={Fonts.size.xxxSmall}
                  color={Colors.santasGray}
                  type="medium">
                  {strings.FULL_TIME}
                </Text>
              )}
            </View>

            <View
              style={util.isRTL() ? AppStyles.rowReverse : AppStyles.flexRow}>
              <Text
                style={styles.mTop}
                color={Colors.santasGray}
                size={Fonts.size.font10}
                type="medium">
                {strings.ORDER_TYPE}
                {' : '}
              </Text>
              <Text
                style={styles.mTop}
                color={Colors.santasGray}
                size={Fonts.size.font10}
                type="medium">
                {item.type}
              </Text>
            </View>
            {/* <RnImage source={Images.CreditCard} style={styles.cardImg} /> */}
          </View>
          <View style={util.isRTL() && {position: 'absolute', left: 0}}>
            {/* <View style={styles.totalWrap} /> */}

            <View style={[AppStyles.flexRow, {top: 30, right: 15}]}>
              <Text
                size={Fonts.size.font24}
                color={Colors.trout}
                type="semiBold">
                {_.isNil(user.currency_code) ? 'ESP' : user.currency_code}{' '}
              </Text>

              <Text
                size={Fonts.size.font24}
                color={Colors.purple}
                type="semiBold">
                {item.total.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </View>
      {showCustomTime && (
        <VendorProfileInfo
          isModalOpen={showCustomTime}
          modalType="showCustomTime"
          closeModal={setValue}
          items={Object.entries(item.store.timings)}
        />
      )}
    </TouchableOpacity>
  );
}
