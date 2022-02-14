import React from 'react';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {Text} from '..';
import styles from './SelectLanguageModalStyles';
import {Colors, Fonts, AppStyles, Metrics, Images} from '../../theme';
import {strings} from '../../constants';
import util from '../../util';
export default function SelectLanguageModalView(props) {
  const {isModalOpen, closeModal, modalType, handleLangSelect} = props;
  return (
    <View>
      <Modal
        isVisible={isModalOpen}
        onBackButtonPress={() => {
          closeModal({[modalType]: false});
        }}
        onBackdropPress={() => {
          closeModal({[modalType]: false});
        }}
        backdropOpacity={0.8}
        backdropColor={Colors.black}>
        <View style={styles.modalStyle}>
          <RnImage source={Images.SelectLanguageWrap} />
        </View>
        <View
          style={[
            styles.contentWrap,
            !util.isPlatformAndroid() && {marginRight: 10},
          ]}>
          <View
            style={[
              styles.selectLanguageWrap,
              !util.isPlatformAndroid() && {marginLeft: 4},
            ]}>
            <Text type="bold" size={Fonts.size.medium} color={Colors.white}>
              {strings.SELECT_LANGUAGE}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              if (util.isRTL()) {
                handleLangSelect('en');
              }
            }}
            style={styles.contentSec}>
            <View
              style={[
                styles.amountWrap,
                !util.isRTL() && {backgroundColor: Colors.purple},
              ]}>
              <Text
                style={{
                  fontFamily: util.isPlatformAndroid()
                    ? 'Lateef-Regular'
                    : 'Lateef',
                }}
                color={Colors.white}
                size={Fonts.size.xxLarge}
                type="semiBold">
                ENGLISH
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (!util.isRTL()) {
                handleLangSelect('ar');
              }
            }}
            style={styles.contentSec}>
            <View
              style={[
                styles.amountWrap,
                util.isRTL() && {backgroundColor: Colors.purple},
              ]}>
              <View style={{top: -6}}>
                <Text
                  style={{
                    fontFamily: util.isPlatformAndroid()
                      ? 'Lateef-Regular'
                      : 'Lateef',
                  }}
                  color={Colors.white}
                  size={Fonts.size.xxLarge}
                  type="semiBold">
                  عربى
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
