import React from 'react';
import {View, Image as RnImage, ScrollView} from 'react-native';
import {
  Text,
  CustomNavbar,
  PaymentMethodItem,
  WalletItem,
  Button,
} from '../../components';
import LinearGradient from 'react-native-linear-gradient';
import styles from './PaymentMethodStyles';
import {Colors, Fonts, AppStyles, Images} from '../../theme';
import {strings} from '../../constants';
export default function PaymentMethodView(props) {
  return (
    <>
      <CustomNavbar
        title={strings.PAYMENTS}
        titleColor={Colors.white}
        hasBottomRadius={true}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <WalletItem />
        <View style={styles.paymentSec}>
          <Text
            style={AppStyles.mBottom15}
            size={Fonts.size.font14}
            type="medium">
            {strings.CURRENT_PAYMENT_METHODS}
          </Text>
          <PaymentMethodItem />
          <PaymentMethodItem />
          <PaymentMethodItem />
        </View>
      </ScrollView>
      <View style={{backgroundColor: Colors.white}}>
        <View style={styles.btnWrap}>
          <Button
            color={Colors.white}
            background={Colors.resolutionBlue}
            style={styles.btn}
            size={Fonts.size.font14}
            type="medium"
            // onPress={handleSubmit}
            isLoading={false}
            indicatorColor={Colors.white}
            disabled={false}>
            <RnImage source={Images.AddIcon} />
            <Text style={AppStyles.mRight15} color={Colors.resolutionBlue}>
              {'  '}
            </Text>
            {strings.ADD_PAYMENT_METHOD}
          </Button>
        </View>
      </View>
    </>
  );
}
