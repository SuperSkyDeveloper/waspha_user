import React from 'react';
import _ from 'lodash';
import {
  View,
  Image as RnImage,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import Dash from 'react-native-dash';
import {Actions} from 'react-native-router-flux';
import {
  Text,
  CustomNavbar,
  Maps,
  RemoveItemModal,
  Loader,
} from '../../components';
import styles from './OrderPlaceNearbyVendorsStyles';
import {Colors, Images, Fonts, Metrics} from '../../theme';
import {strings, TIME_FORMAT1, DATE_TIME} from '../../constants';
import {GetCurrentTimeInISO, ISOToFormat} from '../../helpers/generalHelper';
import util from '../../util';
export default function OrderPlaceNearbyVendorsView(props) {
  const {
    onBackPress,
    rfpId,
    scheduledTime,
    rfpVendorslist,
    queueVendors,
    isParticularStore,
    noVendorsFound,
    noVendorsHere,
    setValue,
    fakeOrder,
    orderType,
  } = props;
  return (
    <View style={styles.container}>
      <CustomNavbar
        hasBack={true}
        leftBtnPress={onBackPress}
        title={strings.ORDER_PLACEMENT}
        titleColor={Colors.white}
      />

      {!isParticularStore && _.isEmpty(queueVendors) && !noVendorsHere && (
        <View style={styles.loaderStyle}>
          <RnImage style={{width: 60, height: 60}} source={Images.preloader} />
        </View>
      )}

      <Maps
        rfpVendors={rfpVendorslist}
        isDirection={true}
        showLoader={isParticularStore}
      />

      {!(!isParticularStore && _.isEmpty(queueVendors) && !noVendorsHere) && (
        <TouchableOpacity
          onPress={() => {
            Actions.replace('orderAndProposal');
          }}
          style={styles.orderProposalPicWrap}>
          <RnImage
            source={Images.OrderAndProposalPic}
            style={{width: 50, height: 50}}
          />
        </TouchableOpacity>
      )}
      <ImageBackground source={Images.ProviderCard} style={styles.timerSecWrap}>
        <View
          style={[
            util.isRTL() ? {marginRight: 30} : {paddingLeft: 58},
            styles.timeSecContent,
          ]}>
          <View>
            <Text
              type="bold"
              style={[
                styles.connectedToText,
                util.isRTL() && {textAlign: 'right'},
              ]}>
              {!isParticularStore
                ? `${strings.YOU_ARE_CONNECTED_TO} ${rfpVendorslist.length} ${
                    strings.PROVIDERS
                  }`
                : strings.WAITING_FOR_VENDORS_RESPONSE}
            </Text>
          </View>

          <View>
            <Text
              type="bold"
              style={[
                styles.orderplaceTimeText,
                util.isRTL() && {textAlign: 'right'},
              ]}>
              {strings.ORDER_PLACEMENT_TIME}
            </Text>
          </View>

          <View style={styles.timeStyleWrap}>
            <Text
              type="semiBold"
              style={[styles.timeStyle, util.isRTL() && {textAlign: 'right'}]}>
              {ISOToFormat(GetCurrentTimeInISO(), TIME_FORMAT1)}
            </Text>
          </View>
          {!_.isEmpty(scheduledTime) && (
            <View>
              <View>
                <Text
                  size={9}
                  color={Colors.grey1}
                  type="bold"
                  style={util.isRTL() && {textAlign: 'right'}}>
                  {strings.SCHEDULED_DELIVERY_TIME}
                </Text>
              </View>

              <View style={styles.timeStyleWrap}>
                <Text
                  type="semiBold"
                  style={[
                    styles.timeStyle,
                    util.isRTL() && {textAlign: 'right'},
                  ]}>
                  {ISOToFormat(scheduledTime, DATE_TIME)}
                </Text>
              </View>
            </View>
          )}
        </View>
      </ImageBackground>
      <View style={{zIndex: 99999}}>
        <View style={{marginHorizontal: 20, backgroundColor: Colors.white}}>
          <Dash
            style={{width: '70%', height: 2}}
            dashGap={8}
            dashColor={Colors.dustyGray1}
            dashLength={20}
            style={[styles.line]}
          />
        </View>
        <View style={styles.cancelWrap}>
          <TouchableOpacity
            onPress={() => {
              Actions.cancelorder({rfpId, orderType});
            }}>
            <Text type="bold" style={styles.cancelTextStyle}>
              {strings.CANCEL}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {noVendorsFound && (
        <RemoveItemModal
          title={fakeOrder ? strings.FAKE_ORDER : strings.NO_VENDORS_FOUND_NEAR}
          isModalOpen={noVendorsFound}
          showOneBtn={true}
          btnNegativeFunc={() => {
            setValue({noVendorsFound: false});
            Actions.pop();
          }}
          backPress={true}
          btnTwoText={strings.OK}
          closeModal={setValue}
          modalType="noVendorsFound"
        />
      )}
    </View>
  );
}
