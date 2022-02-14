import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, ScrollView, FlatList} from 'react-native';
import {
  Text,
  CustomNavbar,
  CartItem,
  Button,
  RemoveItemModal,
} from '../../components';
import styles from './MyCartStyles';
import {Colors, Images, Fonts, AppStyles} from '../../theme';
import {strings} from '../../constants';

export default function MyCartView(props) {
  const {
    cartItems,
    onCheckOutPress,
    loading,
    loginModal,
    loginToProceed,
    setValue,
  } = props;

  return (
    <View style={styles.container}>
      <CustomNavbar
        title={strings.MY_CART}
        titleColor={Colors.white}
        hasBottomRadius={true}
      />
      <ScrollView style={styles.wrap} showsVerticalScrollIndicator={false}>
        <View style={[AppStyles.flexRow, AppStyles.mBottom25]}>
          <FlatList
            data={cartItems}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            renderItem={({item}) => {
              return <CartItem item={item} fromMyCart={true} />;
            }}
          />
        </View>
      </ScrollView>
      <View style={styles.btnWrap}>
        <Button
          color={Colors.white}
          background={Colors.resolutionBlue}
          style={[AppStyles.shadow5, AppStyles.btnStyle1]}
          size={Fonts.size.font17}
          onPress={() => {
            onCheckOutPress();
          }}
          isLoading={loading}
          indicatorColor={Colors.white}
          disabled={loading || _.isEmpty(cartItems)}
          type="bold">
          {strings.CHECKOUT}
        </Button>
      </View>

      {loginModal && (
        <RemoveItemModal
          title={`${strings.YOU_NEED_TO_LOGIN_PROCEED} `}
          isModalOpen={loginModal}
          btnOneText={strings.OK}
          btnTwoText={strings.CANCEL}
          btnPositiveFunc={loginToProceed}
          btnNegativeFunc={() => setValue({loginModal: false})}
          closeModal={setValue}
          modalType="loginModal"
        />
      )}
    </View>
  );
}
