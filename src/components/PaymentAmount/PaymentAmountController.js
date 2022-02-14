import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import PaymentAmountView from './PaymentAmountView';
import {connect} from 'react-redux';
import {APPLY_ON_OPTIONS} from '../../constants';

class PaymentAmountController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShareModelShow: false,
      isDiscounted: false,
      billItems: props.paymentDetails.bill,
    };
  }
  static propTypes = {
    makePayment: PropTypes.func,
    paymentDetails: PropTypes.object.isRequired,
    showWallet: PropTypes.bool,
    selectedMethod: PropTypes.string.isRequired,
    isConfirmBtn: PropTypes.bool,
  };
  static defaultProps = {
    makePayment: () => {},
    showWallet: false,
    isConfirmBtn: true,
  };

  componentDidMount = () => {
    this.handleBill();
  };

  // handle share btn
  handleShareBtn = () => {
    this.setState({
      isShareModelShow: !this.state.isShareModelShow,
    });
  };

  handleBill = () => {
    const {paymentDetails} = this.props;
    if (paymentDetails.bill[0].value > paymentDetails.bill[1].value) {
      this.setState({isDiscounted: true});
    } else {
      this.removeDiscountAmount();
    }
  };

  removeDiscountAmount = () => {
    const {paymentDetails} = this.props;

    let billItems = _.cloneDeep(paymentDetails.bill);
    delete billItems[1];
    this.setState({billItems});
  };

  validateApplyPromo = item => {
    const {selectedPromoCode} = this.props;
    const {isDiscounted} = this.state;

    return (
      !_.isNil(selectedPromoCode) &&
      ((selectedPromoCode.apply_on === item.key && item.key !== 'subtotal') ||
        (selectedPromoCode.apply_on === item.key &&
          item.key === 'subtotal' &&
          !isDiscounted) ||
        (selectedPromoCode.apply_on === 'subtotal' &&
          item.key === 'subtotal_discounted' &&
          isDiscounted))
    );
  };

  getPromoCodeTotal = () => {
    const {selectedPromoCode, paymentDetails} = this.props;

    return (
      !_.isNil(paymentDetails.total.discounted_value) &&
      !_.isNil(selectedPromoCode) &&
      selectedPromoCode.apply_on === APPLY_ON_OPTIONS.TOTAL
    );
  };

  render() {
    const {isShareModelShow, isDiscounted, billItems} = this.state;
    return (
      <PaymentAmountView
        {...this.props}
        isDiscounted={isDiscounted}
        isShareModelShow={isShareModelShow}
        billItems={billItems}
        getPromoCodeTotal={this.getPromoCodeTotal}
        validateApplyPromo={this.validateApplyPromo}
        handleShareBtn={this.handleShareBtn}
      />
    );
  }
}

const mapStateToProps = ({user, proposals, promoCodes}) => ({
  user: user.data,
  proposalDetails: proposals.proposalDetails,
  selectedPromoCode: promoCodes.selectedPromoCode,
});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(PaymentAmountController);
