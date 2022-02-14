// @flow
import {
  Platform,
  Linking,
  PermissionsAndroid,
  Share,
  Alert,
} from 'react-native';
import _ from 'lodash';
import moment, {duration} from 'moment';
import 'moment/locale/ar';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import Snackbar from 'react-native-snackbar';
import {MessageBarManager} from 'react-native-message-bar';
import GetLocation from 'react-native-get-location';
import {MESSAGE_TYPES, DISCARD_WARNING, strings} from '../constants';
import DataHandler from '../services/DataHandler';
import {Actions} from 'react-native-router-flux';
import {userSignOutSuccess, refreshToken} from '../actions/UserActions';
import {BASE_URL} from '../config/WebService';
class Util {
  keyExtractor = (item: Object, index: number) => index.toString();
  isPlatformAndroid() {
    return Platform.OS === 'android';
  }
  isValidURL(url: 'string') {
    const re = /^(http|https|fttp):\/\/|[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}(:[0-9]{1,5})?(\/.*)?$/;
    return re.test(url);
  }
  isEmailValid(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  isPasswordValid(password: string) {
    return password.length > 5;
  }
  isValidName(name) {
    return /^[a-zA-Z '.-]*$/.test(name);
  }
  isStrongPassword(password) {
    return password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/);
  }
  topAlert(message, action = false) {
    if (action) {
      Snackbar.show({
        text: message,
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          text: 'ok',
          textColor: 'white',
          onPress: () => null,
        },
        rtl: this.isRTL(),
      });
    } else {
      Snackbar.show({
        rtl: this.isRTL(),
        text: message,
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  }

  rtlRightText() {
    return this.isRTL() ? 'right' : 'left';
  }
  _showPermissionError = () => {
    if (this.isPlatformAndroid()) {
      Alert.alert(
        'Permission Required',
        'Please allow this app to use your contacts in order to invite your firends.',
        [
          {
            text: 'Open Settings',
            onPress: () => {
              Linking.openSettings();
            },
          },
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    }
  };

  topAlertError(message, alertType = MESSAGE_TYPES.ERROR) {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_SHORT,
    });
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getFormattedDateTime = (date, format) => {
    if (date) return moment(date).format(format);
    return '';
  };

  getDateObjectFromString = (date, format) => {
    if (date) return moment(date, format).toDate();
    return '';
  };

  showLoader = (instance, loadingFor = '') => {
    if (!instance.state.loading) {
      instance.setState({
        loading: true,
        loadingFor,
      });
    }
  };

  getContactPermission = async () => {
    if (this.isPlatformAndroid()) {
      //android
      let granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts',
          message: 'This app would like to view your contacts.',
          buttonPositive: 'OK',
        },
      )
        .then(result => {
          if (result === PermissionsAndroid.RESULTS.GRANTED) {
            // get contacts from OS
            granted = true;
            return true;
          } else {
            granted = false;

            this._showPermissionError();
          }
        })
        .catch(err => console.log(err));
      return granted;
    } else {
    }
  };

  async checkIsLocation() {
    if (this.isPlatformAndroid()) {
      let check = await LocationServicesDialogBox.checkLocationServicesIsEnabled(
        {
          message:
            "<h2 style='color: #0af13e'>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
          ok: 'YES',
          cancel: 'NO',
          enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
          showDialog: true, // false => Opens the Location access page directly
          openLocationServices: true, // false => Directly catch method is called if location services are turned off
          preventOutSideTouch: true, //true => To prevent the location services window from closing when it is clicked outside
          preventBackClick: true, //true => To prevent the location services popup from closing when it is clicked back button
          providerListener: true, // true ==> Trigger "locationProviderStatusChange" listener when the location state changes
        },
      ).catch(error => error);

      return Object.is(check.status, 'enabled');
    } else {
      return this.getCoordinates();
    }
  }

  async getCoordinates() {
    return new Promise(async function(resolve, reject) {
      await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 35000,
      })
        .then(geo_success => {
          console.warn('GEO_SUCCESS', JSON.stringify(geo_success));
          const {latitude, longitude} = geo_success;
          const location = {};
          location['coordinates'] = {
            latitude,
            longitude,
          };
          resolve(location);
        })
        .catch(error => {
          console.warn('GEO_ERROR', error);
          resolve(error);
        });
    });
  }

  hideLoader = (instance, callback) => {
    if (instance.state.loading) {
      instance.setState(
        {
          loading: false,
          loadingFor: '',
        },
        callback,
      );
    }
  };

  logoutUser() {
    DataHandler.getStore().dispatch(
      userSignOutRequest(() => {
        Actions.reset('welcome');
      }),
    );
  }

  profilePlaceHolderImage(image) {
    if (image) {
      return _.isEmpty(image) ? Images.ProfilePlaceholder : {uri: image};
    }
  }

  async refreshAccessToken() {
    console.log('here in refreshAccessToken');
    let options = Object.assign({method: 'POST'});
    let data = {};
    data.refresh_token = this.getCurrentUserRefreshToken();
    console.log({refreshData: data});

    options.body = JSON.stringify(data);

    console.log({options});
    try {
      const response = await fetch(`${BASE_URL}resume-access-token`, options);

      // console.log({newAccessToken: response});
      const responseJson = await response.json();
      // console.log({newAccessToken: responseJson.data});
      DataHandler.getStore().dispatch(refreshToken(responseJson.data));
      return responseJson.data.access_token;
    } catch (error) {
      console.log({refreshTokenError: error});

      DataHandler.getStore().dispatch(userSignOutSuccess());
      return false;
    }
  }

  getCurrentUserAccessToken() {
    return DataHandler.getStore().getState().user.data.access_token;
  }

  getCurrentUserRefreshToken() {
    return DataHandler.getStore().getState().user.data.refresh_token;
  }

  isNumber(val) {
    return /^\d+$/.test(val);
  }

  isValueEmpty(data, placeholder = '') {
    if (data) {
      return data;
    }
    return placeholder;
  }

  openLinkInBrowser(url) {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: ");
      }
    });
  }

  generateGetParameter(obj) {
    let final = '?';
    for (const key in obj) {
      final = `${final}${key}=${obj[key]}&`;
    }
    final = final.slice(0, -1);
    return final;
  }

  isRequiredErrorMessage(fieldName) {
    return `${this.capitalizeFirstLetter(fieldName)} ${strings.IS} ${
      strings.REQUIRED
    }`;
  }

  isFirstItem(index) {
    return index === 0;
  }

  isLastItem(array, index) {
    return index + 1 === array.length;
  }

  generateGuid() {
    const S4 = () =>
      (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    return (
      S4() +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      S4() +
      S4()
    );
  }
  ////////////////////////
  // CHANGE LANGUAGE

  switchLanguage(languageCode) {
    strings.setLanguage(languageCode);
  }

  isRTL() {
    let selectedLanguage = strings.getLanguage();

    const rtl = ['ar'];
    return selectedLanguage.includes(rtl);
  }

  updateLocale = appLanguage => {
    moment.updateLocale(appLanguage, {
      relativeTime: {
        // future: 'dans %s',
        s: 'a few sec',
        m: 'a min',
        mm: '%d mins',
        // h: 'une heure',
        // hh: '%d heures',
        // d: 'un jour',
        // dd: '%d jours',
        // M: 'un mois',
        // MM: '%d mois',
        // y: 'un an',
        // yy: '%d ans',
      },
    });
  };

  TAB_LIST = () => {
    return [
      {
        id: 1,
        title: strings.CURRENT,
      },
      {
        id: 1,
        title: strings.UPCOMING,
      },
      {
        id: 1,
        title: strings.PAST,
      },
    ];
  };

  renderStrings = () => {
    return {
      YES: strings.YES,
      NO: strings.NO,
    };
  };

  shareApp = async message => {
    try {
      const result = await Share.share({
        message: message,
      });
      Actions.reset('drawerMenu');
    } catch (error) {
      alert(error.message);
    }
  };
}

export default new Util();
