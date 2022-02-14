import _ from 'lodash';
import {Platform} from 'react-native';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import {Actions} from 'react-native-router-flux';
import {
  updateDeviceTokenRequest,
  setSelectedTab,
  alertMessage,
} from '../actions/GeneralActions';
import DataHandler from '../services/DataHandler';
import Util from '../util';
import {
  NOTIFICATION_CHANNEL,
  NOTIFICATION_PERMISSION_DENIED_ERROR,
  NOTIFICATIONS,
  strings,
} from '../constants';

import {
  getQueueRequest,
  clearQueueVendors,
  noQueueVendorsFound,
  fakeOrderFound,
} from '../actions/ShopsActions';
import {isOrderRatedRequest} from '../actions/OrdersActions';
import {updateUserData} from '../actions/UserActions';
import {Images} from '../theme';
import {CHAT_SERVER} from '../RocketChat/RCConstants';
import {Notifications} from 'react-native-notifications';

const LOG = false;

const updateDeviceToken = async token => {
  let fcmToken = '';
  if (_.isUndefined(token)) {
    fcmToken = await firebase.messaging().getToken();
  }

  console.log({fcmToken});

  if (fcmToken || token)
    DataHandler.getStore().dispatch(
      updateDeviceTokenRequest({
        device_token: fcmToken || token,
        devicePlatform: Platform.OS,
      }),
    );

  return fcmToken || token;
};

const setChannelForAndroid = async () => {
  await Notifications.setNotificationChannel({
    channelId: NOTIFICATION_CHANNEL.id,
    name: NOTIFICATION_CHANNEL.name,
    importance: 5,
    description: NOTIFICATION_CHANNEL.name,
    enableLights: true,
    enableVibration: true,
    // groupId: 'your-group',
    // showBadge: true,
    // soundFile: 'custom_sound.mp3', // place this in <project_root>/android/app/src/main/res/raw/custom_sound.mp3
  });
};

const getPermissions = async () => {
  let authStatus = messaging().hasPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (!enabled) {
    try {
      authStatus = await messaging().requestPermission();
    } catch (error) {
      Util.topAlert(NOTIFICATION_PERMISSION_DENIED_ERROR);
    }
  }

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
};

const showLocalNotification = async data => {
  console.log({showLocalNotificationData: data});

  const {title, body, type, notification_time, id, silent} = data;
  console.log({silent});
  if (silent === 'true') {
    navigateOnNotificationTap(data);
    return true;
  }

  const someId = Math.floor(Math.random() * 10) + '';

  !_.isNil(data.extra_data) && !_.isEmpty(data.extra_data)
    ? Notifications.postLocalNotification({
        body,
        title,
        sound: 'default',
        silent: false,
        data: {isLocal: true, id: someId},
        type,
        extra_data: data.extra_data,
      })
    : Notifications.postLocalNotification({
        body,
        title,
        sound: 'default',
        silent: false,
        data: {isLocal: true, id: someId},
        type,
      });

  if (type === NOTIFICATIONS.DRIVER_ORDER_REJECTED) {
    Actions.refresh('orderStatus', {riderRejected: true});
  }

  if (type === NOTIFICATIONS.REVIEW_RECEIVED) {
    DataHandler.getStore().dispatch(
      updateUserData({avg_rating: JSON.parse(data.extra_data).avg_rating}),
    );
  }
};

const clearAllNotifications = () => {
  firebase.notifications().removeAllDeliveredNotifications();
};

const clearBadgeNumber = () => {
  if (!Util.isPlatformAndroid()) firebase.notifications().setBadge(0);
};

const navigateOnNotificationTap = (data, isFreshLaunch = false) => {
  // // firebase.notifications().removeDeliveredNotification(data.id);
  const cloneData = _.cloneDeep(data);
  console.log({cloneData});
  // return  true
  switch (cloneData.type) {
    // switch (cloneData.type) {
    case NOTIFICATIONS.QUEUE_CALLED:
      const payload = {
        id: JSON.parse(cloneData.extra_data).queue_id,
      };
      DataHandler.getStore().dispatch(clearQueueVendors());
      DataHandler.getStore().dispatch(
        getQueueRequest(payload, response => {
          if (response) {
          } else {
            console.log('DSJKD');
          }
        }),
      );
      break;

    case NOTIFICATIONS.NO_VENDORS_FOUND:
      DataHandler.getStore().dispatch(noQueueVendorsFound(true));

      break;

    case NOTIFICATIONS.CHAT_NOTIFICATION:
      console.log('Chat Noti');
      const data = JSON.parse(cloneData.extra_data);
      let RcNames = data.name.split('--');

      let userImage = `${CHAT_SERVER}/avatar/${data.senderName}`;

      chatPersonName = _.capitalize(data.senderName).split('_')[0];

      Actions.rocketChatContainer({
        fromChatNotification: true,
        fromListChannelName: data.name,
        chattingWithPersonName:
          RcNames.length > 3
            ? `${strings.WASPHA} @ Order ID ${RcNames[1]}`
            : chatPersonName,
        // isChatActive:isActive,
        userAvatar: RcNames.length > 3 ? Images.WasphaIcon : userImage,
      });

      break;

    case NOTIFICATIONS.FAKE_ORDER:
      DataHandler.getStore().dispatch(fakeOrderFound(true));

      break;

    case NOTIFICATIONS.PROPOSAL_RECEIVED:
      const id = JSON.parse(cloneData.extra_data).proposal_id;

      if (Actions.currentScene === 'orderplaceNearbyVendors') {
        Actions.replace('proposalDetail', {proposalId: id});
      } else {
        Actions.proposalDetail({proposalId: id});
      }

      break;

    case NOTIFICATIONS.RFP_REJECTED:
      if (
        Actions.currentScene === 'orderAndProposal' ||
        Actions.currentScene === 'orderplaceNearbyVendors'
      ) {
        Actions.replace('orderAndProposal', {incomingActiveTab: 2});
      } else {
        Actions.orderAndProposal({incomingActiveTab: 2});
      }
      break;

    case NOTIFICATIONS.RFP_EXPIRED:
      if (
        Actions.currentScene === 'orderAndProposal' ||
        Actions.currentScene === 'orderplaceNearbyVendors'
      ) {
        Actions.replace('orderAndProposal', {incomingActiveTab: 2});
      } else {
        Actions.orderAndProposal({incomingActiveTab: 2});
      }
      break;

    case NOTIFICATIONS.RFP_CANCELLED:
      if (
        Actions.currentScene === 'orderAndProposal' ||
        Actions.currentScene === 'orderplaceNearbyVendors'
      ) {
        Actions.replace('orderAndProposal', {incomingActiveTab: 2});
      } else {
        Actions.orderAndProposal({incomingActiveTab: 2});
      }
      break;

    case NOTIFICATIONS.RIDER_ASSIGNED:
      if (
        Actions.currentScene === 'orderstatus' ||
        Actions.currentScene === 'orderplaceNearbyVendors'
      ) {
        Actions.replace('orderstatus', {
          deliveryId: JSON.parse(cloneData.extra_data).proposal_id,
        });
      } else {
        Actions.orderstatus({
          deliveryId: JSON.parse(cloneData.extra_data).proposal_id,
        });
      }
      break;

    case NOTIFICATIONS.ADMIN_MESSAGE:
      if (Actions.currentScene === 'notificationListing') {
        Actions.replace('notificationListing');
      } else {
        Actions.notificationListing();
      }
      break;

    case NOTIFICATIONS.DELIVERY_MODE_CHANGED:
      if (Actions.currentScene === 'deliverycenter') {
        Actions.replace('deliverycenter');
      } else {
        Actions.deliverycenter();
      }
      break;

    case NOTIFICATIONS.REVIEW_RECEIVED:
      // DataHandler.getStore().dispatch(
      //   updateUserData({avg_rating: JSON.parse(cloneData.extra_data).avg_rating}),
      // );
      if (Actions.currentScene === 'ratingsList') {
        Actions.replace('ratingsList');
      } else {
        Actions.ratingsList();
      }
      break;

    //////////////////////////

    case NOTIFICATIONS.ORDER_COMPLETED:
      const dataIds = JSON.parse(cloneData.extra_data);
      const orderId = dataIds.proposal_id;
      const storeId = dataIds.store_id;
      const driverId = _.isNil(dataIds.driver_id) ? null : dataIds.driver_id;

      DataHandler.getStore().dispatch(
        isOrderRatedRequest({order_id: orderId}, response => {
          if (response.status && !response.data.is_rated) {
            if (
              Actions.currentScene === 'rateMyService' ||
              Actions.currentScene === 'orderplaceNearbyVendors'
            ) {
              return Actions.replace('rateMyService', {
                orderId,
                storeId,
                driverId,
              });
            } else {
              return Actions.rateMyService({orderId, storeId, driverId});
            }
          } else {
            if (Actions.currentScene === 'notificationListing') {
              return Actions.replace('notificationListing');
            } else {
              return Actions.notificationListing();
            }
          }
        }),
      );

      break;

    case NOTIFICATIONS.DRIVER_ORDER_REJECTED:
      if (
        Actions.currentScene === 'deliverycenter' ||
        Actions.currentScene === 'orderStatus'
      ) {
        Actions.replace('deliverycenter');
      } else if (Actions.currentScene === 'deliveryCenterDetails') {
        Actions.pop();
        Actions.replace('deliverycenter');
      } else {
        Actions.deliverycenter();
      }
      break;

    case NOTIFICATIONS.REVISION_ACCEPTED:
      const proposalId = DataHandler.getStore().getState().proposals
        .proposalDetails.proposal_id;

      const incomingProposalId = JSON.parse(cloneData.extra_data).id;
      const isTrue = incomingProposalId === proposalId;

      if (Actions.currentScene === 'proposalDetail' && isTrue) {
        Actions.replace('proposalDetail', {proposalId: incomingProposalId});
      } else {
        Actions.proposalDetail({proposalId: incomingProposalId});
      }
      break;

    case NOTIFICATIONS.REVISION_REJECTED:
      if (Actions.currentScene === 'notificationListing') {
        Actions.replace('notificationListing');
      } else {
        Actions.notificationListing();
      }
      break;

    case NOTIFICATIONS.WALLET_ADDED:
      DataHandler.getStore().dispatch(
        updateUserData({wallet: JSON.parse(cloneData.extra_data).wallet}),
      );
      // util.topAlert(strings.YOUR_WALLET_UPDATED);
      DataHandler.getStore().dispatch(
        alertMessage(strings.YOUR_WALLET_UPDATED),
      );

      break;

    case NOTIFICATIONS.LOYALTY_POINTS_UPDATED:
      DataHandler.getStore().dispatch(
        updateUserData({
          loyalty_points: JSON.parse(cloneData.extra_data).loyalty_points,
        }),
      );

      break;

    default: {
      Actions.reset('drawerMenu');
    }
  }
};

export {
  updateDeviceToken,
  setChannelForAndroid,
  getPermissions,
  showLocalNotification,
  clearBadgeNumber,
  clearAllNotifications,
  navigateOnNotificationTap,
};
