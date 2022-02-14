import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import LocationsSearchBarView from './LocationsSearchBarView';
import {connect} from 'react-redux';
import {removeLocationRequest} from '../../actions/SaveLocationsActions';

class LocationsSearchBarController extends React.Component {
  constructor() {
    super();
    this.state = {favLocation: {}, removeFavModal: false, loading: false};
  }
  static propTypes = {
    yourCurrentLocation: PropTypes.string,
    getFavLocation: PropTypes.func,
    favLocations: PropTypes.array,
    userCoordinates: PropTypes.object,
    onChangeOfRegion: PropTypes.func,
    focusOnUpdatedLocation: PropTypes.func,
    userLocationOn: PropTypes.bool,
    showFavLocation: PropTypes.bool,
  };
  static defaultProps = {
    yourCurrentLocation: '',
    getFavLocation: () => {},
    userCoordinates: {},
    favLocations: [],
    onChangeOfRegion: () => {},
    focusOnUpdatedLocation: () => {},
    userLocationOn: false,
    showFavLocation: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const {getFavLocation} = this.props;
    if (
      prevProps.userCoordinates !== this.props.userCoordinates ||
      prevProps.favLocations !== this.props.favLocations
    ) {
      this.setState({favLocation: getFavLocation()});
    }
  }

  updateFavLocation = favLocation => {
    this.setState({favLocation});
  };

  removeFromFav = () => {
    const {favLocation} = this.state;
    const {removeLocationRequest} = this.props;
    const payload = {
      id: favLocation.id,
    };

    this.setState({loading: true});

    removeLocationRequest(payload, response => {
      if (response) {
        this.setState({loading: false});
      }
      this.setState({loading: false});
      this.closeRemoveFavModal();
    });
  };

  closeRemoveFavModal = () => {
    this.setState({removeFavModal: false});
  };
  setValue = key => {
    this.setState(key);
  };

  render() {
    const {favLocation, removeFavModal, loading} = this.state;
    return (
      <LocationsSearchBarView
        updateFavLocation={this.updateFavLocation}
        favLocation={favLocation}
        removeFavModal={removeFavModal}
        loading={loading}
        removeFromFav={this.removeFromFav}
        closeRemoveFavModal={this.closeRemoveFavModal}
        setValue={data => this.setValue(data)}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({savelocations, user}) => ({
  favLocations: savelocations.favLocations,
  userCoordinates: user.userCoordinates,
  userLocationOn: user.userLocationOn,
  user: user.data,
});

const actions = {removeLocationRequest};

export default connect(
  mapStateToProps,
  actions,
)(LocationsSearchBarController);
