import React from 'react';
import _ from 'lodash';
import {
  View,
  Image as RnImage,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import CountDown from 'react-native-countdown-component';
import CodeInput from 'react-native-confirmation-code-input';
import Spinner from 'react-native-loading-spinner-overlay';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import {Actions} from 'react-native-router-flux';
import {
  Text,
  SignHeader,
  Button,
  TextInput,
  ContactInput,
  Loader,
} from '../../components';
import styles from './VerificationCodeStyles';
import {Images, Colors, Fonts, AppStyles, Metrics} from '../../theme';

import {strings} from '../../constants';
import util from '../../util';

export default function VerificationCodeView(props) {
  const {
    incomingOTP,
    setValue,
    otpCode,
    handleSubmit,
    otpCodeError,
    handleModal,
    editModalVisible,
    phone,
    phoneNumError,
    number,
    fromSignUp,
    loading,
    incomingData,
    loadingOTP,
    handleResetOTP,
    handleEditNumber,
    userSignUpCredentials,
    dataFromForgotPassword,
    dataFromProfile,
    fromProfile,
    disableResendOTP,
    resetCountdownId,
  } = props;
  return (
    <>
      {/* <Spinner visible={loadingOTP} color={Colors.green} /> */}
      <Loader loading={loadingOTP} />
      <KeyboardAwareScrollView
        //keyboardShouldPersistTaps="always"
        style={styles.container}
        showsVerticalScrollIndicator={false}>
        <SignHeader
          title={fromSignUp ? strings.ACCOUNT : strings.PASSWORD}
          subTitle={fromSignUp ? strings.VERIFICATION : strings.RECOVERY}
          mainHeading={strings.ENTER_VERIFICATION_CODE}
        />
        <View style={styles.wrap}>
          <View style={AppStyles.mBottom20}>
            <View
              style={
                !_.isEmpty(dataFromForgotPassword) &&
                _.isNil(dataFromForgotPassword.user_id.country_code) &&
                !fromSignUp
                  ? {}
                  : AppStyles.flexRow
              }>
              <Text
                style={util.isRTL() && {position: 'absolute', right: -35}}
                size={Fonts.size.font12}
                color={Colors.black}
                type="medium">
                {strings.VERIFICATION_CODE_SEND_ON}
                {'   '}
              </Text>

              {fromProfile && (
                <Text size={Fonts.size.font12} color={Colors.black} type="bold">
                  {!_.isNil(dataFromProfile.user_id.country_code)
                    ? `${dataFromProfile.user_id.country_code} ${
                        dataFromProfile.user_id.number
                      }`
                    : dataFromProfile.user_id}
                </Text>
              )}

              <Text size={Fonts.size.font12} color={Colors.black} type="bold">
                {fromSignUp
                  ? `${userSignUpCredentials.contact.country_code} ${
                      userSignUpCredentials.contact.number
                    } `
                  : !_.isEmpty(dataFromForgotPassword) &&
                    dataFromForgotPassword.user_id.country_code &&
                    `${dataFromForgotPassword.user_id.country_code} ${
                      dataFromForgotPassword.user_id.number
                    }`}
              </Text>
              {!_.isEmpty(dataFromForgotPassword) &&
                _.isNil(dataFromForgotPassword.user_id.country_code) &&
                !fromSignUp && (
                  <Text
                    style={{top: -7}}
                    size={Fonts.size.font12}
                    color={Colors.black}
                    type="bold">
                    {dataFromForgotPassword.user_id}
                  </Text>
                )}
            </View>
            <View
              style={
                !_.isEmpty(dataFromForgotPassword) &&
                _.isNil(dataFromForgotPassword.user_id.country_code) &&
                !fromSignUp
                  ? {alignItems: 'flex-start'}
                  : {alignItems: 'flex-end'}
              }>
              {fromSignUp && (
                <TouchableOpacity
                  style={[styles.size]}
                  onPress={
                    fromSignUp
                      ? handleModal
                      : () => {
                          Actions.pop();
                        }
                  }>
                  <Text
                    style={
                      util.isRTL() && {
                        textAlign: 'right',
                      }
                    }
                    size={Fonts.size.font12}
                    color={Colors.resolutionBlue}
                    type="semiBold">
                    {strings.EDIT}
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <Modal
              isVisible={editModalVisible}
              onBackButtonPress={handleModal}
              onBackdropPress={handleModal}
              backdropOpacity={0.8}
              backdropColor={Colors.black}>
              <View style={styles.modalWrap}>
                <View>
                  <ContactInput
                    onNumberChange={(val, ref) => {
                      props.setPhone(val.phone_number, val.isNumberValid, val);
                    }}
                    error={phoneNumError}
                  />
                </View>
                <View style={[AppStyles.flexRow, {alignSelf: 'flex-end'}]}>
                  <TouchableOpacity
                    style={[
                      AppStyles.mTop15,
                      AppStyles.alignItemsFlexEnd,
                      AppStyles.mRight15,
                    ]}
                    onPress={handleEditNumber}>
                    <Text
                      size={Fonts.size.font12}
                      color={Colors.resolutionBlue}
                      type="bold">
                      {strings.DONE}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[AppStyles.mTop15, AppStyles.alignItemsFlexEnd]}
                    onPress={handleModal}>
                    <Text
                      size={Fonts.size.font12}
                      color={Colors.resolutionBlue}
                      type="bold">
                      {strings.CANCEL}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>

          <Text
            size={Fonts.size.font14}
            style={[
              util.isRTL() && {textAlign: 'right', right: -28},
              styles.enterCodeStyle,
            ]}
            color={Colors.black}
            type="semiBold">
            {strings.ENTER_CODE}
          </Text>
          <CodeInput
            ref={ref => {
              props.otpRef(ref);
            }}
            className={'border-b'}
            space={10}
            codeLength={4}
            size={60}
            inactiveColor={Colors.alto}
            activeColor={Colors.grey2}
            inputPosition="left"
            autoFocus={true}
            cellBorderWidth={1}
            codeInputStyle={styles.square}
            // containerStyle={{alignSelf: 'center'}}
            keyboardType="numeric"
            onFulfill={data => setValue({otpCode: data})}
          />
          <Text
            type="medium"
            size={Fonts.size.font12}
            color={Colors.red}
            style={[AppStyles.mTop5, AppStyles.mBottom5]}>
            {otpCodeError}
          </Text>
          <View
            style={[
              util.isRTL() ? AppStyles.rowReverse : AppStyles.flexRow,
              styles.resendWrap,
            ]}>
            {!disableResendOTP && (
              <TouchableOpacity
                // style={util.isRTL() ? {left: 70} : {right: -26}}
                disabled={disableResendOTP}
                onPress={() => handleResetOTP()}>
                <Text
                  type="semiBold"
                  size={Fonts.size.font12}
                  color={Colors.riverBed}
                  style={[
                    AppStyles.mTop5,
                    AppStyles.mBottom5,
                    disableResendOTP && {opacity: 0.3},
                  ]}>
                  {strings.RESEND_OTP}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View
            style={
              // util.isRTL()
              //   ? {right: 30}
              //   : {flex: 1, alignSelf: 'center', left: -37}
              {
                flex: 1,
                alignSelf: 'center',
                top: 20,
                backgroundColor: Colors.purple,
                borderRadius: 100,
              }
            }>
            <CountDown
              id={resetCountdownId}
              until={props.otpExpireTime}
              // until={'2021-01-19T07:57:48.000Z'}
              //duration of countdown in seconds
              timeToShow={['S']}
              //formate to show
              onFinish={() => setValue({disableResendOTP: false})}
              //on Finish call e
              digitStyle={{}}
              digitTxtStyle={{color: Colors.white}}
              timeLabels={{
                // d: 'Days',
                // h: 'Hours',
                // m: 'Mins',
                s: '',
              }}
              timeLabelStyle={{
                color: Colors.red,
                fontWeight: 'bold',

                fontSize: 12,
              }}
              //on Press call
              size={26}
            />
          </View>
        </View>
        <View style={[styles.loginBtnWrap]}>
          <LinearGradient
            start={{x: 0.3, y: 2}}
            end={{x: 1, y: 0}}
            colors={[Colors.resolutionBlue, Colors.violetRed]}
            style={styles.gradBtn}>
            <Button
              color={Colors.white}
              background={Colors.transparent}
              style={styles.loginBtn}
              size={Fonts.size.font17}
              onPress={handleSubmit}
              isLoading={loading}
              indicatorColor={Colors.white}
              disabled={loading}
              type="semiBold">
              {strings.CONTINUE}
            </Button>
          </LinearGradient>
          <RnImage source={Images.Mask1} style={styles.mask2} />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
