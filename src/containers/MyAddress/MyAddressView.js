import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {
  Text,
  CustomNavbar,
  TextInput,
  Button,
  ContactInput,
} from '../../components';
import styles from './MyAddressStyles';
import {Colors, AppStyles, Fonts, Images} from '../../theme';
import {strings, inputFieldsLimit} from '../../constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Actions} from 'react-native-router-flux';
import util from '../../util';

export default function MyAddressView(props) {
  const {
    title,
    phone,
    landmark,
    address,
    titleError,
    phoneError,
    landmarkError,
    addressError,
    titleFocus,
    phoneFocus,
    landmarkFocus,
    addressFocus,
    setValue,
    locationAddress,
    loading,
    selectFromPhone,
    shownNumber,
    editLocationData,
    radioBtn1,
    renderRadioBtn1,
    radioBtn2,
    renderRadioBtn2,
    userPhoneNumber,
  } = props;

  return (
    <View style={styles.container}>
      <CustomNavbar
        title={strings.MY_ADDRESS}
        titleColor={Colors.white}
        hasBottomRadius={true}
      />
      <KeyboardAwareScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        //keyboardShouldPersistTaps="always"
      >
        <View style={styles.profileSec}>
          <View style={styles.inputWrap}>
            <TextInput
              autoFocus={true}
              textAlign={util.isRTL() ? 'right' : 'left'}
              placeholder={strings.ENTER_TITLE}
              placeholderTextColor={Colors.grey}
              inputStyle={AppStyles.inputStyle}
              maxLength={inputFieldsLimit.mLimit100}
              labelStyle={styles.labelStyle}
              label={strings.ADDRESS_TITLE}
              labelType="semiBold"
              value={title}
              error={titleError}
              onChangeText={val => {
                setValue({title: val});
              }}
              ref={ref => {
                props.titleRef(ref);
              }}
              // onSubmitEditing={phoneFocus}
            />
          </View>

          <View>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => renderRadioBtn1()}>
                <RnImage
                  source={radioBtn1 ? Images.ActiveRadioBtn : Images.RadioBtn}
                  style={styles.radioBtnIcon}
                />
              </TouchableOpacity>
              <Text
                type="bold"
                style={{marginLeft: 10}}
                size={Fonts.size.xxxSmall}>
                My default phone number
              </Text>
            </View>
            {radioBtn1 && (
              <Text
                style={{
                  marginTop: 10,
                  borderBottomColor: Colors.black,
                  borderBottomWidth: 1,
                }}
                size={Fonts.size.Small}>
                {userPhoneNumber}
              </Text>
            )}
            <View style={{flexDirection: 'row', marginTop: 20}}>
              <TouchableOpacity onPress={() => renderRadioBtn2()}>
                <RnImage
                  source={radioBtn2 ? Images.ActiveRadioBtn : Images.RadioBtn}
                  style={styles.radioBtnIcon}
                />
              </TouchableOpacity>
              <Text
                type="bold"
                style={{marginLeft: 10, marginBottom: 0}}
                size={Fonts.size.xxxSmall}>
                Other Phone No.
              </Text>
            </View>
          </View>

          {radioBtn2 && (
            <View style={styles.inputWrap}>
              {_.isEmpty(shownNumber) && (
                <ContactInput
                  onNumberChange={(val, ref) => {
                    props.setPhone(val.phone_number, val.isNumberValid, val);
                  }}
                  error={phoneError}
                  label=""
                />
              )}

              {!_.isEmpty(shownNumber) && (
                <View>
                  <TextInput
                    editable={false}
                    labelType="semiBold"
                    placeholder={strings.ENTER_NUM}
                    placeholderTextColor={Colors.grey}
                    inputStyle={AppStyles.inputStyle}
                    labelStyle={styles.labelStyle}
                    maxLength={inputFieldsLimit.mLimit100}
                    label={strings.PHONE_NO}
                    value={shownNumber}
                    ref={ref => {
                      props.landmarkRef(ref);
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setValue({shownNumber: ''});
                    }}
                    style={styles.contactCrossBtn}>
                    <Text>x</Text>
                  </TouchableOpacity>
                </View>
              )}
              <TouchableOpacity
                onPress={selectFromPhone}
                style={styles.contactList}>
                <Text style={styles.contactListText} type="bold">
                  {strings.PICK_FROM_CONTACT_LIST}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.inputWrap}>
            <TextInput
              labelType="semiBold"
              placeholder={strings.ENTER_LANDMARK}
              textAlign={util.isRTL() ? 'right' : 'left'}
              placeholderTextColor={Colors.grey}
              inputStyle={[AppStyles.inputStyle, {marginTop: 15}]}
              labelStyle={[styles.labelStyle, {marginTop: 15}]}
              maxLength={inputFieldsLimit.mLimit100}
              label={strings.LANDMARK}
              value={landmark}
              error={landmarkError}
              onChangeText={val => {
                setValue({landmark: val});
              }}
              ref={ref => {
                props.landmarkRef(ref);
              }}
              onSubmitEditing={addressFocus}
            />
          </View>
          <View style={styles.inputWrap}>
            <TextInput
              editable={
                _.isEmpty(locationAddress) || !_.isEmpty(editLocationData)
              }
              multiline={true}
              textAlign={util.isRTL() ? 'right' : 'left'}
              labelType="semiBold"
              style={[
                util.isRTL() ? {paddingRight: 10} : {paddingLeft: 10},
                styles.addressField,
              ]}
              maxLength={inputFieldsLimit.mLimit1000}
              labelStyle={styles.labelStyle}
              label={strings.ADDRESS}
              value={address}
              error={addressError}
              onChangeText={val => {
                setValue({address: val});
              }}
              ref={ref => {
                props.addressRef(ref);
              }}
            />
            {(_.isEmpty(locationAddress) || !_.isEmpty(editLocationData)) && (
              <TouchableOpacity
                style={[
                  styles.pinLocation,

                  util.isRTL()
                    ? [AppStyles.rowReverse, {left: 10}]
                    : [AppStyles.rowReverse, {right: 10}],
                ]}
                onPress={() => {
                  Actions.addressFlowMap();
                }}>
                <View style={styles.pinIconWrap}>
                  <RnImage source={Images.Pin2} style={styles.pinIcon} />
                </View>
                <Text style={styles.pinText} type="bold">
                  {strings.PICK_UP_PIN_LOCATION}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.submitBtnWrap}>
            <Button
              color={Colors.white}
              background={Colors.resolutionBlue}
              style={[AppStyles.btnStyle1, AppStyles.shadow5]}
              size={Fonts.size.font17}
              isLoading={loading}
              indicatorColor={Colors.white}
              disabled={loading}
              type="bold"
              onPress={props.handleSubmit}>
              {_.isEmpty(editLocationData) ? strings.ADD : strings.SAVE_CHANGES}
            </Button>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
