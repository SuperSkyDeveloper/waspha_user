import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import CountDown from 'react-native-countdown-component';
import {Text, QuantityInput, HTMLView} from '../../components';
import styles from './OrderListingItemStyles';
import {Fonts, Images, AppStyles, Colors, Metrics} from '../../theme';
import {Actions} from 'react-native-router-flux';
import {strings, DATE_FORMAT2} from '../../constants';
import util from '../../util';
import {renderNameStringAndImageRender} from '../../helpers/multilingualHelper';

export default function OrderListingItemView(props) {
  const {item, handleRemoveItem, expiryDuration} = props;
  const value = '<span>unbhjgg<i>g<b>fgnnjn</b></i></span>';
  const itemName = item.category.name.en;
  console.log({itemName});
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View
          style={[
            util.isRTL() ? AppStyles.rowReverse : AppStyles.flexRow,
            styles.header,
          ]}>
          <Text size={Fonts.size.font10} color={Colors.jumbo}>
            {`${item.total_proposals} ${
              item.total_proposals === 1 ? strings.PROPOSAL : strings.PROPOSALS
            }`}
          </Text>
          <Text size={Fonts.size.font10} color={Colors.jumbo}>
            {util.getFormattedDateTime(item.order_date, DATE_FORMAT2)}
          </Text>
        </View>
        <View style={{position: 'absolute', left: 6, top: 37}}>
          <Text
            style={AppStyles.mTop5}
            color={Colors.purple}
            type="semiBold"
            size={Fonts.size.xxxxSmall}>
            {item.type === 'pickup' ? strings.PICK_UP : strings.DELIVERY}
            {/* {_.capitalize(item.type)} */}
          </Text>
        </View>

        {!_.isNil(expiryDuration) && (
          <View style={{marginLeft: 62, marginTop: Metrics.xsmallMargin}}>
            <CountDown
              until={props.expiryDuration}
              //duration of countdown in seconds
              timetoShow={['D', 'H', 'M', 'S']}
              //formate to show
              // onFinish={() => alert('finished')}
              //on Finish call
              digitStyle={{backgroundColor: Colors.red}}
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

                fontSize: 8,
                paddingRight: 4,
              }}
              //on Press call
              size={8}
            />
          </View>
        )}

        <View style={styles.pHorizontal}>
          <View style={styles.imgWrap}>
            <RnImage
              source={{uri: item.category.image}}
              style={styles.prdImg}
            />
          </View>
          <View style={styles.content}>
            {/* <Text
              size={Fonts.size.font14}
              color={Colors.abbey2}
              textAlign="center"
              type="bold">
              {renderNameStringAndImageRender(item.category.name)}
            </Text> */}
            <HTMLView
              htmlContent={renderNameStringAndImageRender(item.category.name)}
              size={Fonts.size.font14}
              color={Colors.abbey2}
              textAlign="center"
              type="bold"
            />
            <View
              style={[
                util.isRTL() ? AppStyles.rowReverse : AppStyles.flexRow,
                styles.codeWrap,
              ]}>
              <Text
                size={Fonts.size.font9}
                color={Colors.dustyGray1}
                textAlign="center"
                type="medium">
                {strings.ORDER_CODE}
                {' : '}
              </Text>
              <Text
                size={Fonts.size.font9}
                color={Colors.shark}
                textAlign="center"
                type="medium">
                {item.id}
              </Text>
            </View>

            <TouchableOpacity
              disabled={item.total_proposals < 1}
              activeOpacity={0.7}
              style={[styles.additionalNote]}
              onPress={() => {
                Actions.proposalList({
                  order: item,
                  category: item.category,
                  fromPastRFP: item.status === 'past',
                });
              }}>
              <HTMLView
                htmlContent={strings.PROPOSAL_DETAIL}
                size={Fonts.size.font11}
                color={Colors.dustyGray1}
                textAlign="center"
                type="semiBold"
              />
              {/* <Text
                style={item.total_proposals < 1 && {opacity: 0.5}}
                size={Fonts.size.font11}
                color={Colors.dustyGray1}
                textAlign="center"
                type="semiBold">
                {strings.PROPOSAL_DETAIL}
              </Text> */}
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.additionalNote}
              onPress={() => {
                Actions.orderDetail({orderId: item.id});
              }}>
              {/* <Text
                textAlign="center"
                size={Fonts.size.font11}
                color={Colors.dustyGray1}
                type="semiBold">
                {strings.ORDER_DETAILS_1}
              </Text> */}
              <HTMLView
                htmlContent={strings.ORDER_DETAILS_1}
                textAlign="center"
                size={Fonts.size.font11}
                color={Colors.dustyGray1}
                type="semiBold"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          handleRemoveItem(item.id, item.type);
        }}
        style={styles.closeWrap}
        activeOpacity={0.9}>
        <RnImage source={Images.CloseIcon} />
      </TouchableOpacity>
    </View>
  );
}
