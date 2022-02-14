import React from 'react';
import PropTypes from 'prop-types';
import VendorReviewsView from './VendorReviewsView';
import {connect} from 'react-redux';
import {getShopReviewsRequest} from '../../actions/ShopsActions';

class VendorReviewsController extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }
  static propTypes = {
    shopId: PropTypes.number.isRequired,
    shopReviews: PropTypes.array,
    shopDetails: PropTypes.object,
  };
  static defaultProps = {shopReviews: [], shopDetails: {}};

  componentDidMount() {
    const {shopDetails, getShopReviewsRequest, appLanguage} = this.props;
    const payload = {
      store_id: shopDetails.id,
      language: appLanguage,
    };
    this.setState({loading: true});

    getShopReviewsRequest(payload, response => {
      if (response) {
        this.setState({loading: false});
      }
      this.setState({loading: false});
    });
  }

  render() {
    const {loading} = this.state;
    return <VendorReviewsView loading={loading} {...this.props} />;
  }
}

const mapStateToProps = ({shops, general}) => ({
  shopReviews: shops.shopReviews,
  appLanguage: general.appLanguage,
});

const actions = {getShopReviewsRequest};

export default connect(
  mapStateToProps,
  actions,
)(VendorReviewsController);
