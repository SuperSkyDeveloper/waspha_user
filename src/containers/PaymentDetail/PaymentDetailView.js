import React from 'react';
import {View, Image as RnImage, ScrollView} from 'react-native';
import {
  Text,
  CustomNavbar,
  CardSection,
  WalletSection,
  PaymentAmount,
  RemoveItemModal,
  Loader,
} from '../../components';
import styles from './PaymentDetailStyles';
import {strings, PAYMENT_TYPE} from '../../constants';
import {Colors, Images} from '../../theme';
import Spinner from 'react-native-loading-spinner-overlay';
import util from '../../util';

export default function PaymentDetailView(props) {
  const {
    loading,
    isMoreProposalsModal,
    hanldleMoreProposalsModal,
    setValue,
    proposalDetails,
    selectedMethod,
    handleMethod,
    makePayment,
    moneyInWallet,
    showThankYou,
    navigateToNextScreen,
    handlePromoCode,
    enteredPromoCode,
    enteredPromoCodeError,
    showPromoCodeModal,
    onRemovePromoCode,
    isConfirmBtn,
  } = props;
  return (
    <View style={styles.container}>
      <CustomNavbar
        title={strings.PAYMENT_DETAIL}
        titleColor={Colors.white}
        hasBottomRadius={true}
      />
      <ScrollView style={styles.wrap} showsVerticalScrollIndicator={false}>
        <Spinner visible={loading} color={Colors.green} />
        {/* <Loader loading={loading} /> */}

        {/* <CardSection /> */}
        <WalletSection
          setValue={setValue}
          enteredPromoCode={enteredPromoCode}
          onRemovePromoCode={onRemovePromoCode}
          enteredPromoCodeError={enteredPromoCodeError}
          handlePromoCode={handlePromoCode}
          selectedMethod={selectedMethod}
          handleMethod={handleMethod}
          showWallet={proposalDetails.invoice.total.value < moneyInWallet}
        />
        <PaymentAmount
          isConfirmBtn={isConfirmBtn}
          paymentDetails={proposalDetails.invoice}
          selectedMethod={selectedMethod}
          makePayment={makePayment}
          showWallet={selectedMethod === PAYMENT_TYPE.WALLET}
        />
      </ScrollView>

      {isMoreProposalsModal && (
        <RemoveItemModal
          title={`${strings.THERE_ARE_SOME_OTHER_PROPOSALS} ${
            util.isRTL() ? '؟' : '?'
          }`}
          isModalOpen={isMoreProposalsModal}
          btnOneText={strings.YES_CLOSE_MY_ORDER}
          btnTwoText={strings.I_WILL_DECIDE_LATER}
          btnPositiveFunc={() => hanldleMoreProposalsModal(true)}
          btnNegativeFunc={() => hanldleMoreProposalsModal(false)}
          closeModal={setValue}
          modalType="isMoreProposalsModal"
        />
      )}

      {showThankYou && (
        <RemoveItemModal
          title={`${strings.THANK_YOU_SHOPPING_WASPHA} `}
          isModalOpen={showThankYou}
          showOneBtn={true}
          btnTwoText={strings.OK}
          btnNegativeFunc={() => {
            setValue({showThankYou: false});
            navigateToNextScreen();
          }}
          closeModal={() => {
            setValue({showThankYou: false});
            navigateToNextScreen();
          }}
          modalType="showThankYou"
        />
      )}

      {showPromoCodeModal && (
        <RemoveItemModal
          title={`${strings.PROMO_CODE_APPLIED} `}
          isModalOpen={showPromoCodeModal}
          showOneBtn={true}
          btnTwoText={strings.OK}
          btnNegativeFunc={() => {
            setValue({showPromoCodeModal: false});
          }}
          closeModal={() => {
            setValue({showPromoCodeModal: false});
          }}
          modalType="showPromoCodeModal"
        />
      )}
    </View>
  );
}
