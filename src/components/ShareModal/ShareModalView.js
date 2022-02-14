import React from 'react';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {Text} from '../../components';
import styles from './ShareModalStyles';
import {strings} from '../../constants';
import {Fonts, Colors, Images, AppStyles} from '../../theme';
import Modal from 'react-native-modal';

export default function ShareModalView(props) {
  const {onPress, open} = props;
  return (
    <Modal
      onBackButtonPress={onPress}
      onBackdropPress={onPress}
      isVisible={open}>
      <View style={styles.overlay}>
        <View style={styles.shareWrap}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.closeBtn} onPress={onPress}>
              <RnImage source={Images.CloseBtn} />
            </TouchableOpacity>
            <Text
              textAlign="center"
              size={Fonts.size.font28}
              color={Colors.white}
              type="bold">
              {strings.SHARE_PROPOSAL}
            </Text>
          </View>
          <View style={styles.content}>
            <TouchableOpacity style={styles.imgWrap} activeOpacity={0.8}>
              <RnImage source={Images.FacebookIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.imgWrap} activeOpacity={0.8}>
              <RnImage source={Images.WhatsappIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.imgWrap} activeOpacity={0.8}>
              <RnImage source={Images.MessageIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.imgWrap} activeOpacity={0.8}>
              <RnImage source={Images.MailIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
