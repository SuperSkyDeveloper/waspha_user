import React from 'react';
import PropTypes from 'prop-types';
import VendorProfileView from './VendorProfileView';
import {connect} from 'react-redux';
import {getShopDetailsRequest} from '../../actions/ShopsActions';

class VendorProfileController extends React.Component {
  constructor() {
    super();
    this.state = {loading: false, showCustomTime: false};
  }
  static propTypes = {
    shopDetails: PropTypes.object,
    shopId: PropTypes.number.isRequired,
    category: PropTypes.object,
    subCategory: PropTypes.object,
  };
  static defaultProps = {
    shopDetails: {},
    shop: {},
    category: {},
    subCategory: {},
  };

  componentDidMount() {
    const {
      getShopDetailsRequest,
      userCoordinates,
      shopId,
      appLanguage,
    } = this.props;
    const payload = {
      store_id: shopId,
      location: {
        address: 'abc',
        lat: userCoordinates.latitude,
        lng: userCoordinates.longitude,
      },
      language: appLanguage,
    };

    this.setState({loading: true});
    getShopDetailsRequest(payload, response => {
      if (response.status) {
        this.setState({loading: false});
      }
      this.setState({loading: false});
    });
  }

  setValue = key => {
    this.setState(key);
  };

  render() {
    const {loading, showCustomTime} = this.state;
    return (
      <VendorProfileView
        loading={loading}
        showCustomTime={showCustomTime}
        setValue={this.setValue}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({user, shops, general}) => ({
  user: user.data,
  userCoordinates: user.userCoordinates,
  appLanguage: general.appLanguage,

  shopDetails: shops.shopDetails,
});

const actions = {getShopDetailsRequest};

export default connect(
  mapStateToProps,
  actions,
)(VendorProfileController);
