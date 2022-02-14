import React from 'react';
import PropTypes from 'prop-types';
import {Linking, Platform} from 'react-native';
import {connect} from 'react-redux';
import OrderStatusView from './OrderStatusView';
import {isOrderRatedRequest} from '../../actions/OrdersActions';
import {getDeliveryStatusDetailsRequest} from '../../actions/DeliveryActions';
import SocketHelper from '../../helpers/SocketHelper';
import {
  getDriverCords,
  getUpdatedRiderTimeAndKM,
} from '../../actions/SaveLocationsActions';
import _ from 'lodash';

let intervalForDriverLocation;

class OrderStatusController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      isChatOption: false,
      isPhoneOption: false,
      showMapOptions: false,
      riderOrderRejected: props.riderRejected,
      driverCordsAfterInterval: props.driverCords,
      driverTimeAndKMAfterInterval: props.driverTimeAndKm,
    };
  }
  static propTypes = {
    deliveryId: PropTypes.number.isRequired,
    deliveryStatusDetails: PropTypes.object,
    shouldEnableContactOption: PropTypes.bool,
    user: PropTypes.object,
    driverCords: PropTypes.object,
    driverTimeAndKm: PropTypes.object,
    riderRejected: PropTypes.bool,
  };
  static defaultProps = {
    deliveryStatusDetails: {},
    shouldEnableContactOption: true,
    user: {},
    driverCords: {},
    driverTimeAndKm: {},
    riderRejected: false,
  };

  componentDidMount() {
    this.initial();

    this.timeToRenderDriverLocation();
  }

  componentWillUnmount() {
    clearInterval(intervalForDriverLocation);
  }

  timeToRenderDriverLocation = () => {
    intervalForDriverLocation = setInterval(() => {
      this.setState({
        driverCordsAfterInterval: this.props.driverCords,
        driverTimeAndKMAfterInterval: this.props.driverTimeAndKm,
      });
    }, 10000);
  };

  showCalloutOfRider = () => {};

  initSocket = () => {
    const {
      getDriverCords,
      deliveryStatusDetails,
      getUpdatedRiderTimeAndKM,
    } = this.props;
    SocketHelper.disconnect();
    SocketHelper.connect(() => {
      console.log('user is connected.');
      SocketHelper.emit('business', {
        userID: deliveryStatusDetails.vendor.store.id,
      });
      // connect callback

      // event listners
      SocketHelper.onDisconnect();
      SocketHelper.stillConnected();

      SocketHelper.onTrackingInfo(getDriverCords); // Continous driver tracking
      SocketHelper.onTaskEtaUpdate(getUpdatedRiderTimeAndKM); // checks for change in rider time and km from user
    });
  };

  initial = () => {
    const {
      deliveryId,
      getDeliveryStatusDetailsRequest,
      isOrderRatedRequest,
      getDriverCords,
      getUpdatedRiderTimeAndKM,
    } = this.props;
    const payload = {
      id: deliveryId,
    };

    getDeliveryStatusDetailsRequest(payload, response => {
      if (response.status) {
        if (!_.isNil(response.data.driver)) {
          this.setState({
            driverCordsAfterInterval: {
              longitude: response.data.driver.location.lng,
              latitude: response.data.driver.location.lat,
            },
          });
          getDriverCords({
            longitude: response.data.driver.location.lng,
            latitude: response.data.driver.location.lat,
          });
          getUpdatedRiderTimeAndKM(response.data.driver.task_eta);

          this.initSocket();
        }
        isOrderRatedRequest({order_id: deliveryId}, response => {
          this.setState({loading: false});

          if (response.status) {
          }
        });
      }
    });
  };

  setValue = key => {
    this.setState(key);
  };

  // checks which map to open , either waze or google
  openMapSheet = () => {
    this.setState({showMapOptions: !this.state.showMapOptions});
  };

  //here we have selected our map option from bottom sheet
  selectMapOption = selectedOption => {
    this.onDirectionOpen(selectedOption);
  };

  // checks which map to open , either waze or google
  onDirectionOpen = selectedOption => {
    const {userLocation, deliveryStatusDetails} = this.props;

    if (selectedOption === 'googleMap') {
      Platform.OS === 'android'
        ? Linking.openURL(
            `google.navigation:q=${
              deliveryStatusDetails.vendor.store.location.lat
            }+${deliveryStatusDetails.vendor.store.location.lng}`,
          )
        : Linking.openURL(
            `maps://app?saddr=${userLocation.lat}+${userLocation.lng}&daddr=${
              deliveryStatusDetails.vendor.store.location.lat
            }+${deliveryStatusDetails.vendor.store.location.lng}`,
          );
    } else {
      Linking.openURL(
        `https://waze.com/ul?ll=${
          deliveryStatusDetails.vendor.store.location.lat
        },${deliveryStatusDetails.vendor.store.location.lng}&navigate=yes`,
      );
    }
  };

  render() {
    const {
      loading,
      isChatOption,
      showMapOptions,
      driverCordsAfterInterval,
      driverTimeAndKMAfterInterval,
      riderOrderRejected,
      isPhoneOption,
    } = this.state;
    return (
      <OrderStatusView
        showMapOptions={showMapOptions}
        isChatOption={isChatOption}
        loading={loading}
        driverCordsAfterInterval={driverCordsAfterInterval}
        driverTimeAndKMAfterInterval={driverTimeAndKMAfterInterval}
        riderOrderRejected={riderOrderRejected}
        isPhoneOption={isPhoneOption}
        openMapSheet={this.openMapSheet}
        selectMapOption={this.selectMapOption}
        setValue={this.setValue}
        showRiderMarkerRef={ref => {
          this.showRiderMarkerRef = ref;
        }}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({savelocations, delivery, orders, user}) => ({
  user: user.data,
  deliveryStatusDetails: delivery.deliveryStatusDetails,
  userLocation: savelocations.initialRegion,
  orderRated: orders.orderRated,
  driverCords: savelocations.driverCords,
  driverTimeAndKm: savelocations.driverTimeAndKm,
});

const actions = {
  getDeliveryStatusDetailsRequest,
  isOrderRatedRequest,
  getDriverCords,
  getUpdatedRiderTimeAndKM,
};

export default connect(
  mapStateToProps,
  actions,
)(OrderStatusController);
