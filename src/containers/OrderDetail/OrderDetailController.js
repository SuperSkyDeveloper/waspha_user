import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import OrderDetailView from './OrderDetailView';
import {connect} from 'react-redux';
import {getMyOrderDetailsRequest} from '../../actions/OrdersActions';

class OrderDetailController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      itemDetails: props.orderDetails,
      loading: true,
    };
  }
  static propTypes = {
    orderId: PropTypes.number.isRequired,
    orderDetails: PropTypes.object,
    getMyOrderDetailsRequest: PropTypes.func,
  };
  static defaultProps = {getMyOrderDetailsRequest: () => {}, orderDetails: {}};

  componentDidMount() {
    this.initial();
  }
  initial = () => {
    const {getMyOrderDetailsRequest, orderId} = this.props;
    const payload = {
      id: orderId,
    };

    getMyOrderDetailsRequest(payload, response => {
      if (response.status) {
      }
      this.setState({loading: false});
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
      <OrderDetailView
        {...this.props}
        handleIndex={this.handleIndex}
        loading={loading}
        activeIndex={activeIndex}
      />
    );
  }
}

const mapStateToProps = ({orders}) => ({
  orderDetails: orders.rfpOrderDetails,
});
const actions = {getMyOrderDetailsRequest};

export default connect(
  mapStateToProps,
  actions,
)(OrderDetailController);
