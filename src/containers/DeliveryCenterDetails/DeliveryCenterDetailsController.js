import React from 'react';
import PropTypes from 'prop-types';
import DeliveryCenterDetailsView from './DeliveryCenterDetailsView';
import {connect} from 'react-redux';
import {getDeliveryDetailsRequest} from '../../actions/DeliveryActions';

class DeliveryCenterDetailsController extends React.Component {
  constructor() {
    super();
    this.state = {
      activeIndex: 0,
      loading: true,
    };
  }
  static propTypes = {
    deliveryId: PropTypes.number.isRequired,
    userCoordinates: PropTypes.object,
    deliveryDetails: PropTypes.object.isRequired,
  };
  static defaultProps = {};

  componentDidMount() {
    this.initial();
  }

  initial = () => {
    const {getDeliveryDetailsRequest, deliveryId, userCoordinates} = this.props;
    const payload = {
      id: deliveryId,
      location: {
        address: 'abc xyz',
        lat: userCoordinates.latitude,
        lng: userCoordinates.longitude,
      },
    };

    getDeliveryDetailsRequest(payload, response => {
      this.setState({loading: false});

      if (response) {
      }
    });
  };

  handleIndex = index => {
    const pressForClose = index === this.state.activeIndex;
    if (pressForClose) {
      this.setState({
        activeIndex: null,
      });
    } else {
      this.setState({
        activeIndex: index,
      });
    }
  };

  render() {
    const {activeIndex, loading} = this.state;
    return (
      <DeliveryCenterDetailsView
        {...this.props}
        handleIndex={this.handleIndex}
        loading={loading}
        activeIndex={activeIndex}
      />
    );
  }
}

const mapStateToProps = ({user, delivery, orders}) => ({
  user: user.data,
  userCoordinates: user.userCoordinates,
  deliveryDetails: delivery.deliveryDetails,
  orderRated: orders.orderRated,
});

const actions = {getDeliveryDetailsRequest};

export default connect(
  mapStateToProps,
  actions,
)(DeliveryCenterDetailsController);
