import React from 'react';
import PropTypes from 'prop-types';
import GooglePlacesSearchView from './GooglePlacesSearchView';
import {connect} from 'react-redux';

class GooglePlacesSearchController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    onChangeOfRegion: PropTypes.func,
    focusOnUpdatedLocation: PropTypes.func,
    userLocationOn: PropTypes.bool,
    favLocations: PropTypes.array,
    fromOrderPlace: PropTypes.bool,
    getLatLngAndAddress: PropTypes.func,
  };
  static defaultProps = {
    onChangeOfRegion: () => {},
    focusOnUpdatedLocation: () => {},
    userLocationOn: false,
    favLocations: [],
    fromOrderPlace: false,
    getLatLngAndAddress: () => {},
  };

  render() {
    return <GooglePlacesSearchView {...this.props} />;
  }
}

const mapStateToProps = ({user, savelocations, general}) => ({
  userLocationOn: user.userLocationOn,
  favLocations: savelocations.favLocations,
  appLanguage: general.appLanguage,
});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(GooglePlacesSearchController);
