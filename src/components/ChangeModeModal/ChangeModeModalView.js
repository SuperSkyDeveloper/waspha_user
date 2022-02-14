import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import {Text, Button} from '..';
import styles from './ChangeModeModalStyles';
import {Colors, Images, AppStyles} from '../../theme';
import {strings} from '../../constants';
import {Actions} from 'react-native-router-flux';
import util from '../../util';

export default function ChangeModeModalView(props) {
  const {
    modalType,
    closeModal,
    isModalOpen,
    activeId,
    onSubmit,
    isLoading,
    handleOrder,
    handleMainText,
    showOneBtn,
    data,
    fromDeliveryCenter,
  } = props;

  return (
    <View style={styles.container}>
      <Modal
        isVisible={isModalOpen}
        style={styles.modal}
        onBackButtonPress={() => {
          // closeModal({[modalType]: false});
        }}
        onBackdropPress={() => {
          // closeModal({[modalType]: false});
        }}
        backdropOpacity={0.8}
        backdropColor={Colors.white}
        style={styles.imageSelectorWrapper}>
        <LinearGradient
          start={{x: 0.0, y: 1.0}}
          end={{x: 0.0, y: 0.09}}
          colors={[Colors.resolutionBlue, Colors.violetRed]}
          style={[styles.modalStyle]}>
          <View style={styles.headTextWrap}>
            <Text type="bold" style={styles.headerText}>
              {handleMainText()}
            </Text>
          </View>
          <View style={util.isRTL() && {alignItems: 'flex-end'}} />

          <View style={styles.btnWrap}>
            <Button
              isLoading={isLoading}
              onPress={() => {
                if (showOneBtn && !fromDeliveryCenter) {
                  Actions.replace('deliveryCenter');
                  return true;
                }

                handleOrder(true);
              }}
              textStyle={styles.btnTextStyle}
              style={styles.btnStyle}>
              {showOneBtn ? strings.OK : strings.ACCEPT}
            </Button>
          </View>

          {!showOneBtn && (
            <>
              <View style={styles.btnWrap}>
                <Button
                  isLoading={isLoading}
                  onPress={() => {
                    handleOrder(false);
                  }}
                  textStyle={styles.btnTextStyle}
                  style={styles.btnStyle}>
                  {strings.REJECT}
                </Button>
              </View>
            </>
          )}
        </LinearGradient>
      </Modal>
    </View>
  );
}
