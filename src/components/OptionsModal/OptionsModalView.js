import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, TouchableOpacity, Linking} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import {Text, Button} from '..';
import styles from './OptionsModalStyles';
import {Colors, Images, AppStyles, Metrics} from '../../theme';
import {strings} from '../../constants';
import {Actions} from 'react-native-router-flux';
import util from '../../util';

export default function OptionsModalView(props) {
  const {
    modalType,
    closeModal,
    isModalOpen,
    activeId,
    setValue,
    callBack,
    deliveryModeOptions,
    onSubmit,
    isLoading,
    isUserChat,
    isDeliveryChat,
    isGroupChat,
    data,
    showHeading,
    showPhoneOptions,
  } = props;

  console.log({
    datadata: data,
  });
  let chatOptions = [
    {
      id: 0,
      name: strings.VENDOR,
      image: Images.VendorIcon,
      status: isUserChat,
      rcUserName: !_.isNil(data.vendor) && data.vendor.store.rc_username,
      userName: !_.isNil(data.vendor) && data.vendor.store.name,

      userAvatar: !_.isNil(data.vendor) && data.vendor.store.image,
    },
  ];

  if (data.status === 'assigned_online' || data.status === 'assigned_waspha') {
    chatOptions[1] = {
      id: 1,

      name: strings.DELIVERY_GUY,
      image: Images.DeliveryGuyIcon,
      status: isDeliveryChat,
      rcUserName: !_.isNil(data.driver) && data.driver.rc_username,
      userName: !_.isNil(data.driver) && data.driver.name,
      userAvatar: !_.isNil(data.driver) && data.driver.avatar,
    };
    chatOptions[2] = {
      id: 2,

      name: strings.GROUP_CHAT,
      image: Images.GroupChatIcon,
      status: isGroupChat,
      rcUserName: !_.isNil(data.vendor) && data.vendor.store.rc_username,
      rcUserName2: !_.isNil(data.driver) && data.driver.rc_username,
      userName: `${strings.WASPHA} @ Order ID ${data.id}`,
      userAvatar: Images.WasphaIcon,
    };
  }

  return (
    <View style={styles.container}>
      <Modal
        isVisible={isModalOpen}
        style={styles.modal}
        onBackButtonPress={() => {
          closeModal({[modalType]: false});
        }}
        onBackdropPress={() => {
          closeModal({[modalType]: false});
        }}
        backdropOpacity={0.8}
        backdropColor={Colors.white}
        style={styles.imageSelectorWrapper}>
        <LinearGradient
          start={{x: 0.0, y: 1.0}}
          end={{x: 0.0, y: 0.09}}
          colors={[Colors.resolutionBlue, Colors.violetRed]}
          style={[styles.modalStyle]}>
          {showHeading && (
            <View style={styles.headTextWrap}>
              <Text type="bold" style={styles.headerText}>
                {modalType === 'isDeliveryMode'
                  ? strings.CHANGE_DELIVERY_MODE
                  : strings.CHAT_OPTION}
              </Text>
            </View>
          )}
          <View style={util.isRTL() && {alignItems: 'flex-end'}}>
            {modalType !== 'isDeliveryMode' &&
              !showPhoneOptions &&
              chatOptions.map(chatOption => {
                if (chatOption.status) {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        closeModal({[modalType]: false});
                        if (chatOption.id === 2) {
                          Actions.rocketChatContainer({
                            rc_username: chatOption.rcUserName,
                            rc_username2: chatOption.rcUserName2,
                            chattingWithPersonName: chatOption.userName,
                            userAvatar: chatOption.userAvatar,
                            isGroupChat: true,
                            orderId: data.id,
                          });
                        } else {
                          Actions.rocketChatContainer({
                            rc_username: chatOption.rcUserName,
                            chattingWithPersonName: chatOption.userName,
                            userAvatar: chatOption.userAvatar,
                            orderId: data.id,
                          });
                        }
                      }}
                      style={[
                        styles.optionItem,
                        util.isRTL() && AppStyles.rowReverse,
                      ]}>
                      <RnImage
                        source={chatOption.image}
                        style={[
                          styles.optionIconStyle,
                          util.isRTL() && AppStyles.mLeft15,
                        ]}
                        resizeMode="contain"
                      />
                      <Text type="bold" style={styles.optionText}>
                        {chatOption.name}
                      </Text>
                    </TouchableOpacity>
                  );
                }
              })}

            {showPhoneOptions && (
              <>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(
                      `tel:${data.vendor.store.contact.country_code} ${
                        data.vendor.store.contact.number
                      }`,
                    );
                  }}
                  style={[styles.optionItem, {marginTop: 30}]}>
                  <Text type="bold" style={styles.optionText}>
                    {strings.CALL_STORE}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(
                      `tel:${data.driver.contact.country_code} ${
                        data.driver.contact.number
                      }`,
                    );
                  }}
                  style={{
                    ...AppStyles.flexRow,
                    marginLeft: Metrics.mediumBaseMargin,
                  }}>
                  <Text type="bold" style={styles.optionText}>
                    {strings.CALL_DRIVER}
                  </Text>
                </TouchableOpacity>
              </>
            )}

            {/* //delivery Mode options */}
            {modalType === 'isDeliveryMode' &&
              deliveryModeOptions.map(item => {
                return (
                  <TouchableOpacity
                    key={item.name}
                    onPress={() => setValue({activeId: item.id})}
                    style={[
                      styles.optionItem,
                      util.isRTL() && AppStyles.rowReverse,
                    ]}>
                    <View
                      style={[
                        styles.radioBtn,
                        util.isRTL() && AppStyles.mLeft15,
                      ]}>
                      <View
                        style={activeId === item.id && styles.activeRadioBtn}
                      />
                    </View>
                    <Text type="bold" style={styles.optionText}>
                      {`${item.title} ${item.subtitle}`}
                    </Text>
                  </TouchableOpacity>
                );
              })}
          </View>
          {modalType === 'isDeliveryMode' && (
            <View style={styles.btnWrap}>
              <Button
                isLoading={isLoading}
                onPress={() => {
                  onSubmit(activeId);
                }}
                textStyle={styles.btnTextStyle}
                style={styles.btnStyle}>
                {strings.SUBMIT}
              </Button>
            </View>
          )}
        </LinearGradient>
      </Modal>
    </View>
  );
}
