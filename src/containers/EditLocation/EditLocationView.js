import React from 'react';
import {View, Image as RnImage} from 'react-native';
import {CustomNavbar, Button} from '../../components';
import {Images, Colors, Fonts, AppStyles} from '../../theme';
import styles from './EditLocationStyles';
import {strings, inputFieldsLimit} from '../../constants';
import {Text, ContactInput, TextInput} from '../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function EditLocationView(props) {
  const {
    setValue,
    phone,
    yourLocation,
    completeLocation,
    phoneError,
    handleSubmit,
  } = props;

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      //keyboardShouldPersistTaps="always"
      >
      <View style={styles.container}>
        <CustomNavbar
          hasBack={true}
          title={strings.EDIT_LOCATION}
          titleColor={Colors.white}
        />
        <View style={styles.innerContainer}>
          <View style={styles.viewStyle}>
            <RnImage source={Images.LocationIcon} />
            <Text
              size={Fonts.size.font13}
              color={Colors.black1}
              type="bold"
              style={styles.textMarginLeft10}>
              {strings.YOUR_LOCATION}
            </Text>
          </View>

          <TextInput
            placeholder={strings.YOUR_LOCATION}
            placeholderTextColor={Colors.grey}
            inputStyle={AppStyles.inputStyle}
            labelStyle={AppStyles.labelStyle}
            maxLength={inputFieldsLimit.mLimit100}
            onChangeText={val => {
              setValue({yourLocation: val});
            }}
            ref={ref => {
              props.yourLocationRef(ref);
            }}
          />

          <View style={styles.completLocationStyle}>
            <RnImage source={Images.LocationIcon} />
            <Text
              size={Fonts.size.font13}
              color={Colors.black1}
              type="bold"
              style={styles.textMarginLeft10}>
              {strings.COMPLETE_LOCATION}
            </Text>
          </View>

          <TextInput
            placeholder={strings.COMPLETE_LOCATION}
            placeholderTextColor={Colors.grey}
            inputStyle={AppStyles.inputStyle}
            labelStyle={AppStyles.labelStyle}
            maxLength={inputFieldsLimit.mLimit1000}
            onChangeText={val => {
              setValue({completeLocation: val});
            }}
            ref={ref => {
              props.completeLocationRef(ref);
            }}
          />

          <View style={styles.textMarginTop30}>
            <ContactInput
              returnKeyType="done"
              label={strings.MOBILE_NO}
              keyboardType="phone-pad"
              value={phone !== 'invalid' ? phone : ''}
              onNumberChange={(phoneNumber, ref) => {
                props.setPhone({phone: phoneNumber}, ref.isValidNumber());
              }}
              ref={ref => {
                props.phoneRef(ref);
              }}
              error={phoneError}
              onClickFlag={true}
            />
          </View>

          <View style={styles.submitBtnWrap}>
            <Button
              color={Colors.white}
              background={Colors.resolutionBlue}
              style={[AppStyles.btnStyle1, AppStyles.shadow5]}
              size={Fonts.size.font17}
              isLoading={false}
              indicatorColor={Colors.white}
              disabled={false}
              type="bold"
              onPress={handleSubmit}>
              {strings.SUBMIT}
            </Button>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
