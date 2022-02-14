// import NetInfo from '@react-native-community/netinfo';
import {MessageBarManager} from 'react-native-message-bar';
import moment, {duration} from 'moment';
import {Platform} from 'react-native';
import DataHandler from '../services/DataHandler';
import {MESSAGE_TYPES} from '../constants';
import _ from 'lodash';

class RCUtils {
  isPlatformAndroid() {
    return Platform.OS === 'android';
  }

  isPlatformIOS() {
    return Platform.OS === 'ios';
  }
  getRCToken() {
    return DataHandler.getStore().getState().user.data.rc_auth_token;
    return 'TafjV397puzHDalvA30Tj4p7xAme1wqKhIgUUgQLDAU';
  }

  getRCId() {
    return DataHandler.getStore().getState().user.data.rc_id;
    return 'KZRCB7TxAnQPwvBwg';
  }

  getData() {
    return DataHandler.getStore().getState().user.data;
  }
  getUserName() {
    return DataHandler.getStore().getState().user.data.rc_username;
    return 'ahsanabrar_60341';
  }

  getRcUserName() {
    return DataHandler.getStore().getState().user.data.rc_username;
    return 'ahsanabrar_60341';
  }

  topAlertError(message, alertType = 'INFO') {
    MessageBarManager.showAlert({
      message,
      alertType,
      messageStyle: {color: 'red', fontSize: 16},
    });
  }

  /**
   *
   * @param {String} DateTime ISO String to be converted
   * @param {String} format Expected Format
   */
  ISOToFormat = (DateTime, format) => {
    if (moment(DateTime).format(format) === 'Invalid date') {
      return null;
    } else {
      return moment(DateTime).format(format);
    }
  };

  momentFromNow = iso => {
    if (iso) {
      return moment(iso).fromNow();
    }
  };
}

export default new RCUtils();
