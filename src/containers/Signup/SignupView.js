import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, TouchableOpacity, Keyboard} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CheckBox from '@react-native-community/checkbox';
import {
  Text,
  TextInput,
  Button,
  SignWithSection,
  ContactInput,
  SelectLanguageModal,
  Loader,
} from '../../components';
import styles from './SignupStyles';
import {Images, Colors, Fonts, AppStyles} from '../../theme';
import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
import {strings} from '../../constants';
import util from '../../util';

export default function SignupView(props) {
  const {
    setValue,
    fullName,
    email,
    password,
    phone,
    retypePwd,
    fullNameError,
    emailError,
    phoneError,
    passwordError,
    retypePwdError,
    handleSubmit,
    passwordFocus,
    retypePwdFocus,
    hidePassword,
    phoneFocus,
    fullNameFocus,
    hideRetypePwd,
    emailFocus,
    termsCheckBox,
    handleAcceptTerms,
    termsError,
    loading,
    selectedCountry,
    selectedCountryError,
    openLangModal,
    handleLanguageModal,
    handleChangeLanguage,
    referralCode,
    referralCodeError,
    referralCodeFocus,
    isLangLoading,
  } = props;

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      //keyboardShouldPersistTaps="always"
    >
      {isLangLoading ? (
        <Loader loading={isLangLoading} />
      ) : (
        <>
          <LinearGradient
            start={{x: 1.5, y: 0}}
            end={{x: 0, y: 0}}
            colors={[Colors.violetRed, Colors.resolutionBlue]}
            style={styles.bgImage}>
            <View style={[styles.loginContent]}>
              <Text color={Colors.white} size={Fonts.size.font27} type="bold">
                {strings.SIGN_UP_NOW}
              </Text>
              <Text color={Colors.white} size={Fonts.size.font10} type="light">
                {strings.FILL_DETALS_AND_CREATE_ACCOUNT}
              </Text>
            </View>
          </LinearGradient>
          <View style={styles.memeSec}>
            <RnImage source={Images.SignupMeme} />
          </View>
          {/* <SignWithSection signup={true} /> */}
          <View style={styles.loginSection}>
            <TextInput
              placeholder={strings.KHALID_ALI}
              textAlign={util.isRTL() ? 'right' : 'left'}
              placeholderTextColor={Colors.grey1}
              inputStyle={AppStyles.inputStyle}
              labelStyle={[AppStyles.labelStyle]}
              label={strings.FULL_NAME.toUpperCase()}
              value={fullName}
              error={fullNameError}
              onChangeText={val => {
                setValue({fullName: val});
              }}
              ref={ref => {
                props.fullNameRef(ref);
              }}
              onSubmitEditing={emailFocus}
            />
            <View style={AppStyles.mTop30}>
              <TextInput
                placeholder={'khalid@yopmail.com'}
                textAlign={util.isRTL() ? 'right' : 'left'}
                placeholderTextColor={Colors.grey1}
                autoCapitalize="none"
                keyboardType={'email-address'}
                inputStyle={AppStyles.inputStyle}
                labelStyle={[AppStyles.labelStyle]}
                label={strings.EMAIL_ID.toUpperCase()}
                value={email}
                error={emailError}
                onChangeText={val => {
                  setValue({email: val});
                }}
                ref={ref => {
                  props.emailRef(ref);
                }}
                onSubmitEditing={passwordFocus}
              />
            </View>
            <View style={AppStyles.mTop30}>
              <TextInput
                placeholder={'********'}
                textAlign={util.isRTL() ? 'right' : 'left'}
                placeholderTextColor={Colors.grey1}
                inputStyle={AppStyles.inputStyle}
                labelStyle={[AppStyles.labelStyle]}
                label={strings.PASSWORD.toUpperCase()}
                secureTextEntry={hidePassword}
                value={password}
                error={passwordError}
                onChangeText={val => {
                  setValue({password: val});
                }}
                ref={ref => {
                  props.passRef(ref);
                }}
                onSubmitEditing={retypePwdFocus}
              />
              <TouchableOpacity
                style={[
                  styles.showPwsdWrap,
                  util.isRTL()
                    ? {top: 6}
                    : {top: util.isPlatformAndroid() ? 26 : 19, right: 0},
                ]}
                onPress={() => {
                  setValue({hidePassword: !hidePassword});
                }}>
                <RnImage
                  source={
                    hidePassword
                      ? Images.ViewPasswordIcon
                      : Images.HidePasswordIcon
                  }
                  style={styles.ViewPasswordIcon}
                />
              </TouchableOpacity>
            </View>
            <View style={AppStyles.mTop30}>
              <View>
                <TextInput
                  placeholder={'********'}
                  textAlign={util.isRTL() ? 'right' : 'left'}
                  placeholderTextColor={Colors.grey1}
                  inputStyle={AppStyles.inputStyle}
                  labelStyle={[AppStyles.labelStyle]}
                  label={strings.RETYPE_PASSWORD.toUpperCase()}
                  secureTextEntry={hideRetypePwd}
                  value={retypePwd}
                  error={retypePwdError}
                  onChangeText={val => {
                    setValue({retypePwd: val});
                  }}
                  ref={ref => {
                    props.retypePwdRef(ref);
                  }}
                  onSubmitEditing={referralCodeFocus}
                />
                <TouchableOpacity
                  style={[
                    styles.showPwsdWrap,
                    util.isRTL()
                      ? {top: 6}
                      : {top: util.isPlatformAndroid() ? 26 : 19, right: 0},
                  ]}
                  onPress={() => {
                    setValue({hideRetypePwd: !hideRetypePwd});
                  }}>
                  <RnImage
                    source={
                      hideRetypePwd
                        ? Images.ViewPasswordIcon
                        : Images.HidePasswordIcon
                    }
                    style={styles.ViewPasswordIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {false && (
              <View style={AppStyles.mTop30}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    Keyboard.dismiss();
                    Actions.selectCountry({
                      setValue,
                      countrySelected: selectedCountry,
                    });
                  }}>
                  <TextInput
                    editable={false}
                    textAlign={util.isRTL() ? 'right' : 'left'}
                    placeholder={strings.PLEASE_SELECT_COUNTRY}
                    placeholderTextColor={Colors.grey1}
                    inputStyle={AppStyles.inputStyle}
                    labelStyle={[AppStyles.labelStyle]}
                    label={strings.SELECT_COUNTRY.toUpperCase()}
                    value={
                      !_.isEmpty(selectedCountry) &&
                      (util.isRTL()
                        ? selectedCountry.name.ar
                        : selectedCountry.name.en)
                    }
                    error={selectedCountryError}

                    // onSubmitEditing={phoneFocus}
                  />
                </TouchableOpacity>
              </View>
            )}

            <View style={AppStyles.mTop30}>
              <ContactInput
                onNumberChange={(val, ref) => {
                  props.setPhone(val.phone_number, val.isNumberValid, val);
                }}
                error={phoneError}
              />
            </View>
            <View style={AppStyles.mTop30}>
              <TextInput
                placeholder={'ABC1234'}
                textAlign={util.isRTL() ? 'right' : 'left'}
                placeholderTextColor={Colors.grey1}
                autoCapitalize="none"
                keyboardType={'email-address'}
                inputStyle={AppStyles.inputStyle}
                labelStyle={[AppStyles.labelStyle]}
                label={'Referral Code'}
                value={referralCode}
                error={referralCodeError}
                onChangeText={val => {
                  setValue({referralCode: val});
                }}
                ref={ref => {
                  props.referralCodeRef(ref);
                }}
              />
            </View>
          </View>
          <View style={styles.termsSec}>
            <View
              style={[
                util.isRTL() ? AppStyles.rowReverse : AppStyles.flexRow,
                styles.termWrap,
              ]}>
              <CheckBox
                disabled={false}
                lineWidth={true}
                value={termsCheckBox}
                onValueChange={val => handleAcceptTerms(val)}
              />

              <Text
                style={[AppStyles.mLeft5, AppStyles.mRight5]}
                size={Fonts.size.font11}
                color={Colors.grey7}>
                {strings.BY_CONTINUING_I_CONFIRM_THAT_HAVE_READ_AGREE_TO_THE}
              </Text>
            </View>
            <View style={[AppStyles.flexRow, AppStyles.mTop10]}>
              <TouchableOpacity onPress={() => Actions.termsAndConditions()}>
                <Text size={Fonts.size.font11} color={Colors.blueRibbon}>
                  {strings.TERMS_CONDITIONS}
                </Text>
              </TouchableOpacity>
              <Text size={Fonts.size.font11} color={Colors.grey7}>
                {' '}
                {strings.AND}{' '}
              </Text>
              <TouchableOpacity onPress={() => Actions.privacyPolicy()}>
                <Text size={Fonts.size.font11} color={Colors.blueRibbon}>
                  {strings.PRIVACY_POLICY}
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              type="medium"
              size={Fonts.size.font12}
              color={Colors.red}
              style={[AppStyles.mTop10, AppStyles.mBottom5]}>
              {termsError}
            </Text>
          </View>
          <View style={[styles.loginBtnWrap, styles.paddingHr]}>
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
                {strings.SIGNUP}
              </Button>
            </LinearGradient>
          </View>
          <View
            style={[styles.signupSec, util.isRTL() && AppStyles.rowReverse]}>
            <Text size={Fonts.size.font13}>
              {`${strings.ALREADY_HAVE_ACCOUNT} ${util.isRTL() ? '؟ ' : '? '}`}
            </Text>
            <TouchableOpacity
              onPress={() => {
                Actions.reset('login');
              }}>
              <Text size={Fonts.size.font13} color={Colors.blueRibbon}>
                {strings.LOGIN}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.loginBtnWrap, styles.paddingHr]}>
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
                onPress={() => handleLanguageModal()}
                indicatorColor={Colors.white}
                type="semiBold">
                {strings.LANGUAGE}
              </Button>
            </LinearGradient>
          </View>
        </>
      )}

      {openLangModal && (
        <SelectLanguageModal
          isModalOpen={openLangModal}
          closeModal={setValue}
          modalType="openLangModal"
          handleLangSelect={handleChangeLanguage}
        />
      )}
    </KeyboardAwareScrollView>
  );
}
