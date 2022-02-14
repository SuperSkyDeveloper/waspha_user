import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import RateMyServiceView from './RateMyServiceView';
import {connect} from 'react-redux';
import {submitRatingRequest} from '../../actions/RatingActions';
import {Actions} from 'react-native-router-flux';
import util from '../../util';
import {strings} from '../../constants';
import {alertMessage} from '../../actions/GeneralActions';
const refDes = React.createRef();
const refDriver = React.createRef();
class RateMyServiceController extends React.Component {
  constructor() {
    super();
    this.state = {
      descriptionVendor: '',
      descriptionCustomer: '',
      vendorRating: 1,
      customerRating: 1,
      loading: false,
    };
  }
  static propTypes = {
    orderId: PropTypes.number.isRequired,
    storeId: PropTypes.number.isRequired,
    driverId: PropTypes.number,
  };
  static defaultProps = {};

  setValue = key => {
    this.setState(key);
  };

  submitRating = () => {
    const {
      descriptionVendor,
      descriptionCustomer,
      vendorRating,
      customerRating,
    } = this.state;

    const {storeId, orderId, submitRatingRequest, alertMessage} = this.props;

    let payload = {
      order_id: orderId,
      store: {
        id: storeId,
        review: _.isEmpty(descriptionVendor) ? null : descriptionVendor,
        rating: vendorRating,
      },
    };

    if (!_.isNil(this.props.driverId)) {
      payload['driver'] = {
        id: this.props.driverId,
        review: _.isEmpty(descriptionCustomer) ? null : descriptionCustomer,
        rating: customerRating,
      };
    }

    this.setState({loading: true});
    submitRatingRequest(payload, response => {
      this.setState({loading: false});

      if (response) {
        // util.topAlert(strings.RATINGS_SUBMIT_SUCCESSFULLY);
        alertMessage(strings.RATINGS_SUBMIT_SUCCESSFULLY);

        Actions.reset('drawerMenu');
      }
    });
  };

  render() {
    const {
      vendorRating,
      descriptionVendor,
      descriptionCustomer,
      customerRating,
      loading,
    } = this.state;
    return (
      <RateMyServiceView
        vendorRating={vendorRating}
        descriptionVendor={descriptionVendor}
        descriptionCustomer={descriptionCustomer}
        loading={loading}
        customerRating={customerRating}
        setValue={this.setValue}
        submitRating={this.submitRating}
        {...this.props}
        refDes={refDes}
        refDriver={refDriver}
      />
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {submitRatingRequest, alertMessage};

export default connect(
  mapStateToProps,
  actions,
)(RateMyServiceController);
