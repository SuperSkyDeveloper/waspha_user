import React from 'react';
import {
  View,
  Image as RnImage,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  Text,
  TextInput,
  Button,
  SelectLanguageModal,
  SignWithSection,
} from '../../components';
import styles from './LoginStyles';
import {Images, Colors, Fonts, AppStyles} from '../../theme';
import {Actions} from 'react-native-router-flux';
import {LOGIN_PLACEHOLDER, strings} from '../../constants';
import util from '../../util';

export default function LoginView(props) {
  const {
    setValue,
    userId,
    password,
    userIdError,
    passwordError,
    handleSubmit,
    passwordFocus,
    hidePassword,
    handleShowPassword,
    stayLogged,
    handleStayLogged,
    loading,
    openLangModal,
    handleLanguageModal,
    handleChangeLanguage,
  } = props;
  return (
    <KeyboardAwareScrollView
      // //keyboardShouldPersistTaps="always"
      style={styles.container}
      showsVerticalScrollIndicator={false}>
      <ImageBackground source={Images.LoginBg} style={styles.bgImage}>
        <View style={[styles.loginContent]}>
          <Text
            style={util.isRTL() && {textAlign: 'right'}}
            color={Colors.white}
            size={Fonts.size.font18}>
            {strings.WE_ARE}
          </Text>
          <Text
            color={Colors.white}
            size={Fonts.size.font47}
            style={[
              AppStyles.lHeight55,
              util.isRTL() && {
                textAlign: 'right',
                right: 10,
              },
            ]}>
            {strings.WASPHA}
          </Text>
          <Text
            color={Colors.white}
            size={Fonts.size.font16}
            type="light"
            style={[AppStyles.mTop15, util.isRTL() && {textAlign: 'right'}]}>
            {strings.WELCOME_PLEASE_LOGIN_TO_YOUR_ACCOUNT}
          </Text>
        </View>
      </ImageBackground>
      {/* <SignWithSection login={true} /> */}
      <View style={styles.loginSection}>
        <RnImage source={Images.Mask3} style={styles.mask3} />
        <TextInput
          autoFocus
          placeholder={LOGIN_PLACEHOLDER}
          textAlign={util.isRTL() ? 'right' : 'left'}
          placeholderTextColor={Colors.grey1}
          inputStyle={[AppStyles.inputStyle]}
          labelImg={Images.IdCardIcon}
          autoCapitalize="none"
          labelStyle={[AppStyles.labelStyle, {right: util.isRTL() ? 20 : 0}]}
          label={strings.MOBILE_EMAIL}
          labelImgStyle={[
            AppStyles.labelImgStyle,
            util.isRTL() && {position: 'absolute', right: -6, top: -16},
          ]}
          value={userId}
          error={userIdError}
          onChangeText={val => {
            setValue({userId: val});
          }}
          ref={ref => {
            props.userIdRef(ref);
          }}
          onSubmitEditing={passwordFocus}
        />
        <View style={AppStyles.mTop30}>
          <View>
            <TextInput
              placeholder={'********'}
              placeholderTextColor={Colors.grey1}
              textAlign={util.isRTL() ? 'right' : 'left'}
              inputStyle={AppStyles.inputStyle}
              labelImg={Images.LockIcon}
              labelStyle={[
                AppStyles.labelStyle,
                {right: util.isRTL() ? 20 : 0},
              ]}
              label={strings.PASSWORD}
              labelImgStyle={[
                AppStyles.labelImgStyle,

                util.isRTL() && {position: 'absolute', right: -7, top: -16},
              ]}
              secureTextEntry={hidePassword}
              value={password}
              error={passwordError}
              onChangeText={val => {
                setValue({password: val});
              }}
              ref={ref => {
                props.passRef(ref);
              }}
              onSubmitEditing={handleSubmit}
            />
            <TouchableOpacity
              style={[
                styles.showPwsdWrap,
                util.isRTL()
                  ? {top: 6}
                  : {top: util.isPlatformAndroid() ? 26 : 19, right: 0},
              ]}
              onPress={handleShowPassword}>
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
          <View
            style={[
              styles.forgetWrap,
              util.isRTL() ? AppStyles.rowReverse : AppStyles.flexRow,
            ]}>
            <TouchableOpacity
              style={[
                styles.forgetPwd,
                util.isRTL() && AppStyles.rowReverse,
                util.isRTL() && {alignItems: 'flex-end'},
              ]}
              onPress={handleStayLogged}>
              {stayLogged ? (
                <RnImage
                  style={[AppStyles.mRight5, util.isRTL() && {marginLeft: 6}]}
                  source={Images.RememberIcon}
                />
              ) : (
                <View
                  style={[styles.radioBtn, util.isRTL() && {marginLeft: 6}]}
                />
              )}
              <Text size={Fonts.size.font10} color={Colors.black}>
                {strings.STAY_LOGGED_IN}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.forgetPwd}
              onPress={() => {
                Actions.forgetPassword();
              }}>
              <Text size={Fonts.size.font10} color={Colors.black}>
                {`${strings.FORGOT_PASSWORD} ${util.isRTL() ? '؟' : '?'}`}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <RnImage source={Images.Mask1} style={styles.mask1} />
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
            isLoading={false}
            indicatorColor={Colors.white}
            isLoading={loading}
            disabled={loading}
            type="semiBold">
            {strings.LOGIN.toUpperCase()}
          </Button>
        </LinearGradient>
      </View>

      <View
        style={[
          styles.signupSec,
          util.isRTL() ? AppStyles.rowReverse : AppStyles.flexRow,
        ]}>
        <Text style={AppStyles.mRight5} size={Fonts.size.font13}>
          {`${strings.DONT_HAVE_AN_ACCOUNT} ${util.isRTL() ? '؟' : '?'}`}
        </Text>
        <TouchableOpacity
          onPress={() => {
            Actions.signup();
          }}
          style={AppStyles.mRight5}>
          <Text size={Fonts.size.font13} color={Colors.blueRibbon}>
            {strings.SIGN_UP}
          </Text>
        </TouchableOpacity>
        <RnImage source={Images.Mask2} style={styles.mask2} />
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
