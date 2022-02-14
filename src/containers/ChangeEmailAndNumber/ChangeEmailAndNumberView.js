import React from 'react';
import {View, Image as RnImage} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {
  Button,
  ContactInput,
  CustomNavbar,
  Text,
  TextInput,
} from '../../components';
import {strings} from '../../constants';
import {AppStyles, Colors, Metrics} from '../../theme';
import util from '../../util';
import styles from './ChangeEmailAndNumberStyles';
export default function ChangeEmailAndNumberView(props) {
  const {
    phoneError,
    handleSubmit,
    isPhone,
    email,
    emailError,
    setValue,
  } = props;
  return (
    <View style={styles.container}>
      <CustomNavbar
        // title={strings.MY_CART}
        // titleColor={Colors.white}
        hasBottomRadius={true}
      />
      <View
        style={[
          AppStyles.marginHorizontalBase,
          {marginTop: Metrics.screenHeight / 4.5},
        ]}>
        {isPhone ? (
          <ContactInput
            onNumberChange={(val, ref) => {
              props.setPhone(val.phone_number, val.isNumberValid, val);
            }}
            error={phoneError}
          />
        ) : (
          <View>
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
              onSubmitEditing={handleSubmit}
            />
          </View>
        )}
        <View style={styles.cancelBtnWrap}>
          <Button
            color={Colors.white}
            style={styles.submitBtn}
            textStyle={styles.submitBtnText}
            onPress={() => {
              handleSubmit();
            }}>
            {strings.SUBMIT.toUpperCase()}
          </Button>
        </View>
      </View>
    </View>
  );
}
