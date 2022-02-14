import React from 'react';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  RemoveItemModal,
  RichTextEditor,
} from '../../components';
import {Actions} from 'react-native-router-flux';
import {Images, Colors, Fonts, AppStyles} from '../../theme';
import {strings} from '../../constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import styles from './ContactUsStyles';
import util from '../../util';

export default function ContactUsView(props) {
  const {
    handleSubmitPress,
    subject,
    message,
    subjectEror,
    messageError,
    subjectRef,
    messageRef,
    messageFocus,
    setValue,
    confirmModal,
    loading,
    refSubject,
    refMessage,
  } = props;

  console.log({subject});
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{flexGrow: 1}}
      enableOnAndroid
      scrollEnabled
      //keyboardShouldPersistTaps="always"
      style={styles.container}>
      <View>
        <LinearGradient
          start={{x: 0.1, y: 1}}
          end={{x: 1.8, y: 0.6}}
          colors={[Colors.resolutionBlue, Colors.violetRed]}
          style={styles.bgImage}>
          <TouchableOpacity
            onPress={() => {
              Actions.pop();
            }}
            style={[
              util.isRTL() ? styles.backBtnStyleRTL : styles.backBtnStyle,
            ]}>
            <View>
              <RnImage source={Images.BackBtn} />
            </View>
          </TouchableOpacity>

          <View style={[styles.contactUsTextWrap, util.isRTL() && {top: 35}]}>
            <Text type="bold" style={styles.contactUsTextStyle}>
              {strings.CONTACT_US.toUpperCase()}
            </Text>
          </View>
        </LinearGradient>
        <View style={styles.cardWrap}>
          <RnImage style={styles.imgStyle} source={Images.ContactUsIcon} />
          <View style={styles.inputFieldsStyle}>
            <View style={styles.subjectFieldStyle}>
              {/* <TextInput
                textAlign={util.isRTL() ? 'right' : 'left'}
                placeholder={strings.SUBJECT_HERE}
                inputStyle={AppStyles.inputStyle}
                labelStyle={AppStyles.labelStyle}
                label={strings.SUBJECT}
                labelType={'semiBold'}
                value={subject}
                error={subjectEror}
                onChangeText={val => {
                  setValue({subject: val});
                }}
                ref={ref => {
                  subjectRef(ref);
                }}
                onSubmitEditing={messageFocus}
              /> */}

              <RichTextEditor
                inputStyle={AppStyles.inputStyle}
                value={subject}
                onChange={text => setValue({subject: text})}
                textAlign={util.isRTL() ? 'right' : 'left'}
                label={strings.SUBJECT}
                labelType={'semiBold'}
                fontSize={Fonts.size.xxSmall}
                labelStyle={[
                  AppStyles.labelStyle,
                  util.isRTL() && AppStyles.alignRight,
                ]}
                ref={ref => {
                  subjectRef(ref);
                }}
                placeholder={strings.SUBJECT_HERE}
                error={subjectEror}
                isLabel={true}
                heightInput={40}
                refRichText={refSubject}
              />
            </View>
            <View style={AppStyles.mTop30}>
              {/* <TextInput
                textAlign={util.isRTL() ? 'right' : 'left'}
                placeholder={strings.MESSAGE_HERE}
                inputStyle={AppStyles.inputStyle}
                labelStyle={AppStyles.labelStyle}
                label={strings.MESSAGE}
                labelType={'semiBold'}
                value={message}
                error={messageError}
                onChangeText={val => {
                  setValue({message: val});
                }}
                ref={ref => {
                  messageRef(ref);
                }}
                onSubmitEditing={handleSubmitPress}
              /> */}
              <RichTextEditor
                inputStyle={AppStyles.inputStyle}
                value={message}
                onChange={text => setValue({message: text})}
                textAlign={util.isRTL() ? 'right' : 'left'}
                label={strings.MESSAGE}
                labelType={'semiBold'}
                fontSize={Fonts.size.xxSmall}
                labelStyle={[
                  AppStyles.labelStyle,
                  util.isRTL() && AppStyles.alignRight,
                ]}
                placeholder={strings.MESSAGE_HERE}
                error={messageError}
                isLabel={true}
                heightInput={40}
                refRichText={refMessage}
              />
            </View>
            <View style={styles.submitBtnWrap}>
              <Button
                color={Colors.resolutionBlue}
                style={styles.submitBtn}
                textStyle={styles.submitBtnText}
                isLoading={loading}
                disabled={loading}
                type="semiBold"
                onPress={() => handleSubmitPress()}>
                {strings.SEND.toUpperCase()}
              </Button>
            </View>
          </View>
        </View>
      </View>

      {confirmModal && (
        <RemoveItemModal
          title={strings.MESSAGE_HAS_BEEN_SENT_SUCCESSFULLY}
          showOneBtn={true}
          btnTwoText={strings.OK}
          isModalOpen={confirmModal}
          btnNegativeFunc={() => setValue({confirmModal: false})}
          closeModal={setValue}
          modalType="confirmModal"
        />
      )}
    </KeyboardAwareScrollView>
  );
}
