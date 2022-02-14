import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage} from 'react-native';
import {Text} from '../../components';
import styles from './WalletItemStyles';
import {Colors, Fonts, Images, AppStyles} from '../../theme';
import {strings} from '../../constants';
export default function WalletItemView(props) {
  const {moneyInWallet, user} = props;
  return (
    <View style={styles.container}>
      <Text color={Colors.codGray} size={Fonts.size.font14} type="medium">
        {strings.WASPHA_WALLET}
      </Text>
      <View style={[AppStyles.alignItemsCenter, AppStyles.mTop15]}>
        <RnImage source={Images.WalletIcon02} />
        <View style={AppStyles.flexRow}>
          <Text size={Fonts.size.font21} color={Colors.black} type="medium">
            {_.isNil(user.currency_code) ? 'ESP' : user.currency_code}{' '}
          </Text>
          <Text size={Fonts.size.font45} color={Colors.eminence} type="medium">
            {moneyInWallet.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
}
