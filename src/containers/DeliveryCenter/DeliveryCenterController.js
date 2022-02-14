import React from 'react';
import PropTypes from 'prop-types';
import DeliveryCenterView from './DeliveryCenterView';
import {connect} from 'react-redux';
import {getDeliveryListRequest} from '../../actions/DeliveryActions';
import {PAYMENT_TYPE} from '../../constants';
class DeliveryCenterController extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      showChangeModeModal: false,
      itemSelected: {},
      showOneBtn: false,
    };
  }
  static propTypes = {deliveryList: PropTypes.array};
  static defaultProps = {deliveryList: []};

  componentDidMount() {
    this.initial();
  }

  onRefresh = () => {
    this.initial();
  };

  initial = () => {
    const {getDeliveryListRequest} = this.props;
    const payload = {
      status: [
        'accepted',
        'assigned_online',
        'assigned_offline',
        'user_approval_pending',
        'assigned_waspha',
      ],
    };
    this.setState({loading: true});

    getDeliveryListRequest(payload, response => {
      if (response) {
      }
      this.setState({loading: false});
    });
  };

  setValue = key => {
    this.setState(key);
  };

  isShowOneBtn = data => {
    if (
      data.new_delivery_fee < data.old_delivery_fee &&
      data.payment_method !== PAYMENT_TYPE.CASH_ON_DELIVERY
    ) {
      console.log('1');
      this.setState({showOneBtn: true});
    } else if (data.new_delivery_fee > data.old_delivery_fee) {
      console.log('2');

      this.setState({showOneBtn: false});
    } else if (data.new_delivery_fee < data.old_delivery_fee) {
      console.log('3');

      this.setState({showOneBtn: true});
    }
  };

  render() {
    const {loading, showChangeModeModal, itemSelected, showOneBtn} = this.state;
    return (
      <DeliveryCenterView
        loading={loading}
        itemSelected={itemSelected}
        showChangeModeModal={showChangeModeModal}
        showOneBtn={showOneBtn}
        setValue={this.setValue}
        onRefresh={this.onRefresh}
        isShowOneBtn={this.isShowOneBtn}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({delivery}) => ({
  deliveryList: delivery.deliveryList,
});

const actions = {getDeliveryListRequest};

export default connect(
  mapStateToProps,
  actions,
)(DeliveryCenterController);
