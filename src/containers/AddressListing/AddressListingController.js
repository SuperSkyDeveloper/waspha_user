import React from 'react';
import PropTypes from 'prop-types';

import AddressListingView from './AddressListingView';
import {connect} from 'react-redux';
import {removeLocationRequest} from '../../actions/SaveLocationsActions';

class AddressListingController extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      removeAddressId: null,
      removeAddressModal: false,
    };
  }
  static propTypes = {
    myLocations: PropTypes.array,
    removeLocationRequest: PropTypes.func,
  };
  static defaultProps = {myLocations: [], removeLocationRequest: () => {}};

  setValue = key => {
    this.setState(key);
  };

  openRemoveAddressModal = id => {
    this.setState({removeAddressModal: true, removeAddressId: id});
  };

  removeLocation = () => {
    const {removeLocationRequest} = this.props;

    const payload = {
      id: this.state.removeAddressId,
    };

    this.setState({loading: true, removeAddressModal: false});
    removeLocationRequest(payload, response => {
      if (response.status) {
      }
      this.setState({loading: false});
    });
  };

  render() {
    const {loading, removeAddressId, removeAddressModal} = this.state;
    return (
      <AddressListingView
        loading={loading}
        removeAddressId={removeAddressId}
        removeAddressModal={removeAddressModal}
        removeLocation={this.removeLocation}
        openRemoveAddressModal={this.openRemoveAddressModal}
        setValue={this.setValue}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({savelocations}) => ({
  myLocations: savelocations.favLocations,
});

const actions = {removeLocationRequest};

export default connect(
  mapStateToProps,
  actions,
)(AddressListingController);
