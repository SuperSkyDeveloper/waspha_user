import React from 'react';
import PropTypes from 'prop-types';
import ChangeModeModalView from './ChangeModeModalView';
import {connect} from 'react-redux';
import {respondToProposalRequest} from '../../actions/ProposalsActions';
import {Actions} from 'react-native-router-flux';
import {PAYMENT_TYPE, strings} from '../../constants';

class ChangeModeModalController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    modalType: PropTypes.string,
    closeModal: PropTypes.func,
    isModalOpen: PropTypes.bool,
    callBack: PropTypes.func,
    selectedModeId: PropTypes.number,
    onSubmit: PropTypes.func,
    isLoading: PropTypes.bool,
    data: PropTypes.object,
    id: PropTypes.number,
    showOneBtn: PropTypes.bool,
    item: PropTypes.object,
    fromDeliveryCenter: PropTypes.bool,
  };
  static defaultProps = {
    data: {},
    modalType: '',
    closeModal: () => {},
    isModalOpen: false,
    isLoading: false,
    callBack: () => {},
    selectedModeId: 2,
    onSubmit: () => {},
    id: 0,
    showOneBtn: false,
    fromDeliveryCenter: false,
  };

  componentDidMount() {
    const {selectedModeId} = this.props;
    this.setState({activeId: selectedModeId});
  }

  setValue = key => {
    this.setState(key);
  };

  handleMainText = () => {
    if (this.props.showOneBtn && !this.props.fromDeliveryCenter) {
      return strings.YOUR_RIDER_CANCELLED_ORDER_PLEASE_WAIT_WHILE_WE_ASSIGN_ANOTHER_RIDER;
    }
    return this.getStringForChangeMode();
  };

  getStringForChangeMode = () => {
    const {user, data} = this.props;
    if (
      data.new_delivery_fee < data.old_delivery_fee &&
      data.payment_method !== PAYMENT_TYPE.CASH_ON_DELIVERY
    ) {
      // return Amount refunded in your wallet

      return `${strings.YOU_ARE_REFUNDED_AMOUNT_IN_WALLET}

${user.currency_code} ${(data.old_delivery_fee - data.new_delivery_fee).toFixed(
        2,
      )}
      
      `;
    } else if (data.new_delivery_fee > data.old_delivery_fee) {
      // return You need to pay extra amount on delivery in cash

      return `${strings.YOU_NEED_TO_PAY_EXTRA_AMOUNT_ON_DELIVERY_IN_CASH}

${user.currency_code} ${(data.new_delivery_fee - data.old_delivery_fee).toFixed(
        2,
      )}
      `;
    } else if (data.new_delivery_fee < data.old_delivery_fee) {
      // return You need to pay less amount on delivery in cash

      return `${strings.YOU_NEED_TO_PAY_LESS_AMOUNT_ON_DELIVERY_IN_CASH}
      
${user.currency_code} ${(data.old_delivery_fee - data.new_delivery_fee).toFixed(
        2,
      )}
      `;
    }
  };
  handleOrder = accept => {
    const {respondToProposalRequest, id} = this.props;

    let payload = {
      proposal_id: id,
      accept,
    };
    respondToProposalRequest(payload, res => {
      if (res) {
        if (accept) {
          Actions.replace('deliverycenter');
        } else {
          Actions.reset('drawerMenu');
        }
      }
    });
  };

  render() {
    return (
      <ChangeModeModalView
        setValue={this.setValue}
        handleOrder={this.handleOrder}
        handleMainText={this.handleMainText}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({user}) => ({
  user: user.data,
});

const actions = {respondToProposalRequest};

export default connect(
  mapStateToProps,
  actions,
)(ChangeModeModalController);
