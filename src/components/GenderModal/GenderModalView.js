import React from 'react';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import {Text, Button} from '..';
import styles from './GenderModalStyles';
import {Colors, Images, AppStyles, Metrics} from '../../theme';
import {strings} from '../../constants';
import util from '../../util';

export default function GenderModalView(props) {
  const {modalType, closeModal, isModalOpen, onSubmit, activeGenderId,translations,appLanguage} = props;

  const genderOptions = [
    {
      id: 0,
      nameEn: translations.strings['en'].MALE,
      nameAr:translations.strings['ar'].MALE
    },
    {
      id: 1,
      nameEn: translations.strings['en'].FEMALE,
      nameAr:translations.strings['ar'].FEMALE

    },
    {
      id: 2,

      nameEn: translations.strings['en'].OTHER,
      nameAr:translations.strings['ar'].OTHER
    },
  ];

  return (
    <View style={styles.container}>
      <Modal
        isVisible={isModalOpen}
        style={styles.modal}
        onBackButtonPress={() => {
          closeModal({[modalType]: false});
        }}
        onBackdropPress={() => {
          closeModal({[modalType]: false});
        }}
        backdropOpacity={0.8}
        backdropColor={Colors.white}
        style={styles.imageSelectorWrapper}>
        <LinearGradient
          start={{x: 0.0, y: 1.0}}
          end={{x: 0.0, y: 0.09}}
          colors={[Colors.resolutionBlue, Colors.violetRed]}
          style={styles.modalStyle}>
          <View>
            {genderOptions.map(item => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    onSubmit({activeGenderId: item.id, showGender:appLanguage==='ar'? item.nameAr:item.nameEn,gender: item.nameEn});
                    closeModal({[modalType]: false});
                  }}
                  style={
                    util.isRTL()
                      ? [AppStyles.rowReverse, styles.optionItem]
                      : [AppStyles.flexRow, styles.optionItem]
                  }>
                  <View
                    style={[
                      styles.radioBtn,
                      util.isRTL()
                        ? {marginLeft: Metrics.mediumBaseMargin}
                        : {marginRight: Metrics.mediumBaseMargin},
                    ]}>
                    <View
                      style={
                        activeGenderId === item.id && styles.activeRadioBtn
                      }
                    />
                  </View>
                  <Text type="bold" style={styles.optionText}>
                    {appLanguage==='ar'? item.nameAr:item.nameEn}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </LinearGradient>
      </Modal>
    </View>
  );
}
