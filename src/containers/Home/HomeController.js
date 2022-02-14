import React from 'react';
import _ from 'lodash';
import {Animated, BackHandler, Alert, AppState} from 'react-native';
import PropTypes from 'prop-types';
import HomeView from './HomeView';
import {connect} from 'react-redux';

import util from '../../util';
import {ANIMATION_DURATION, strings} from '../../constants';
import {Images} from '../../theme';
import {getNearbyShopsRequest} from '../../actions/ShopsActions';
import {updateUserCoordinates, updateUserData} from '../../actions/UserActions';
import {
  filterVendorsByCategories,
  distance,
  getAddress,
} from '../../services/GeneralHelper';
import {updateDeliveryMethod} from '../../actions/CategoriesActions';
import {Actions, StackActions} from 'react-native-router-flux';

import {Notifications} from 'react-native-notifications';

import {
  updateDeviceToken,
  setChannelForAndroid,
  getPermissions,
  showLocalNotification,
  navigateOnNotificationTap,
  clearBadgeNumber,
} from '../../helpers/firebaseHelper';

import {
  alertMessage,
  checkDeviceStateRequest,
} from '../../actions/GeneralActions';

class HomeController extends React.Component {
  constructor(props) {
    super(props);
    //this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      optionCollapsed: true,
      selectedCategory: {},
      selectedSubCategory: {},
      activeIndex: 1,
      loading: false,
      showCategories: false,

      filteredVendors: [],
      mapLocationAddress: '',
      isCategoryCollapsed: false,
      isMapView: true,
      isListView: false,
      isBackHandler: false,
      appState: AppState.currentState,
    };
    this._animatedOptions = new Animated.Value(1);
  }

  static propTypes = {
    options: PropTypes.array,
    user: PropTypes.object,
    userCoordinates: PropTypes.object,
    nearByShops: PropTypes.array,
    availableCategories: PropTypes.array,
    favLocations: PropTypes.array,
    initialRegion: PropTypes.object,
  };
  static defaultProps = {
    user: {},
    userCoordinates: {},
    nearByShops: [],
    availableCategories: [],
    favLocations: [],
    initialRegion: {},
  };

  //
  // notificaiton v6 start
  //

  // _fcmInit = async () => {
  //   // ------------- CHANNEL INIT --------------
  //   if (util.isPlatformAndroid()) setChannelForAndroid();

  //   // ------------- iOS Permission --------------
  //   if (!util.isPlatformAndroid()) getPermissions();

  //   // ------------- TOKEN INIT --------------

  //   updateDeviceToken();
  //   notifee
  //     .getInitialNotification()
  //     .then(notification => {
  //       if (notification) {
  //         console.log('navigateOnNotificationTap____3', notification);
  //         console.log(
  //           'navigateOnNotificationTap____3',
  //           notification.notification.data,
  //         );
  //         navigateOnNotificationTap(notification.notification.data, false);
  //       }
  //     })
  //     .catch(exception => {
  //       console.log({getInitialNotificationException: exception});
  //     });
  //   this.onTokenRefreshListener = messaging().onTokenRefresh(fcmToken => {
  //     updateDeviceToken(fcmToken);
  //   });
  //   notifee.onForegroundEvent(({type, detail}) => {
  //     console.log({type});
  //     this.handlePress(type, detail);
  //   });
  //   notifee.onBackgroundEvent(async ({type, detail}) => {
  //     console.log('here in onBackgroundEvent type  ' + type);
  //     this.handlePress(type, detail);
  //     return;
  //   });
  //   this.messageListener = messaging().onMessage(async message => {
  //     // Process your message as required
  //     console.log({foregroundMessage: message});
  //     if (message) {
  //       showLocalNotification(message.data);
  //     }
  //   });
  // };

  componentDidMount() {
    if (!_.isEmpty(this.props.user.access_token)) {
      AppState.addEventListener('change', this.handleAppStateChange);

      this._fcmInit();
    }
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  backHandlerModal = () => {
    return this.setState({
      isBackHandler: false,
    });
  };

  handleBackButtonClick = () => {
    if (Actions.state.index === 0) {
      this.setState({
        isBackHandler: true,
      });

      return true;
    }

    return false;
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      !_.isEmpty(this.props.user.access_token) &&
      prevProps.user.access_token !== this.props.user.access_token
    ) {
      console.log('inside componenet did update');
      this._fcmInit();
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );

    if (!_.isEmpty(this.props.user.access_token)) {
      AppState.removeEventListener('change', this.handleAppStateChange);

      this.registerRemoteNotifications &&
        this.registerRemoteNotifications.remove();
      this.registerRemoteNotificationsRegistered &&
        this.registerRemoteNotificationsRegistered.remove();
      this.registerRemoteNotificationsRegistrationFailed &&
        this.registerRemoteNotificationsRegistrationFailed.remove();
      this.registerNotificationReceivedForeground &&
        this.registerNotificationReceivedForeground.remove();
      this.registerNotificationOpened &&
        this.registerNotificationOpened.remove();
      this.registerNotificationReceivedBackground &&
        this.registerNotificationReceivedBackground.remove();
    }
  }

  handleAppStateChange = () => {
    if (AppState.currentState === 'active') {
      console.log('<<<<<<<<<<<<<<<< ON >>>>>>>>>>>>>>>>.');

      this.changeScreenStatus(true);
    } else {
      this.changeScreenStatus(false);
    }
    this.setState({appState: AppState.currentState});
  };

  changeScreenStatus = appState => {
    const {checkDeviceStateRequest} = this.props;
    const payload = {
      is_device_active: appState,
    };

    checkDeviceStateRequest(payload, res => {});
  };

  _fcmInit = async () => {
    console.log('sadhjs');
    // ------------- CHANNEL INIT --------------
    if (util.isPlatformAndroid()) setChannelForAndroid();

    // ------------- iOS Permission --------------
    if (!util.isPlatformAndroid()) getPermissions();

    // ------------- TOKEN INIT --------------
    updateDeviceToken();

    // Request permissions on iOS, refresh token on Android
    this.registerRemoteNotifications = Notifications.registerRemoteNotifications();
    console.log('asdiksajdkkaj');

    Notifications.getInitialNotification()
      .then(notification => {
        console.log({notification});
        if (!_.isNil(notification) && _.isNil(notification.data)) {
          console.log(
            'Initial notification was:',
            // notification ? notification.payload : 'N/A',
          );

          navigateOnNotificationTap(notification.payload);
        }
      })

      .catch(err => {
        console.error('getInitialNotifiation() failed', err);
      });

    this.registerRemoteNotificationsRegistered = Notifications.events().registerRemoteNotificationsRegistered(
      event => {
        // TODO: Send the token to my server so it could send back push notifications...
        console.log('Device Token Received', event.deviceToken);
      },
    );
    this.registerRemoteNotificationsRegistrationFailed = Notifications.events().registerRemoteNotificationsRegistrationFailed(
      event => {
        console.error(event);
      },
    );

    this.registerNotificationReceivedForeground = Notifications.events().registerNotificationReceivedForeground(
      (notification, completion) => {
        console.log('Notification Received - Foreground', notification);

        if (
          notification &&
          notification.payload &&
          notification.payload.data &&
          notification.payload.data.isLocal
        ) {
          // return;
        } else {
          showLocalNotification(notification.payload);
        }

        // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
        completion({alert: true, sound: true, badge: false});
      },
    );

    this.registerNotificationOpened = Notifications.events().registerNotificationOpened(
      (notification, completion, action) => {
        console.log('Notification opened by device user', notification);

        navigateOnNotificationTap(notification.payload);

        completion();
      },
    );

    this.registerNotificationReceivedBackground = Notifications.events().registerNotificationReceivedBackground(
      (notification, completion) => {
        console.log('Notification Received - Background', notification.payload);

        // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
        completion({alert: true, sound: true, badge: false});
      },
    );
  };

  setMapRef = ref => {
    this.mapRef = ref;
  };

  focusOnUpdatedLocation = () => {
    const {latitude, longitude} = this.props.userCoordinates;
    this.mapRef &&
      // this.mapRef.fitToCoordinates([
      //   {
      //     latitude: latitude,
      //     longitude: longitude,
      //   },
      // ]);

      this.mapRef.animateToRegion(
        {
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        5000,
      );
  };

  getFavLocation = () => {
    const {favLocations, userCoordinates} = this.props;

    const isFav = favLocations.find(fav => {
      return distance({latitude: fav.lat, longitude: fav.lng}, userCoordinates);
    });

    return isFav;
  };

  updateUserLocation = cords => {
    const {updateUserCoordinates, userCoordinates} = this.props;
    const {filteredVendors} = this.state;

    updateUserCoordinates(cords);

    if (
      (userCoordinates.longitude !== 0 && this.state.isCategoryCollapsed) ||
      _.isEmpty(filteredVendors)
    ) {
      this.getNearbyStores();
    }
  };

  getNearbyStores = async () => {
    const {
      getNearbyShopsRequest,
      userCoordinates,
      appLanguage,
      alertMessage,
    } = this.props;
    const payload = {
      location: {
        address: 'abc',
        lat: userCoordinates.latitude,
        lng: userCoordinates.longitude,
      },
      delivery: this.props.isDelivery,

      pickup: this.props.isPickup,
      language: appLanguage,
    };
    this.setState({loading: true});

    getNearbyShopsRequest(payload, response => {
      if (response.status) {
        if (_.isEmpty(response.data.stores)) {
          // util.topAlert(strings.WASPHA_NOT_OPERATE_HERE, true);
          alertMessage(strings.WASPHA_NOT_OPERATE_HERE);
        }
        let filteredVendors = [];
        if (!_.isEmpty(this.state.selectedCategory)) {
          filteredVendors = filterVendorsByCategories(
            this.state.selectedCategory.id,
            response.data.stores,
          );
        } else {
          filteredVendors = response.data.stores;
        }
        this.setState({loading: false, filteredVendors});
      }

      this.setState({loading: false});
    });
  };

  animatedOptions = async () => {
    Animated.timing(this._animatedOptions, {
      toValue: this.state.optionCollapsed ? 0 : 1,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  };

  onOptionPress = index => {
    const {updateDeliveryMethod} = this.props;
    if (index !== 0) {
      if (index === 1) {
        updateDeliveryMethod({isDelivery: true, isPickup: false});
        this.setState(
          {activeIndex: index, optionCollapsed: false},
          this.getNearbyStores,
        );
      } else {
        updateDeliveryMethod({isDelivery: false, isPickup: true});

        this.setState(
          {activeIndex: index, optionCollapsed: false},
          this.getNearbyStores,
        );
      }

      return;
    }
    const {optionCollapsed} = this.state;
    // updateDeliveryMethod({isDelivery: true, isPickup: false});

    this.setState(
      {
        activeIndex: this.props.isDelivery
          ? 1
          : this.state.activeIndex !== 0 && 2,
        optionCollapsed: !optionCollapsed,
      },
      async () => {
        await this.getNearbyStores();
        await this.animatedOptions();
      },
    );
  };

  onChangeOfRegion = (lat, lng) => {
    const {updateUserData} = this.props;
    this.updateUserLocation({
      latitude: lat,
      longitude: lng,
    });
    getAddress(lat, lng).then(res => {
      this.setValue({mapLocationAddress: res});
      updateUserData({address: res});
      this.getNearbyStores();
    });
  };

  selectCategory = (item, isCategoryCollapsed) => {
    const {nearByShops} = this.props;

    if (isCategoryCollapsed) {
      this.setState({filteredVendors: nearByShops, isCategoryCollapsed});
      return true;
    }

    const filteredVendors = filterVendorsByCategories(item.id, nearByShops);
    this.setState({
      selectedCategory: item,
      filteredVendors,
      isCategoryCollapsed,
    });
  };

  selectSubCategory = item => {
    this.setState({selectedSubCategory: item});
  };

  setValue = key => {
    this.setState(key);
  };

  //this function is for checking whether mapview or list view is selected and acts accordingly
  selectVendorListType = (isMapView, isListView) => {
    this.setValue({isMapView, isListView});

    if (isListView) {
      Actions.nearBy({
        items: this.state.filteredVendors,
      });
    }
  };

  navigateToCurrentLocation = () => {
    const {lat, lng} = this.props.initialRegion;
    this.onChangeOfRegion(lat, lng);
    this.mapRef &&
      this.mapRef.animateToRegion(
        {
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        800,
      );
  };

  render() {
    const {
      optionCollapsed,
      loading,
      filteredVendors,
      mapLocationAddress,
      isMapView,
      isListView,
      isBackHandler,
    } = this.state;

    return (
      <HomeView
        navigateToCurrentLocation={this.navigateToCurrentLocation}
        updateUserLocation={this.updateUserLocation}
        selectCategory={this.selectCategory}
        selectSubCategory={this.selectSubCategory}
        getFavLocation={this.getFavLocation}
        selectedCategory={this.state.selectedCategory}
        mapLocationAddress={mapLocationAddress}
        animated={this._animatedOptions}
        optionCollapsed={optionCollapsed}
        onOptionPress={this.onOptionPress}
        onChangeOfRegion={this.onChangeOfRegion}
        selectVendorListType={this.selectVendorListType}
        setValue={data => this.setValue(data)}
        setMapRef={this.setMapRef}
        focusOnUpdatedLocation={this.focusOnUpdatedLocation}
        selectedSubCategory={this.state.selectedSubCategory}
        activeIndex={this.state.activeIndex}
        loading={loading}
        filteredVendors={filteredVendors}
        isMapView={isMapView}
        isListView={isListView}
        BackHandler={() => BackHandler.exitApp()}
        backHandlerModal={this.backHandlerModal}
        isBackHandler={isBackHandler}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({
  categories,
  user,
  shops,
  savelocations,
  general,
}) => ({
  user: user.data,
  appLanguage: general.appLanguage,
  userCoordinates: user.userCoordinates,
  availableCategories: categories.availableCategories,
  nearByShops: shops.nearByShops,
  favLocations: savelocations.favLocations,
  isPickup: categories.isPickup,
  isDelivery: categories.isDelivery,
  initialRegion: savelocations.initialRegion,
});

const actions = {
  getNearbyShopsRequest,
  updateUserCoordinates,
  updateUserData,
  updateDeliveryMethod,
  alertMessage,
  checkDeviceStateRequest,
};

export default connect(
  mapStateToProps,
  actions,
)(HomeController);
