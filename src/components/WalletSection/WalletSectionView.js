import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {Text, TextInput} from '../../components';
import styles from './WalletSectionStyles';
import {Images, AppStyles, Fonts, Colors} from '../../theme';
import {strings, PAYMENT_TYPE, RIDER_TYPE} from '../../constants';
import Dash from 'react-native-dash';
import Button from '../Button';
import util from '../../util';

export default function WalletSectionView(props) {
  const {
    selectedMethod,
    handleMethod,
    moneyInWallet,
    showWallet,
    user,
    handlePromoCode,
    enteredPromoCode,
    enteredPromoCodeError,
    setValue,
    selectedPromoCode,
    onRemovePromoCode,
    proposalDetails,
  } = props;
  return (
    <View style={styles.container}>
      {proposalDetails.delivery_mode !== RIDER_TYPE.WASPHA_EXPRESS && (
        <TouchableOpacity
          disabled={!showWallet}
          onPress={() => handleMethod(PAYMENT_TYPE.WALLET)}
          style={[
            util.isRTL() ? AppStyles.rowReverse : AppStyles.flexRow,
            styles.headingWrap,
          ]}>
          {selectedMethod === PAYMENT_TYPE.WALLET ? (
            <TouchableOpacity
              style={[
                styles.radioBtnWrap,
                util.isRTL() ? {marginLeft: 4} : {marginRight: 3},
              ]}>
              <View style={[styles.activeRadioBtn]} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity>
              <View
                style={[
                  styles.radioBtn,
                  util.isRTL() ? {marginLeft: 4} : {marginRight: 3},
                ]}
              />
            </TouchableOpacity>
          )}

          <Text
            size={Fonts.size.font14}
            color={Colors.resolutionBlue}
            type="semiBold"
            style={!showWallet && {opacity: 0.4}}>
            {strings.YOUR_USING_WASPHA_WALLET}
          </Text>
        </TouchableOpacity>
      )}
      {!showWallet && (
        <View
          style={[
            {top: -10},
            util.isRTL()
              ? {alignItems: 'flex-end', marginRight: 60}
              : {marginLeft: 55},
          ]}>
          <Text numberofLines={2} size={Fonts.size.xxxSmall}>
            {strings.NOT_ENOUGH_AMOUNT_IN_WALLET}
          </Text>
        </View>
      )}
      <TouchableOpacity
        onPress={() => handleMethod(PAYMENT_TYPE.CASH_ON_DELIVERY)}
        style={[
          util.isRTL() ? AppStyles.rowReverse : AppStyles.flexRow,
          styles.headingWrap,
        ]}>
        {selectedMethod === PAYMENT_TYPE.CASH_ON_DELIVERY ? (
          <TouchableOpacity
            style={[
              styles.radioBtnWrap,
              util.isRTL() ? {marginLeft: 4} : {marginRight: 3},
            ]}>
            <View style={[styles.activeRadioBtn]} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <View
              style={[
                styles.radioBtn,
                util.isRTL() ? {marginLeft: 4} : {marginRight: 3},
              ]}
            />
          </TouchableOpacity>
        )}
        <Text
          size={Fonts.size.font14}
          color={Colors.resolutionBlue}
          type="semiBold">
          {strings.YOUR_USING_CASH_ON_DELIVERY}
        </Text>
      </TouchableOpacity>
      {proposalDetails.delivery_mode !== RIDER_TYPE.WASPHA_EXPRESS && (
        <TouchableOpacity
          onPress={() => handleMethod(PAYMENT_TYPE.CREDIT_CARD)}
          style={[
            util.isRTL() ? AppStyles.rowReverse : AppStyles.flexRow,
            styles.headingWrap,
          ]}>
          {selectedMethod === PAYMENT_TYPE.CREDIT_CARD ? (
            <TouchableOpacity
              style={[
                styles.radioBtnWrap,
                util.isRTL() ? {marginLeft: 4} : {marginRight: 3},
              ]}>
              <View style={[styles.activeRadioBtn]} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity>
              <View
                style={[
                  styles.radioBtn,
                  util.isRTL() ? {marginLeft: 4} : {marginRight: 3},
                ]}
              />
            </TouchableOpacity>
          )}
          <Text
            size={Fonts.size.font14}
            color={Colors.resolutionBlue}
            type="semiBold">
            {strings.CREDIT_CARD}
          </Text>
        </TouchableOpacity>
      )}
      <View style={styles.walletSec}>
        {showWallet && selectedMethod === PAYMENT_TYPE.WALLET && (
          <>
            <View style={styles.pHorizontal}>
              <Text
                style={util.isRTL() && {textAlign: 'right', right: -20}}
                size={Fonts.size.font14}
                color={Colors.grey2}
                type="semiBold">
                {strings.WASPHA_WALLET}
              </Text>
              <View style={[AppStyles.alignItemsCenter, AppStyles.mTop15]}>
                <RnImage source={Images.WalletIcon02} />
                <View style={AppStyles.flexRow}>
                  <Text
                    size={Fonts.size.font21}
                    color={Colors.grey2}
                    type="semiBold">
                    {_.isNil(user.currency_code) ? 'ESP' : user.currency_code}{' '}
                  </Text>
                  <Text
                    size={Fonts.size.font45}
                    color={Colors.eminence}
                    type="medium">
                    {moneyInWallet.toFixed(2)}
                  </Text>
                </View>
              </View>
              {/* <View style={styles.rightCircle} /> */}
              {/* <View style={styles.circle} /> */}
            </View>

            <Dash
              style={{width: '100%', height: 1}}
              dashGap={5}
              dashColor={Colors.grey3}
              dashLength={12}
              style={[styles.line]}
            />
          </>
        )}

        <View style={[{marginTop: 5, marginBottom: 8}, styles.pHorizontal]}>
          {/* <TouchableOpacity
            style={[styles.qrImg, util.isRTL() && {left: 15, top: -5}]}>
            <RnImage source={Images.QrCode} />
          </TouchableOpacity> */}
          <TextInput
            textAlign={util.isRTL() ? 'right' : 'left'}
            placeholder={strings.ENTER_OR_SELECT_COUPON}
            inputStyle={[AppStyles.inputStyle, {marginTop: 10}]}
            labelStyle={[AppStyles.labelStyle]}
            label={strings.ADD_COUPON}
            value={enteredPromoCode}
            error={enteredPromoCodeError}
            onChangeText={val => {
              setValue({enteredPromoCode: val});
            }}
          />
        </View>

        {!_.isNil(selectedPromoCode) && (
          <TouchableOpacity
            onPress={onRemovePromoCode}
            style={styles.removePromoWrap}>
            <Text
              size={Fonts.size.xxSmall}
              type="semiBold"
              color={Colors.blue3}
              style={{
                textDecorationLine: 'underline',
                textDecorationColor: Colors.blue3,
              }}>
              {strings.REMOVE_PROMO_CODE}
            </Text>
          </TouchableOpacity>
        )}

        <View style={styles.btnWrap}>
          <Button
            onPress={handlePromoCode}
            color={Colors.white}
            background={Colors.resolutionBlue}
            style={[AppStyles.btnStyle1, AppStyles.shadow5]}
            size={Fonts.size.font17}
            isLoading={false}
            indicatorColor={Colors.white}
            disabled={false}
            type="bold">
            {strings.APPLY}
          </Button>
        </View>
      </View>
    </View>
  );
}
