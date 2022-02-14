import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {Animated} from 'react-native';
import {connect} from 'react-redux';
import MapsView from './MapsView';
import {Metrics} from '../../theme';
import {getCurrentRegion} from '../../services/GeneralHelper';
import {getInitialCoordinates} from '../../actions/SaveLocationsActions';
import {updateUserData, locationToggleChange} from '../../actions/UserActions';
import util from '../../util';
import {strings} from '../../constants';

class MapsController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditModal: false,
      showMovingMarker: props.isMarkerMoving,
      loading: false,
      renderCords: {},
      moveMarkerPress: false,

      //Animation

      startValue: new Animated.Value(1),
      endValue: new Animated.Value(1.2),
      duration: 1000,
      topOfImage: 0,
    };
  }
  static propTypes = {
    userCoordinates: PropTypes.object,
    mapStyle: PropTypes.object,
    scrollEnabled: PropTypes.bool,
    mapHeight: PropTypes.number,
    initialRegion: PropTypes.object.isRequired,
    updateUserLocation: PropTypes.func,
    filteredVendors: PropTypes.array,
    userLocationOn: PropTypes.bool,
    fromMyAddress: PropTypes.bool,
    coordinates: PropTypes.object,
    onChangeOfRegion: PropTypes.func,
    favLocations: PropTypes.array,
    setMapRef: PropTypes.func,
    rfpVendors: PropTypes.array,
    isDirection: PropTypes.bool,
    availableCategories: PropTypes.object,
    isMarkerMoving: PropTypes.bool,
    showLoader: PropTypes.bool,
    showDriverLocation: PropTypes.bool,
    fromOrderStatus: PropTypes.bool,
    driverImg: PropTypes.string,
    vendorImg: PropTypes.string,
    showUserCurrentLocation: PropTypes.bool,
    riderTimeAndKM: PropTypes.object,
  };
  static defaultProps = {
    userCoordinates: {},
    scrollEnabled: true,
    mapHeight: Metrics.screenHeight,
    mapStyle: {},
    nearByShops: [],
    updateUserLocation: () => {},
    filteredVendors: [],
    userLocationOn: false,
    fromMyAddress: false,
    coordinates: {},
    onChangeOfRegion: () => {},
    favLocations: [],
    setMapRef: () => {},
    rfpVendors: [],
    isDirection: false,
    availableCategories: [],
    isMarkerMoving: false,
    showLoader: true,
    showDriverLocation: false,
    fromOrderStatus: false,
    driverImg: '',
    vendorImg: '',
    showUserCurrentLocation: true,
    riderTimeAndKM: {},
  };

  componentDidMount() {
    const {coordinates, fromMyAddress} = this.props;
    if (fromMyAddress) {
      this.setState({
        renderCords: {
          lat: coordinates.latitude,
          lng: coordinates.longitude,
        },
      });
      return true;
    }

    this.getlocation();
  }

  componentDidUpdate(prevProps, prevState) {
    // if (
    //   prevProps.filteredVendors !== this.props.filteredVendors &&
    //   _.isEmpty(this.props.filteredVendors)
    // ) {
    //   util.topAlert(strings.WASPHA_NOT_OPERATE_HERE, true);
    // }
    if (prevProps.userLocationOn !== this.props.userLocationOn) {
      this.getlocation();
    }
  }

  getlocation = async () => {
    const {
      getInitialCoordinates,
      locationToggleChange,
      updateUserLocation,
      userLocationOn,
    } = this.props;
    this.setState({loading: true});

    //gets the current region of the mobile device
    if (!userLocationOn) {
      getCurrentRegion().then(res => {
        getInitialCoordinates(res);
        this.setState({renderCords: res});
      });
    }

    let cords;

    //checks if location service open/close
    let a = await util.checkIsLocation();

    //gets the coordinates from user
    a && (cords = await util.getCoordinates());

    if (_.isUndefined(cords) || _.isUndefined(cords.coordinates)) {
      locationToggleChange(false);
      //if user denies to give location
      this.setState({loading: false});
      return true;
    } else {
      //if user accepts to give location
      locationToggleChange(true);

      await getInitialCoordinates({
        lat: cords.coordinates.latitude,
        lng: cords.coordinates.longitude,
      });

      //a callback function which belongs to Home Container
      updateUserLocation(cords.coordinates);
      this.setState({
        renderCords: {
          lat: cords.coordinates.latitude,
          lng: cords.coordinates.longitude,
        },
        loading: false,
      });
    }
  };

  performAnimation = () => {
    Animated.timing(this.state.startValue, {
      toValue: this.state.endValue,
      duration: this.state.duration,
      useNativeDriver: true,
    }).start();
  };

  performMovingAnimation = () => {
    Animated.timing(this.state.startValue, {
      toValue: this.state.endValue,
      duration: this.state.duration,
      useNativeDriver: true,
    }).start();
  };

  setValue = key => {
    this.setState(key);
  };

  focusOnZoomIn = () => {
    if (!_.isNil(this.handleIconRef)) {
      this.handleIconRef.transitionTo({scaleX: 0.7});
    }
  };

  focusOnZoomOut = () => {
    if (!_.isNil(this.handleIconRef)) {
      this.handleIconRef.transitionTo({scaleY: 1, scaleX: 1});
    }
  };

  render() {
    const {
      loading,
      showMovingMarker,
      renderCords,
      moveMarkerPress,
      startValue,
      endValue,
      topOfImage,
    } = this.state;
    return (
      <MapsView
        loading={loading}
        renderCords={renderCords}
        moveMarkerPress={moveMarkerPress}
        showMovingMarker={showMovingMarker}
        startValue={startValue}
        endValue={endValue}
        topOfImage={topOfImage}
        focusOnZoomIn={this.focusOnZoomIn}
        focusOnZoomOut={this.focusOnZoomOut}
        handleIconRef={ref => {
          this.handleIconRef = ref;
        }}
        mapRef={ref => {
          this.mapRef = ref;
          this.props.setMapRef(ref);
        }}
        setValue={data => this.setValue(data)}
        showEditModal={this.state.showEditModal}
        performAnimation={this.performAnimation}
        performMovingAnimation={this.performMovingAnimation}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({savelocations, user, categories}) => ({
  myLocation: savelocations.myLocation,
  initialRegion: savelocations.initialRegion,
  userCoordinates: user.userCoordinates,
  userLocationOn: user.userLocationOn,
  favLocations: savelocations.favLocations,
  availableCategories: categories.availableCategories,
});

const actions = {getInitialCoordinates, updateUserData, locationToggleChange};

export default connect(
  mapStateToProps,
  actions,
)(MapsController);
