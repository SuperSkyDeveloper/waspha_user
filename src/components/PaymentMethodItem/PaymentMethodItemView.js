import React from 'react';
import {View, Image as RnImage} from 'react-native';
import {Text} from '../../components';
import styles from './PaymentMethodItemStyles';
import {Images, Colors, Fonts, AppStyles} from '../../theme';
export default function PaymentMethodItemView(props) {
  return (
    <View style={styles.paymentWrap}>
      <View style={styles.firstSec}>
        <RnImage source={Images.PaypalIcon} />
        <View style={styles.radioBtn} />
      </View>
      <View style={AppStyles.mRight30}>
        <Text size={Fonts.size.font10} color={Colors.silverChalice1}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        </Text>
      </View>
    </View>
  );
}
