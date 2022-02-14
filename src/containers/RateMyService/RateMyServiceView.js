import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, ScrollView} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  Text,
  RateMyServiceHeader,
  TextInput,
  Button,
  StarRating,
  RichTextEditor,
} from '../../components';
import styles from './RateMyServiceStyles';
import {strings} from '../../constants';
import {Images, AppStyles, Colors, Metrics, Fonts} from '../../theme';
import util from '../../util';

export default function RateMyServiceView(props) {
  const {
    descriptionVendor,
    setValue,
    descriptionCustomer,
    submitRating,
    loading,
    driverId,
    vendorRating,
    customerRating,
    refDes,
    refDriver,
  } = props;
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{flexGrow: 1}}
      enableOnAndroid
      scrollEnabled
      showsVerticalScrollIndicator={false}
      style={styles.container}>
      <RateMyServiceHeader />
      <View
        style={[
          util.isRTL() ? AppStyles.rowReverse : AppStyles.flexRow,
          AppStyles.mTop25,
          AppStyles.pLeft25,
        ]}>
        <Text size={Fonts.size.small} type="semiBold">
          {strings.VENDOR}
        </Text>

        <View
          style={[
            AppStyles.flexRow,
            styles.providerRatingWrap,
            util.isRTL() && AppStyles.mRight30,
          ]}>
          {/* <AirbnbRating
            RTL={true}
            count={5}
            defaultRating={0}
            size={23}
            showRating={false}
            onFinishRating={number => {
              setValue({vendorRating: number});
            }}
          /> */}
          <StarRating
            initialRating={vendorRating}
            readonly={false}
            imageSize={23}
            onChangeRating={number => {
              if (number >= 1) {
                setValue({vendorRating: number});
              }
            }}
          />
        </View>
      </View>
      <View style={[styles.inputWrap, AppStyles.mBottom30]}>
        {/* <TextInput
          autoFocus
          textAlign={util.isRTL() ? 'right' : 'left'}
          multiline={true}
          placeholder={`${strings.ENTER_VENDOR_REVIEWS}....`}
          inputStyle={styles.inputStyle}
          style={styles.addressInputWrap}
          value={descriptionVendor}
          onChangeText={val => {
            setValue({descriptionVendor: val});
          }}
        /> */}
        <View style={styles.richEditorView}>
          <RichTextEditor
            value={descriptionVendor}
            onChange={text => setValue({descriptionVendor: text})}
            textAlign={util.isRTL() ? 'right' : 'left'}
            heightInput="147"
            showLateToolbar={true}
            fontSize={Fonts.size.xxSmall}
            refRichText={refDes}
            placeholder={`${strings.ENTER_VENDOR_REVIEWS}....`}
          />
        </View>
      </View>
      {!_.isNil(driverId) && (
        <>
          <View
            style={[
              util.isRTL() ? AppStyles.rowReverse : AppStyles.flexRow,
              AppStyles.mTop15,
              AppStyles.pLeft25,
            ]}>
            <Text size={Fonts.size.small} type="semiBold">
              {strings.DRIVER}
            </Text>

            <View
              style={[
                AppStyles.flexRow,
                styles.userRatingWrap,
                util.isRTL() && AppStyles.mRight30,
              ]}>
              {/* <AirbnbRating
                count={5}
                defaultRating={0}
                size={23}
                showRating={false}
                onFinishRating={number => {
                  setValue({customerRating: number});
                }}
              /> */}
              <StarRating
                initialRating={customerRating}
                readonly={false}
                imageSize={23}
                onChangeRating={number => {
                  if (number >= 1) {
                    setValue({customerRating: number});
                  }
                }}
              />
            </View>
          </View>
          <View style={styles.inputWrap}>
            {/* <TextInput
              textAlign={util.isRTL() ? 'right' : 'left'}
              multiline={true}
              placeholder={`${strings.ENTER_DRIVER_REVIEWS}....`}
              inputStyle={styles.inputStyle}
              style={styles.addressInputWrap}
              value={descriptionCustomer}
              onChangeText={val => {
                setValue({descriptionCustomer: val});
              }}
            /> */}
            <View style={styles.richEditorView}>
              <RichTextEditor
                value={descriptionCustomer}
                onChange={text => setValue({descriptionCustomer: text})}
                textAlign={util.isRTL() ? 'right' : 'left'}
                heightInput="147"
                showLateToolbar={true}
                fontSize={Fonts.size.xxSmall}
                refRichText={refDriver}
                placeholder={`${strings.ENTER_DRIVER_REVIEWS}....`}
              />
            </View>
          </View>
        </>
      )}
      <View style={styles.submitBtnWrap}>
        <Button
          disabled={loading}
          loading={loading}
          color={Colors.white}
          style={styles.submitBtn}
          textStyle={styles.submitBtnText}
          onPress={submitRating}>
          {strings.SUBMIT.toUpperCase()}
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
}
