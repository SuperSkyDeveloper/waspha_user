import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import AddressFlowMapView from './AddressFlowMapView';
import util from '../../util';
import {updateUserCoordinates} from '../../actions/UserActions';
import {getAddress, distance} from '../../services/GeneralHelper';
import {Actions} from 'react-native-router-flux';

class AddressFlowMapController extends React.Component {
  constructor() {
    super();
    this.state = {loading: false, mapLocationAddress: ''};
  }

  static propTypes = {
    updateUserCoordinates: PropTypes.func,
    userCoordinates: PropTypes.object,
  };
  static defaultProps = {updateUserCoordinates: () => {}, userCoordinates: {}};

  updateUserLocation = async (lat, lng) => {
    const {updateUserCoordinates} = this.props;
    await updateUserCoordinates({latitude: lat, longitude: lng});

    getAddress(lat, lng).then(res => {
      // this function set the state of mapLocationAddress present in HomeController
      this.setState({mapLocationAddress: res});
      this.setState({loading: false});
    });
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
        2000,
      );
  };

  getFavLocation = () => {
    const {favLocations, userCoordinates} = this.props;

    const isFav = favLocations.find(fav => {
      return distance({latitude: fav.lat, longitude: fav.lng}, userCoordinates);
    });

    return isFav;
  };

  confirmNewLocation = () => {
    Actions.pop({
      refresh: {
        locationAddress: this.state.mapLocationAddress,
        coordinates: this.props.userCoordinates,
      },
    });
  };

  render() {
    const {loading, mapLocationAddress} = this.state;
    return (
      <AddressFlowMapView
        {...this.props}
        loading={loading}
        mapLocationAddress={mapLocationAddress}
        focusOnUpdatedLocation={this.focusOnUpdatedLocation}
        confirmNewLocation={this.confirmNewLocation}
        getFavLocation={this.getFavLocation}
        updateUserLocation={this.updateUserLocation}
        setMapRef={this.setMapRef}
      />
    );
  }
}

const mapStateToProps = ({user, savelocations}) => ({
  userCoordinates: user.userCoordinates,
  favLocations: savelocations.favLocations,
});

const actions = {updateUserCoordinates};

export default connect(
  mapStateToProps,
  actions,
)(AddressFlowMapController);
