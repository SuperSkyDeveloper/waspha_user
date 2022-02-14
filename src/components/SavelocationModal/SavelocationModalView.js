import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {Text, TextInput} from '..';
import styles from './SavelocationModalStyles';
import Modal from 'react-native-modal';
import {Colors, Images} from '../../theme';
import LinearGradient from 'react-native-linear-gradient';
import {strings} from '../../constants';
import Button from '../Button';
import {Actions} from 'react-native-router-flux';

export default function SavelocationModalView(props) {
  const {
    savelocationModal,
    getLatLngAndAddress,
    locationAddress,
    openModal,
    btnPositive,
    btnNegative,
  } = props;
  return (
    <View style={styles.container}>
      <Modal
        isVisible={savelocationModal}
        style={{
          alignItems: 'center',
          margin: 20,
        }}
        onBackButtonPress={() => {
          props.closeModal();
        }}
        onBackdropPress={() => {
          props.closeModal();
        }}
        backdropOpacity={0.8}
        backdropColor={Colors.white}>
        <LinearGradient
          start={{x: 0, y: 0.8}}
          end={{x: 0, y: -0.3}}
          colors={[Colors.resolutionBlue, Colors.violetRed]}
          style={styles.imageSelectorWrapper}>
          <View style={styles.imageDetails}>
            <View style={styles.selectImageWrap}>
              <View style={styles.selectImageTextWrap}>
                <Text style={styles.selectImageText}>
                  {strings.SAVE_DELIVERY_LOCATION}
                </Text>
              </View>
            </View>

            <View style={styles.imageSelectorChild}>
              <TouchableOpacity
                onPress={() => {
                  props.closeModal();
                }}
                style={[styles.imagePlaceholderStyle]}>
                <View style={styles.pin4StyleWrap}>
                  <RnImage source={Images.Pin4} style={styles.pin4Style} />
                </View>
                <Text
                  numberOfLines={2}
                  style={styles.addressInput}
                  placeholder={strings.SAVE_LOCATION_PLACEHOLDER}>
                  {locationAddress}
                </Text>
              </TouchableOpacity>
              <View style={styles.btnSec}>
                <View style={styles.submitBtnWrap}>
                  <Button
                    color={Colors.white}
                    style={[styles.submitBtn, {backgroundColor: Colors.green}]}
                    textStyle={styles.submitBtnText}
                    onPress={() => {
                      props.closeModal();
                    }}>
                    {strings.YES}
                  </Button>
                </View>
                <View style={styles.submitBtnWrap}>
                  <Button
                    color={Colors.black}
                    style={styles.submitBtn}
                    textStyle={styles.submitBtnText}
                    onPress={() => {
                      props.closeModal();
                    }}>
                    {strings.NO}
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>
      </Modal>
    </View>
  );
}
