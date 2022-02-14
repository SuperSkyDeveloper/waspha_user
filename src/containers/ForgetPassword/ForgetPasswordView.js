import React from 'react';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {
  Text,
  SignHeader,
  Button,
  TextInput,
  ContactInput,
} from '../../components';
import styles from './ForgetPasswordStyles';
import {Images, Colors, Fonts, AppStyles} from '../../theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import {strings, FORGET_OPTION} from '../../constants';
import util from '../../util';

export default function ForgetPasswordView(props) {
  const {
    setValue,
    phone,
    email,
    emailError,
    phoneError,
    handleSubmit,
    selectForgetOpt,
    loading,
  } = props;

  let isEmailActive,
    isPhoneActive = '';

  // if user select email option
  if (selectForgetOpt === FORGET_OPTION.EMAIL) {
    isEmailActive = Images.ActiveRadioBtn;
  } else {
    isEmailActive = Images.RadioBtn;
  }

  // if user select phone option
  if (selectForgetOpt === FORGET_OPTION.PH0NE) {
    isPhoneActive = Images.ActiveRadioBtn;
  } else {
    isPhoneActive = Images.RadioBtn;
  }

  return (
    <KeyboardAwareScrollView
  keyboardShouldPersistTaps='handled'
  
      style={styles.container}
      showsVerticalScrollIndicator={false}>
      <SignHeader
        title={strings.PASSWORD}
        subTitle={strings.RECOVERY}
        mainHeading={strings.FORGOT_YOUR_PASSWORD}
      />
      {/*  */}
      <View style={styles.wraper}>
        <View style={AppStyles.mTop60}>
          <TouchableOpacity
            style={[
              util.isRTL()
                ? {
                    right: -55,

                    top: -38,
                  }
                : {
                    left: -55,

                    top: -20,
                  },
              styles.radioBtn,
            ]}
            onPress={() => {
              setValue({selectForgetOpt: FORGET_OPTION.EMAIL});
            }}>
            <RnImage source={isEmailActive} style={styles.radioImg} />
          </TouchableOpacity>
          <TextInput
            placeholder={'khalid@yopmail.com'}
            placeholderTextColor={Colors.grey1}
            keyboardType={'email-address'}
            textAlign={util.isRTL() ? 'right' : 'left'}
            autoCapitalize="none"
            inputStyle={AppStyles.inputStyle}
            labelStyle={[
              AppStyles.labelStyle,
              util.isRTL() && {position: 'absolute', right: -3, top: -20},
            ]}
            label={strings.EMAIL.toUpperCase()}
            labelImg=""
            value={email}
            error={emailError}
            onChangeText={val => {
              setValue({email: val});
            }}
            ref={ref => {
              props.emailRef(ref);
            }}
            onSubmitEditing={handleSubmit}
          />
        </View>
        <View style={AppStyles.mTop30}>
          <TouchableOpacity
            style={[

              util.isRTL()
              ? {
                right: -55,

                top: -38,
              }
            : {
                left: -55,

                top: -20,
              },
              styles.radioBtn,
            ]}
            onPress={() => {
              setValue({selectForgetOpt: FORGET_OPTION.PH0NE});
            }}>
            <RnImage style={styles.radioImg} source={isPhoneActive} />
          </TouchableOpacity>
          <ContactInput
            onNumberChange={(val, ref) => {
              props.setPhone(val.phone_number, val.isNumberValid, val);
            }}
            error={phoneError}
          />
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
