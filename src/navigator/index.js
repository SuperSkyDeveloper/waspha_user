// @flow
import React from 'react';
import {connect} from 'react-redux';
import {Stack, Scene, Router, Actions, Drawer} from 'react-native-router-flux';

import styles from './styles';
import {Colors} from '../theme';
import {Alert} from 'react-native';
import {
  Login,
  Welcome,
  Signup,
  VerificationCode,
  PasswordRecovery,
  ForgetPassword,
  NearBy,
  VendorReviews,
  SelectLanguage,
  PromoCode,
  PaymentMethod,
  Profile,
  CompanyPolicy,
  VendorProfile,
  StoreDashboard,
  TrendingProduct,
  MyCart,
  PaymentDetail,
  AdditionalNote,
  OrderAndProposal,
  OrderDetail,
  ProposalList,
  ProposalDetail,
  ProductListing,
  Home,
  MyAddress,
  AddressListing,
  EditLocation,
  AddressFlowMap,
  DeliveryCenter,
  OrderStatus,
  CancelOrder,
  OrderPlace,
  DeliveryCenterDetails,
  ProposalRevision,
  OrderPlaceNearbyVendors,
  ChangePassword,
  GooglePlacesSearch,
  SearchItems,
  TourScreens,
  ContactUs,
  FAQS,
  ReferralCode,
  RateMyService,
  RatingsList,
  TermsAndConditions,
  PrivacyPolicy,
  ReOrder,
  ReOrderDetails,
  NoConnection,
  NotificationListing,
  CookiePolicy,
  CopyrightPolicy,
  GDPRComplianceStatement,
  SelectCountry,
  PaymentForm,
  RCListing,
  RocketChatContainer,
  ChangeEmailAndNumber,
} from '../containers';
import {SideBar} from '../components';
import {strings} from '../constants';

function onBackPress() {
  // if (Actions.currentScene == 'verificationCode') {
  //   Alert.alert(`${strings.HOLD_ON}`, `${strings.NAVIGATE_BACK}?`, [
  //     {
  //       text: strings.CANCEL,
  //       onPress: () => null,
  //       style: 'cancel',
  //     },
  //     {
  //       text: strings.YES,
  //       onPress: () => {
  //         Actions.pop();
  //       },
  //     },
  //   ]);
  //   return true;
  // }
  if (Actions.state.index === 0) {
    return false;
  }
  Actions.pop();
  return true;
}

const navigator = Actions.create(
  <Stack
    key="root"
    titleStyle={styles.title}
    headerStyle={styles.header}
    headerTintColor={Colors.navbar.text}>
    <Drawer
      drawer
      key="drawerMenu"
      contentComponent={SideBar}
      drawerWidth={267}
      side={'left'}
      hideNavBar>
      <Scene key="home" component={Home} hideNavBar />
    </Drawer>
    <Scene key="profile" component={Profile} hideNavBar />

    <Scene key="login" component={Login} hideNavBar />
    <Scene key="welcome" component={Welcome} hideNavBar initial />
    <Scene key="changePassword" component={ChangePassword} hideNavBar />

    <Scene key="reOrder" component={ReOrder} hideNavBar />
    <Scene key="reOrderDetails" component={ReOrderDetails} hideNavBar />

    <Scene key="myaddress" component={MyAddress} hideNavBar />
    <Scene key="googlePlacesSearch" component={GooglePlacesSearch} hideNavBar />
    <Scene key="tourScreens" component={TourScreens} hideNavBar />
    <Scene key="rateMyService" component={RateMyService} hideNavBar />
    <Scene key="ratingsList" component={RatingsList} hideNavBar />
    <Scene key="noConnection" component={NoConnection} hideNavBar />
    <Scene key="selectCountry" component={SelectCountry} hideNavBar />

    <Scene key="termsAndConditions" component={TermsAndConditions} hideNavBar />
    <Scene key="privacyPolicy" component={PrivacyPolicy} hideNavBar />
    <Scene key="cookiePolicy" component={CookiePolicy} hideNavBar />
    <Scene key="copyrightPolicy" component={CopyrightPolicy} hideNavBar />
    <Scene
      key="gdprComplianceStatement"
      component={GDPRComplianceStatement}
      hideNavBar
    />
    <Scene
      key="notificationListing"
      component={NotificationListing}
      hideNavBar
    />
    <Scene
      key="rocketChatContainer"
      component={RocketChatContainer}
      hideNavBar
    />
    <Scene key="rclisting" component={RCListing} hideNavBar />
    <Scene
      key="changeEmailAndNumber"
      component={ChangeEmailAndNumber}
      hideNavBar
    />
    <Scene key="referralCode" component={ReferralCode} hideNavBar />
    <Scene key="contactUs" component={ContactUs} hideNavBar />
    <Scene key="editLocation" component={EditLocation} hideNavBar />
    <Scene key="signup" component={Signup} hideNavBar />
    <Scene key="cancelorder" component={CancelOrder} hideNavBar />
    <Scene key="forgetPassword" component={ForgetPassword} hideNavBar />
    <Scene key="verificationCode" component={VerificationCode} hideNavBar />
    <Scene key="passwordRecovery" component={PasswordRecovery} hideNavBar />
    <Scene key="nearBy" component={NearBy} hideNavBar />
    <Scene key="vendorReviews" component={VendorReviews} hideNavBar />
    <Scene key="passwordRecovery" component={PasswordRecovery} hideNavBar />
    <Scene key="selectLanguage" component={SelectLanguage} hideNavBar />
    <Scene key="paymentMethod" component={PaymentMethod} hideNavBar />
    <Scene key="promoCode" component={PromoCode} hideNavBar />
    <Scene key="orderstatus" component={OrderStatus} hideNavBar />
    <Scene key="deliverycenter" component={DeliveryCenter} hideNavBar />
    <Scene
      key="deliveryCenterDetails"
      component={DeliveryCenterDetails}
      hideNavBar
    />
    <Scene key="companyPolicy" component={CompanyPolicy} hideNavBar />
    <Scene key="vendorProfile" component={VendorProfile} hideNavBar />
    <Scene key="storeDashboard" component={StoreDashboard} hideNavBar />
    <Scene
      key="orderplaceNearbyVendors"
      component={OrderPlaceNearbyVendors}
      hideNavBar
    />
    <Scene key="myCart" component={MyCart} hideNavBar />
    <Scene key="paymentDetail" component={PaymentDetail} hideNavBar />
    <Scene key="searchItems" component={SearchItems} hideNavBar />

    <Scene key="faqs" component={FAQS} hideNavBar />

    <Scene key="trendingProduct" component={TrendingProduct} hideNavBar />
    <Scene key="additionalNote" component={AdditionalNote} hideNavBar />
    <Scene key="orderPlace" component={OrderPlace} hideNavBar />
    <Scene key="orderAndProposal" component={OrderAndProposal} hideNavBar />
    <Scene key="orderDetail" component={OrderDetail} hideNavBar />
    <Scene key="proposalList" component={ProposalList} hideNavBar />
    <Scene key="proposalDetail" component={ProposalDetail} hideNavBar />
    <Scene key="productListing" component={ProductListing} hideNavBar />
    <Scene key="addressListing" component={AddressListing} hideNavBar />
    <Scene key="addressFlowMap" component={AddressFlowMap} hideNavBar />
    <Scene key="proposalRevision" component={ProposalRevision} hideNavBar />
    <Scene key="paymentForm" component={PaymentForm} hideNavBar />
  </Stack>,
);

export default () => (
  <AppNavigator navigator={navigator} backAndroidHandler={onBackPress} />
);

const AppNavigator = connect()(Router);
