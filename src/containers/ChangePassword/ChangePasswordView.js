import React from 'react';
import {
  View,
  Image as RnImage,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Text, TextInput, Button, CustomNavbar} from '../../components';
import styles from './ChangePasswordStyles';
import {Images, AppStyles, Colors, Metrics} from '../../theme';
import {strings} from '../../constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import util from '../../util';
import _ from 'lodash';

export default function ChangePasswordView(props) {
  const {
    currentPassword,
    currentPasswordError,
    newPassword,
    newPasswordError,
    retypePassword,
    retypePasswordError,
    currentPasswordFocus,
    newPasswordFocus,
    retypePasswordFocus,
    hideCurrentPassword,
    hideNewPassword,
    hideRetypePassword,
    setValue,
    loading,
  } = props;
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{flexGrow: 1}}
      enableOnAndroid
      scrollEnabled
      //keyboardShouldPersistTaps="always"
      showsVerticalScrollIndicator={false}
      style={styles.container}>
      <CustomNavbar
        title={strings.RESET_PASSWORD}
        titleColor={Colors.white}
        hasBottomRadius={true}
      />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: Metrics.tripleBaseMargin,
          marginBottom: Metrics.mediumBaseMargin,
        }}>
        <RnImage source={Images.LockIcon2} />
      </View>
      <View style={styles.contentSec}>
        <View style={AppStyles.mTop30}>
          <TextInput
            autoFocus
            placeholder={strings.CURRENT_PASSWORD}
            textAlign={util.isRTL() ? 'right' : 'left'}
            inputStyle={AppStyles.inputStyle}
            secureTextEntry={hideCurrentPassword}
            autoCapitalize="none"
            labelStyle={AppStyles.labelStyle}
            value={currentPassword}
            error={currentPasswordError}
            onChangeText={val => {
              setValue({currentPassword: val});
            }}
            ref={ref => {
              props.currentPasswordRef(ref);
            }}
            onSubmitEditing={newPasswordFocus}
          />
          <TouchableOpacity
            style={util.isRTL() ? {} : styles.showPwsdWrap}
            onPress={() => {
              setValue({hideCurrentPassword: !hideCurrentPassword});
            }}>
            <RnImage
              source={
                hideCurrentPassword
                  ? Images.ViewPasswordIcon
                  : Images.HidePasswordIcon
              }
              style={
                util.isRTL()
                  ? {
                      position: 'absolute',
                      left: 0,
                      top: _.isEmpty(currentPasswordError) ? -30 : -70,
                    }
                  : {}
              }
            />
          </TouchableOpacity>
        </View>
        <View style={AppStyles.mTop30}>
          <TextInput
            textAlign={util.isRTL() ? 'right' : 'left'}
            placeholder={strings.NEW_PASSWORD}
            inputStyle={AppStyles.inputStyle}
            secureTextEntry={hideNewPassword}
            autoCapitalize="none"
            labelStyle={AppStyles.labelStyle}
            value={newPassword}
            error={newPasswordError}
            onChangeText={val => {
              setValue({newPassword: val});
            }}
            ref={ref => {
              props.newPasswordRef(ref);
            }}
            onSubmitEditing={retypePasswordFocus}
          />
          <TouchableOpacity
            style={util.isRTL() ? {} : styles.showPwsdWrap}
            onPress={() => {
              setValue({hideNewPassword: !hideNewPassword});
            }}>
            <RnImage
              source={
                hideNewPassword
                  ? Images.ViewPasswordIcon
                  : Images.HidePasswordIcon
              }
              style={
                util.isRTL()
                  ? {
                      position: 'absolute',
                      left: 0,
                      top: _.isEmpty(newPasswordError) ? -30 : -70,
                    }
                  : {}
              }
            />
          </TouchableOpacity>
        </View>
        <View style={AppStyles.mTop30}>
          <TextInput
            textAlign={util.isRTL() ? 'right' : 'left'}
            placeholder={strings.RETYPE_PASSWORD}
            inputStyle={AppStyles.inputStyle}
            secureTextEntry={hideRetypePassword}
            autoCapitalize="none"
            labelStyle={AppStyles.labelStyle}
            value={retypePassword}
            error={retypePasswordError}
            onChangeText={val => {
              setValue({retypePassword: val});
            }}
            ref={ref => {
              props.retypePasswordRef(ref);
            }}
            onSubmitEditing={props.handleSubmit}
          />

          <TouchableOpacity
            style={util.isRTL() ? {} : styles.showPwsdWrap}
            onPress={() => {
              setValue({hideRetypePassword: !hideRetypePassword});
            }}>
            <RnImage
              source={
                hideRetypePassword
                  ? Images.ViewPasswordIcon
                  : Images.HidePasswordIcon
              }
              style={
                util.isRTL()
                  ? {
                      position: 'absolute',
                      left: 0,
                      top: _.isEmpty(retypePasswordError) ? -30 : -70,
                    }
                  : {}
              }
            />
          </TouchableOpacity>
        </View>
        <View style={styles.submitBtnWrap}>
          <Button
            color={Colors.white}
            style={styles.submitBtn}
            textStyle={styles.submitBtnText}
            isLoading={loading}
            disabled={loading}
            onPress={props.handleSubmit}>
            {strings.SAVE.toUpperCase()}
          </Button>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
