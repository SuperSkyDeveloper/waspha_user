import React from 'react';
import _ from 'lodash';
import {
  View,
  Image as RnImage,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import LinearGradient from 'react-native-linear-gradient';
import {
  Text,
  ImagePicker,
  TextInput,
  Calendar,
  GenderModal,
  ContactInput,
  Button,
  Loader,
} from '../../components';
import styles from './ProfileStyles';
import {Images, AppStyles, Colors, Fonts, Metrics} from '../../theme';
import {strings, DATE_FORMAT2} from '../../constants';
import {Actions} from 'react-native-router-flux';
import {ISOToFormat} from '../../helpers/generalHelper';
import util from '../../util';

export default function ProfileView(props) {
  const {
    user,

    setValue,
    isSwitchActive,
    isImgUploadVisible,
    updateProfileImage,
    closeImageModal,
    loading,

    //////////

    userName,
    userNameError,

    email,
    emailError,

    phone,
    phoneNumError,
    phoneNum,
    dateOfBirth,
    isEditAble,
    openCalender,
    setSelectedDropDownValue,
    gender,
    isGenderModal,
    activeGenderId,

    isSocialLogin,
    clearFavLocations,
    submit,
    signOut,
    showGender,
  } = props;
  return (
    <View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* <Spinner visible={loading} color={Colors.green} /> */}
        <Loader loading={loading} />
        <LinearGradient
          start={{x: 0.4, y: 0}}
          end={{x: 1, y: 3}}
          colors={[Colors.resolutionBlue, Colors.violetRed]}
          style={styles.header}>
          <View style={AppStyles.flexRow}>
            <TouchableOpacity
              style={{paddingLeft: 14, paddingVertical: 10}}
              onPress={() => {
                Actions.pop();
              }}>
              <RnImage source={Images.BackBtn} />
            </TouchableOpacity>
            <View style={styles.rightSec}>
              <View
                style={
                  util.isRTL()
                    ? [
                        styles.profileImgWrap,
                        {
                          position: 'absolute',
                          left: Metrics.screenWidth / 2,
                        },
                      ]
                    : styles.profileImgWrap
                }>
                <TouchableOpacity
                  onPress={() => setValue({isImgUploadVisible: true})}
                  style={styles.cameraIconWrap}>
                  <RnImage
                    source={Images.CameraIcon}
                    style={{width: 17, height: 17}}
                  />
                </TouchableOpacity>
                <RnImage
                  style={[
                    styles.profileImg,
                    _.isNil(user.avatar) && {tintColor: Colors.white},
                  ]}
                  source={
                    _.isNil(user.avatar)
                      ? Images.ProfilePlaceholder
                      : {uri: user.avatar}
                  }
                />
              </View>
              <View
                style={[
                  !util.isRTL()
                    ? {width: Metrics.screenWidth / 1.7, paddingLeft: 20}
                    : {width: Metrics.screenWidth / 1.7, paddingRight: 42},
                ]}>
                <Text
                  size={Fonts.size.font16}
                  type="semiBold"
                  color={Colors.white}
                  style={[
                    AppStyles.mBottom5,
                    util.isRTL() && {textAlign: 'right'},
                  ]}>
                  {_.capitalize(user.name)}
                </Text>
                <Text
                  size={Fonts.size.font14}
                  type="medium"
                  numberOfLines={1}
                  color={Colors.white}
                  style={[
                    AppStyles.mBottom5,
                    util.isRTL() && {textAlign: 'right'},
                  ]}>
                  {user.email}
                </Text>
                <Text
                  size={Fonts.size.font14}
                  type="medium"
                  color={Colors.white}
                  style={[
                    AppStyles.mBottom5,
                    util.isRTL() && {textAlign: 'right'},
                  ]}>
                  {user.contact}
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>
        {/* option start */}
        <View style={styles.listingSec}>
          {/*  */}

          <TouchableOpacity
            style={[
              AppStyles.mTop20,
              AppStyles.mBottom20,
              {alignSelf: util.isRTL() ? 'flex-start' : 'flex-end'},
            ]}
            onPress={() => {
              setValue({isEditAble: !isEditAble});
            }}>
            <RnImage
              source={Images.EditIcon}
              style={isEditAble && {opacity: 0.4}}
            />
          </TouchableOpacity>
          <View style={styles.row}>
            <View style={[styles.rowCenter]}>
              <RnImage
                source={Images.ProfileIcon}
                style={util.isRTL() ? {position: 'absolute', right: -10} : {}}
              />
              {!isEditAble && (
                <Text
                  numberOfLines={1}
                  style={
                    util.isRTL()
                      ? [styles.nameTextRTL]
                      : [{width: '90%', left: 10}]
                  }
                  size={Fonts.size.font16}
                  color={Colors.riverBed}
                  type="medium">
                  {/* {strings.FULL_NAME} */}
                  {_.capitalize(userName)}
                </Text>
              )}

              {isEditAble && (
                <View style={util.isRTL() && {flex: 1, right: 30}}>
                  <TextInput
                    textAlign={util.isRTL() ? 'right' : 'left'}
                    inputStyle={[styles.inputStyle, {textAlign: 'right'}]}
                    autoCapitalize="none"
                    value={userName}
                    error={userNameError}
                    onChangeText={val => {
                      setValue({userName: val});
                    }}
                    ref={ref => {
                      props.userNameRef(ref);
                    }}
                  />
                </View>
              )}
            </View>
            <View style={util.isRTL() ? {position: 'absolute'} : {}}>
              <RnImage
                style={[
                  styles.arrowImg,
                  util.isRTL() && {
                    transform: [{rotate: '180deg'}],
                  },
                ]}
                source={Images.NextIcon}
              />
            </View>
          </View>
          {/*  */}
          {/*  */}
          <TouchableOpacity
            onPress={() => {
              Actions.changeEmailAndNumber({isEmail: true, data: user.email});
            }}
            style={[styles.row]}>
            <View
              style={[
                styles.rowCenter,
                util.isRTL()
                  ? [AppStyles.rowReverse, AppStyles.flex]
                  : true && {maxWidth: '60%'},
              ]}>
              {/* // !isEditAble  */}
              <RnImage
                source={Images.EmailIcon}
                style={[
                  util.isRTL()
                    ? {position: 'absolute', left: -11}
                    : true && AppStyles.mRight20,
                ]} //!isEditAble
              />
              <View style={[util.isRTL() && AppStyles.flex]}>
                {true && ( //!isEditAble
                  <View
                    style={
                      {
                        // opacity: 0.3,
                      }
                    }>
                    <Text
                      style={
                        util.isRTL() && {
                          textAlign: 'right',
                          right: 18,
                        }
                      }
                      numberOfLines={1}
                      size={Fonts.size.font16}
                      color={Colors.riverBed}
                      type="medium">
                      {user.email}
                    </Text>
                  </View>
                )}
              </View>
            </View>
            <View
              style={[
                util.isRTL() && {
                  position: 'absolute',
                },
                styles.rowCenter,
                // {opacity: 0.3},
              ]}>
              <Text
                style={[AppStyles.mRight10, util.isRTL() && {marginLeft: 25}]}
                size={Fonts.size.font14}
                color={
                  _.isEmpty(user.unverified) ||
                  (!_.isEmpty(user.unverified) &&
                    _.isNil(user.unverified.email))
                    ? Colors.green
                    : Colors.red
                }>
                {_.isEmpty(user.unverified) ||
                (!_.isEmpty(user.unverified) && _.isNil(user.unverified.email))
                  ? strings.VERIFIED
                  : strings.UNVERIFIED}
              </Text>
              <RnImage
                style={[
                  styles.arrowImg,
                  util.isRTL() && {
                    transform: [{rotate: '180deg'}],
                    position: 'absolute',
                  },
                ]}
                source={Images.NextIcon}
              />
            </View>
          </TouchableOpacity>

          {/*  */}
          {/*  */}
          <TouchableOpacity
            style={[styles.contactWrapper]}
            onPress={() => {
              // !_.isNil(user.unverified) && !_.isEmpty(unverified[1].phone)
              //   ? () => Actions.verificationCode({fromProfile: true})
              //   : () => {}
              Actions.changeEmailAndNumber({isPhone: true});
            }}>
            <View style={[styles.contactContainer]}>
              <RnImage source={Images.PhoneIcon} />
              {true && ( //!isEditAble
                <Text
                  style={[AppStyles.mLeft20]}
                  size={Fonts.size.font16}
                  color={Colors.riverBed}
                  type="medium">
                  {phoneNum}
                </Text>
              )}
            </View>
            <View style={[styles.rowCenter]}>
              <TouchableOpacity
                style={[AppStyles.flexRow]}
                // onPress={() => {
                //   // !_.isNil(user.unverified) && !_.isEmpty(unverified[1].phone)
                //   //   ? () => Actions.verificationCode({fromProfile: true})
                //   //   : () => {}
                //   Actions.changeEmailAndNumber();
                // }}
              >
                <Text
                  style={[
                    AppStyles.mRight10,
                    // {opacity: 0.3}
                  ]}
                  size={Fonts.size.font14}
                  color={
                    _.isEmpty(user.unverified) ||
                    (!_.isEmpty(user.unverified) &&
                      _.isNil(user.unverified.contact))
                      ? Colors.green
                      : Colors.red
                  }>
                  {_.isEmpty(user.unverified) ||
                  (!_.isEmpty(user.unverified) &&
                    _.isNil(user.unverified.contact))
                    ? strings.VERIFIED
                    : strings.UNVERIFIED}
                </Text>

                <RnImage
                  style={[styles.arrowImg, {top: 5}]}
                  source={Images.NextIcon}
                />
                {/* )} */}
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          {/*  */}
          {/*  */}
          <TouchableOpacity
            onPress={() => Actions.changePassword()}
            style={styles.row}>
            <View style={styles.rowCenter}>
              <RnImage
                source={Images.PasswordIcon}
                style={util.isRTL() ? {position: 'absolute', right: -8} : {}}
              />
              <Text
                style={
                  util.isRTL() ? [styles.nameTextRTL] : [AppStyles.mLeft20]
                }
                size={Fonts.size.font16}
                color={Colors.riverBed}
                type="medium">
                {strings.RESET_PASSWORD}
              </Text>
            </View>
            <View style={util.isRTL() ? {position: 'absolute'} : {}}>
              <RnImage
                style={[
                  styles.arrowImg,

                  util.isRTL() && {
                    transform: [{rotate: '180deg'}],
                  },
                ]}
                source={Images.NextIcon}
              />
            </View>
          </TouchableOpacity>
          {/*  */}
          {/*  */}
          <TouchableOpacity
            disabled={!isEditAble}
            onPress={() => setValue({isGenderModal: !isGenderModal})}
            style={styles.row}>
            <View style={styles.rowCenter}>
              <RnImage
                source={Images.GenderIcon}
                style={util.isRTL() ? {position: 'absolute', right: -8} : {}}
              />
              <Text
                style={
                  util.isRTL() ? [styles.nameTextRTL] : [AppStyles.mLeft20]
                }
                size={Fonts.size.font16}
                color={Colors.riverBed}
                type="medium">
                {_.isEmpty(gender) ? strings.GENDER : showGender}
              </Text>
            </View>
            <View style={util.isRTL() ? {position: 'absolute'} : {}}>
              <RnImage
                style={[
                  styles.arrowImg,

                  util.isRTL() && {
                    transform: [{rotate: '180deg'}],
                  },
                ]}
                source={Images.NextIcon}
              />
            </View>
          </TouchableOpacity>
          {/*  */}
          {/*  */}
          <TouchableOpacity
            onPress={
              isEditAble
                ? () => setValue({openCalender: !openCalender})
                : () => {}
            }
            style={styles.row}>
            <View style={styles.rowCenter}>
              <RnImage
                source={Images.CakeIcon}
                style={util.isRTL() ? {position: 'absolute', right: -8} : {}}
              />
              <Text
                style={
                  util.isRTL() ? [styles.nameTextRTL] : [AppStyles.mLeft20]
                }
                size={Fonts.size.font16}
                color={Colors.riverBed}
                type="medium">
                {_.isEmpty(dateOfBirth)
                  ? strings.D_O_B
                  : ISOToFormat(dateOfBirth, DATE_FORMAT2)}
              </Text>
            </View>
            <View style={util.isRTL() ? {position: 'absolute'} : {}}>
              <RnImage
                style={[
                  styles.arrowImg,

                  util.isRTL() && {
                    transform: [{rotate: '180deg'}],
                  },
                ]}
                source={Images.NextIcon}
              />
            </View>
          </TouchableOpacity>
          {/*  */}
          {/*  */}
          {/* <TouchableOpacity style={styles.row}>
            <View style={styles.rowCenter}>
              <RnImage source={Images.LanguageIcon} />
              <Text
                style={AppStyles.mLeft20}
                size={Fonts.size.font16}
                color={Colors.riverBed}
                type="medium">
                {strings.LANGUAGE}
              </Text>
            </View>
            <View style={styles.rowCenter}>
              <Text
                style={AppStyles.mRight10}
                size={Fonts.size.font14}
                color={Colors.riverBed}>
                {strings.ENGLISH}
              </Text>
              <Switch
                trackColor={{false: Colors.grey, true: Colors.chateauGreen}}
                thumbColor={true ? Colors.white : Colors.grey6}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() =>
                  setValue({isSwitchActive: !isSwitchActive})
                }
                value={isSwitchActive}
                style={{transform: [{scaleX: 0.8}, {scaleY: 0.8}]}}
              />
            </View>
          </TouchableOpacity> */}
          {/*  */}
          {/*  */}
          <TouchableOpacity style={[styles.row, {opacity: 0.2}]}>
            <View style={styles.rowCenter}>
              <RnImage
                source={Images.EvaluateIcon}
                style={util.isRTL() ? {position: 'absolute', right: -8} : {}}
              />
              <Text
                style={
                  util.isRTL() ? [styles.nameTextRTL] : [AppStyles.mLeft20]
                }
                size={Fonts.size.font16}
                color={Colors.riverBed}
                type="medium">
                {strings.Evaluate_WASPHA}
              </Text>
            </View>
            <View style={util.isRTL() ? {position: 'absolute'} : {}}>
              <RnImage
                style={[
                  styles.arrowImg,

                  util.isRTL() && {
                    transform: [{rotate: '180deg'}],
                  },
                ]}
                source={Images.NextIcon}
              />
            </View>
          </TouchableOpacity>
          {/*  */}
          {/*  */}
          {false && (
            <TouchableOpacity style={styles.row}>
              <View style={styles.rowCenter}>
                <RnImage source={Images.ClockIcon} />
                <Text
                  style={AppStyles.mLeft20}
                  size={Fonts.size.font16}
                  color={Colors.riverBed}
                  type="medium">
                  {strings.EST}
                </Text>
              </View>
              <View>
                <RnImage style={styles.arrowImg} source={Images.NextIcon} />
              </View>
            </TouchableOpacity>
          )}
          {/*  */}
          {/*  */}

          <TouchableOpacity
            style={styles.row}
            onPress={() => {
              signOut();
            }}>
            <View style={styles.rowCenter}>
              <RnImage
                source={Images.SignoutIcon}
                style={util.isRTL() ? {position: 'absolute', right: -8} : {}}
              />
              <Text
                style={
                  util.isRTL() ? [styles.nameTextRTL] : [AppStyles.mLeft20]
                }
                size={Fonts.size.font16}
                color={Colors.riverBed}
                type="medium">
                {strings.SIGNOUT}
              </Text>
            </View>
            <View style={util.isRTL() ? {position: 'absolute'} : {}}>
              <RnImage
                style={[
                  styles.arrowImg,

                  util.isRTL() && {
                    transform: [{rotate: '180deg'}],
                  },
                ]}
                source={Images.NextIcon}
              />
            </View>
          </TouchableOpacity>
          {/*  */}
        </View>
        {/* option end */}

        {isEditAble && (
          <View style={{backgroundColor: Colors.white}}>
            <View style={styles.btnWrap}>
              <Button
                color={Colors.white}
                background={Colors.resolutionBlue}
                style={styles.btn}
                size={Fonts.size.font14}
                type="medium"
                onPress={submit}
                isLoading={loading}
                indicatorColor={Colors.white}
                disabled={loading}>
                {strings.SUBMIT.toUpperCase()}
              </Button>
            </View>
          </View>
        )}
      </ScrollView>

      {isImgUploadVisible && (
        <ImagePicker
          addImage={updateProfileImage}
          showPickerModal={isImgUploadVisible}
          closeModal={closeImageModal}
        />
      )}

      {openCalender && (
        <Calendar
          setSelectedDropDownValue={setSelectedDropDownValue}
          setValue={setValue}
          mode="date"
        />
      )}

      {isGenderModal && (
        <GenderModal
          isModalOpen={isGenderModal}
          closeModal={setValue}
          onSubmit={setValue}
          modalType="isGenderModal"
          activeGenderId={activeGenderId}
        />
      )}
    </View>
  );
}
