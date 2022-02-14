import React from 'react';
import {
  View,
  Image as RnImage,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import CodeInput from 'react-native-confirmation-code-input';
import {Text, SignHeader, Button, TextInput} from '../../components';
import styles from './PasswordRecoveryStyles';
import {Images, Colors, Fonts, AppStyles} from '../../theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import {strings} from '../../constants';
import util from '../../util';

export default function PasswordRecoveryView(props) {
  const {
    setValue,
    otpCode,
    retypePwd,
    password,
    passwordError,
    handleSubmit,
    hideRetypePwd,
    hidePassword,
    retypePwdError,
    loading,
    retypePwdFocus,
  } = props;
  return (
    <KeyboardAwareScrollView
      //keyboardShouldPersistTaps="always"
      style={styles.container}
      showsVerticalScrollIndicator={false}>
      <SignHeader
        title={strings.PASSWORD}
        subTitle={strings.RECOVERY}
        mainHeading={strings.RESET_YOUR_PASSWORD}
      />
      {/*  */}
      <View style={styles.wraper}>
        <View style={AppStyles.mTop40}>
          <TextInput
            autoFocus
            textAlign={util.isRTL() ? 'right' : 'left'}
            inputStyle={AppStyles.inputStyle}
            labelStyle={[
              AppStyles.labelStyle,
              util.isRTL() && {position: 'absolute', right: -3, top: -20},
            ]}
            label={strings.NEW_PASSWORD.toUpperCase()}
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
                hidePassword ? Images.ViewPasswordIcon : Images.HidePasswordIcon
              }
              style={styles.ViewPasswordIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={AppStyles.mTop30}>
          <TextInput
            textAlign={util.isRTL() ? 'right' : 'left'}
            inputStyle={AppStyles.inputStyle}
            labelStyle={[
              AppStyles.labelStyle,
              util.isRTL() && {position: 'absolute', right: -3, top: -20},
            ]}
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
            onSubmitEditing={handleSubmit}
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
      {/*  */}

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
  );
}
