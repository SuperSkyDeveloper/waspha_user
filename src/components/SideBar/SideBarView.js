import React from 'react';
import _ from 'lodash';
import {
  View,
  Image as RnImage,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';
import LinearGradient from 'react-native-linear-gradient';
import {Text, Loader, SelectLanguageModal, SideBarItem} from '..';
import styles from './SideBarStyles';
import {Images, Fonts, Colors, AppStyles} from '../../theme';
import {strings, APP_VERSION} from '../../constants';
import util from '../../util';

export default function SideBarView(props) {
  const {
    userSignOutSuccess,
    user,
    clearFavLocations,
    openLangModal,
    setValue,
    loading,
    handleLangSelect,
    logOutUser,
    handleIndex,
    activeIndex,
  } = props;

  const LINK_LIST = [
    {
      id: 1,
      title: strings.ORDER_DETAILS_1,
      dropDownIcon: Images.DownArrow,
      icon: Images.OrderDetailsIcon,

      subMenus: [
        {
          title: strings.MY_ORDER_PROPOSAL,
          icon: Images.OrderIcon,
          notifications: '',
          info: '',
          action: () => {
            Actions.orderAndProposal({incomingActiveTab: 0});
          },
          rotateImage: true,
        },
        {
          title: strings.DELIVERY_AND_PICKUP,
          icon: Images.DeliveryIcon,
          notifications: '',
          info: '',
          action: () => {
            Actions.deliverycenter();
          },
          rotateImage: true,
        },

        {
          title: strings.PROMO_CODE,
          icon: Images.GiftWhiteIcon,
          notifications: '',
          info: '',

          action: () => {
            Actions.promoCode();
          },
        },
      ],
    },

    {
      id: 2,
      title: strings.PAYMENT_DETAIL,
      dropDownIcon: Images.DownArrow,
      icon: Images.PaymentDetailsIcon,

      subMenus: [
        // {
        //   title: strings.PAYMENT,
        //   icon: Images.PaymentIcon,
        //   notifications: '',
        //   info: '',
        //   action: () => {
        //     Actions.paymentMethod();
        //   },
        // },
        {
          title: strings.WALLET,
          icon: Images.WalletIcon,
          notifications: '',
          info: `${
            _.isNil(user.currency_code) ? 'ESP' : user.currency_code
          } ${props.moneyInWallet.toFixed(2)}`,
          action: () => {
            // Actions.promoCode();
          },
        },
      ],
    },

    // {
    //   id: 3,
    //   title: 'Prizes',
    //   dropDownIcon: Images.DownArrow,

    //   subMenus: [
    //     {
    //       title: strings.PROMO_CODE,
    //       icon: Images.GiftWhiteIcon,
    //       notifications: '3',
    //       action: () => {
    //         Actions.promoCode();
    //       },
    //     },
    //     {
    //       title: strings.ADS_PRIZES,
    //       icon: Images.AdIcon,
    //       notifications: '',
    //       info: '',
    //     },
    //     {
    //       id: 7,
    //       title: strings.INVITE_EARN,
    //       icon: Images.InviteIcon,
    //       notifications: '3',
    //     },
    //   ],
    // },

    {
      id: 6,

      title: strings.REVIEWS,
      icon: Images.RatingsIcon,
      notifications: '',
      info: '',
      action: () => {
        Actions.ratingsList();
      },
    },

    {
      id: 9,
      title: strings.NOTIFICATIONS,
      icon: Images.NotificationsIcon,
      notifications: '',
      info: '',
      action: () => {
        Actions.notificationListing();
      },
    },

    // {
    //   id: 9,
    //   title: strings.REFERRAL_CODE,
    //   icon: Images.PaymentIcon,
    //   notifications: '',
    //   info: '',
    //   action: () => {
    //     Actions.referralCode();
    //   },
    // },

    // {
    //   id: 10,

    //   title: strings.CHAT_CONVERSATION,
    //   icon: Images.Chat,
    //   notifications: '12',
    //   action: () => {},
    // },

    // {
    //   id: 11,

    //   title: strings.ACTIVATE_NIGHT_MODE,
    //   icon: Images.MoonIcon,
    //   notifications: '',
    //   info: '',
    //   action: () => {},
    // },

    {
      id: 4,
      title: strings.LEGAL,
      dropDownIcon: Images.DownArrow,
      icon: Images.LegalIcon,

      subMenus: [
        {
          title: `${strings.FAQ.toUpperCase()}`,
          icon: Images.FAQ,
          notifications: '',
          info: '',
          action: () => {
            Actions.drawerClose();

            Actions.faqs();
          },
        },

        {
          title: strings.PRIVACY_POLICY,
          icon: Images.PrivacyPolicy,
          notifications: '',
          info: '',
          action: () => {
            Actions.privacyPolicy();
          },
        },

        {
          title: strings.TERMS_CONDITIONS,
          icon: Images.TermsCondition,
          notifications: '',
          info: '',
          action: () => {
            Actions.termsAndConditions();
          },
        },

        {
          id: 12,

          title: strings.COOKIE_POLICY,
          icon: Images.CookiePolicy,
          notifications: '',
          info: '',
          action: () => {
            Actions.cookiePolicy();
          },
        },

        {
          id: 13,

          title: strings.COPY_RIGHT_POLICY,
          icon: Images.CopyRightIcon,
          notifications: '',
          info: '',
          action: () => {
            Actions.copyrightPolicy();
          },
        },

        {
          id: 15,

          title: strings.GDPR_COMPLIANCE_STATEMENT,
          icon: Images.GDPRIcon,
          notifications: '',
          info: '',
          action: () => {
            Actions.gdprComplianceStatement();
          },
        },

        {
          title: strings.CONTACT_US,
          icon: Images.ContactIconImage,
          notifications: '',
          info: '',
          action: () => {
            Actions.contactUs();
          },
        },
      ],
    },

    {
      id: 25,
      title: strings.CHAT,
      icon: Images.Chat,
      restricted: user.is_approved,
      notifications: '',
      info: '',
      action: () => {
        Actions.rclisting();
      },
    },

    {
      id: 5,
      title: strings.SETTINGS,
      dropDownIcon: Images.DownArrow,
      icon: Images.SettingsIcon,

      subMenus: [
        {
          title: strings.MY_ADDRESS,
          icon: Images.PinPointer,
          notifications: '',
          info: '',
          action: () => {
            Actions.addressListing();
          },
        },

        {
          title: strings.RESET_PASSWORD,
          icon: Images.ResetPasswordIcon,
          notifications: '',
          info: '',
          action: () => {
            Actions.drawerClose();

            Actions.changePassword();
          },
        },

        {
          title: strings.LANGUAGE,
          icon: Images.ChangeLanguageIcon,
          notifications: '',
          info: '',
          action: () => {
            setValue({openLangModal: true});
          },
        },

        {
          title: strings.LOGOUT,
          icon: Images.LogoutIcon,
          notifications: '',
          info: '',
          action: () => {
            logOutUser();
          },
        },
      ],
    },
    {
      id: 26,
      title: strings.INVITE_EARN,
      icon: Images.InviteAndearn,
      //restricted: user.is_approved,
      notifications: '',
      info: '',
      action: () => {
        Actions.referralCode();
      },
    },
  ];

  const LINK_LIST_UNAUTH = [
    {
      id: 1,
      title: strings.LEGAL,
      dropDownIcon: Images.DownArrow,
      icon: Images.LegalIcon,

      subMenus: [
        {
          title: `${strings.FAQ.toUpperCase()}`,
          icon: Images.FAQ,
          notifications: '',
          info: '',
          action: () => {
            Actions.drawerClose();

            Actions.faqs();
          },
        },

        {
          title: strings.PRIVACY_POLICY,
          icon: Images.PrivacyPolicy,
          notifications: '',
          info: '',
          action: () => {
            Actions.privacyPolicy();
          },
        },

        {
          title: strings.TERMS_CONDITIONS,
          icon: Images.TermsCondition,
          notifications: '',
          info: '',
          action: () => {
            Actions.termsAndConditions();
          },
        },
      ],
    },

    {
      id: 5,
      title: strings.SETTINGS,
      dropDownIcon: Images.DownArrow,
      icon: Images.SettingsIcon,

      subMenus: [
        {
          title: strings.LOGIN,
          icon: Images.LoginIcon,
          notifications: '',
          info: '',
          action: () => {
            Actions.login();
          },
        },

        {
          title: strings.LANGUAGE,
          icon: Images.ChangeLanguageIcon,
          notifications: '',
          info: '',
          action: () => {
            setValue({openLangModal: true});
          },
        },
      ],
    },
  ];

  return (
    <>
      {/* <Spinner visible={loading} color={Colors.green} /> */}
      <Loader loading={loading} />
      <LinearGradient
        start={{x: 0, y: 1}}
        end={{x: 2.5, y: 0}}
        colors={[Colors.resolutionBlue, Colors.violetRed]}
        style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={[styles.baseIconSec, util.isRTL() && styles.baseIconSecRTL]}>
            <TouchableOpacity
              style={
                util.isRTL()
                  ? {position: 'absolute', left: 0}
                  : styles.baseIconWrp
              }
              onPress={() => {
                Actions.drawerClose();
              }}>
              <RnImage style={styles.baseIcon} source={Images.BaselineIcon} />
            </TouchableOpacity>
          </View>
          {!_.isNil(user.access_token) && (
            <>
              <TouchableOpacity
                onPress={() => Actions.profile()}
                style={styles.profileSec}>
                <View style={util.isRTL() ? styles.imgWrapRTL : styles.imgWrap}>
                  <RnImage
                    style={[
                      styles.profileImg,
                      _.isNil(user.avatar) && {tintColor: Colors.white},
                    ]}
                    source={
                      _.isNil(user.avatar)
                        ? Images.ProfilePlaceholder
                        : {uri: user.avatar}
                    }
                  />
                </View>
                <View style={[AppStyles.mLeft10, AppStyles.pTop15]}>
                  <Text
                    style={[
                      AppStyles.mBottom5,
                      util.isRTL() && {textAlign: 'right', right: 23},
                    ]}
                    size={Fonts.size.font12}
                    type="medium"
                    color={Colors.white}>
                    {_.capitalize(user.name)}
                  </Text>
                  <View
                    style={[
                      AppStyles.flexRow,
                      AppStyles.mBottom10,
                      util.isRTL() && {
                        position: 'absolute',
                        top: 38,
                        right: 24,
                        flexDirection: 'row-reverse',
                      },
                    ]}>
                    <RnImage
                      source={Images.StarIcon}
                      style={[
                        AppStyles.mRight5,
                        util.isRTL() && {right: 4, top: 2},
                        {height: 13, width: 13},
                      ]}
                    />
                    <Text size={Fonts.size.font10} color={Colors.white}>
                      {user.avg_rating}
                    </Text>
                  </View>
                  <View
                    style={[
                      util.isRTL() ? AppStyles.rowReverse : AppStyles.flexRow,
                      AppStyles.alignItemsCenter,
                      {marginTop: 25},
                    ]}>
                    <View
                      style={[
                        AppStyles.flexRow,
                        util.isRTL() && AppStyles.rowReverse,
                      ]}>
                      <RnImage
                        source={Images.GiftIcon}
                        style={[
                          AppStyles.mRight5,
                          util.isRTL() && AppStyles.mLeft5,
                          {tintColor: Colors.white},
                        ]}
                      />
                      <Text
                        style={{top: 7}}
                        size={Fonts.size.xSmall}
                        // color={Colors.malachite}
                        color={Colors.white}
                        type={'bold'}>
                        {user.loyalty_points}{' '}
                      </Text>
                    </View>
                    <Text
                      style={util.isRTL() && AppStyles.mRight5}
                      size={Fonts.size.xSmall}
                      // color={Colors.malachite}
                      color={Colors.white}
                      type={'bold'}>
                      {strings.POINTS}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <View style={styles.hLine} />
            </>
          )}
          <View style={styles.linkSec}>
            <FlatList
              data={_.isNil(user.access_token) ? LINK_LIST_UNAUTH : LINK_LIST}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => {
                const active = index === activeIndex;
                return (
                  <SideBarItem
                    item={item}
                    active={active}
                    togglePress={handleIndex}
                    index={index}
                  />
                );
              }}
            />
          </View>
          <View style={AppStyles.mBottom20}>
            <Text
              textAlign="center"
              size={Fonts.size.xSmall}
              color={Colors.white}
              type="medium">
              {APP_VERSION}
            </Text>
          </View>
        </ScrollView>
        {openLangModal && (
          <SelectLanguageModal
            isModalOpen={openLangModal}
            closeModal={setValue}
            modalType="openLangModal"
            handleLangSelect={handleLangSelect}
          />
        )}
      </LinearGradient>
    </>
  );
}
