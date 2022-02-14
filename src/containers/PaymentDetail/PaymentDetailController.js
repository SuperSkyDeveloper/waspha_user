import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import PaymentDetailView from './PaymentDetailView';
import {connect} from 'react-redux';
import {makePaymentRequest} from '../../actions/PaymentActions';
import {closeRFPRequest} from '../../actions/RFPActions';
import {
  PAYMENT_TYPE,
  PLACED_ORDER_TYPE,
  RIDER_TYPE,
  strings,
} from '../../constants';
import {Actions} from 'react-native-router-flux';
import util from '../../util';
import {
  getMyOrderProposalsRequest,
  getMyProposalDetailsRequest,
} from '../../actions/ProposalsActions';
import {
  applyPromoCodeRequest,
  applyPromoCodeSuccess,
  clearSelectedPromoCode,
} from '../../actions/PromoCodesActions';

class PaymentDetailController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMoreProposalsModal: false,
      showThankYou: false,
      showPromoCodeModal: false,
      loading: false,
      selectedMethod:
        props.proposalDetails.invoice.total.value < props.moneyInWallet &&
        props.proposalDetails.delivery_mode !== RIDER_TYPE.WASPHA_EXPRESS
          ? PAYMENT_TYPE.WALLET
          : PAYMENT_TYPE.CASH_ON_DELIVERY,
      enteredPromoCode: null,
      enteredPromoCodeError: null,
      isConfirmBtn: true,
    };
  }
  static propTypes = {
    proposalId: PropTypes.number.isRequired,
    proposalDetails: PropTypes.object.isRequired,
    proposalsList: PropTypes.array,
  };
  static defaultProps = {proposalsList: []};

  //find if the applied promo code exist and is it valid  OR not

  handlePromoCode = () => {
    const {
      promos,
      selectedPromoCode,
      applyPromoCodeRequest,
      proposalId,
    } = this.props;

    this.setState({enteredPromoCodeError: null});
    if (
      _.isNil(this.state.enteredPromoCode) ||
      _.isEmpty(this.state.enteredPromoCode)
    ) {
      this.setState({enteredPromoCodeError: strings.ENTER_PROMO_CODE});
      return true;
    }

    let promoCode = _.find(promos, {
      promo_code: this.state.enteredPromoCode,
    });

    if (_.isNil(promoCode)) {
      this.setState({enteredPromoCodeError: strings.PROMO_CODE_NOT_AVAILABLE});
      return true;
    } else {
      this.setState({loading: true});

      let payload = {
        payment_method: this.state.selectedMethod,
        proposal_id: proposalId,
        promo_code_id: promoCode.id,
      };
      applyPromoCodeRequest(payload, response => {
        this.setState({loading: false});
        if (_.isNil(response.catchError)) {
          if (!response.status) {
            this.setState({enteredPromoCodeError: response.message});
            return true;
          } else {
            this.requestForProposalDetails(promoCode);
            this.setState({showPromoCodeModal: true});
          }
        } else {
          return true;
        }
      });
    }
  };

  onRemovePromoCode = () => {
    const {selectedPromoCode, applyPromoCodeSuccess} = this.props;
    this.requestForProposalDetails(null);

    this.setState({enteredPromoCode: null});
    applyPromoCodeSuccess(null);
  };

  requestForProposalDetails = promoCode => {
    const {
      getMyProposalDetailsRequest,
      proposalId,
      userCoordinates,
    } = this.props;

    let payload = {
      proposal_id: proposalId,

      location: {
        address: 'abc xyz',
        lat: userCoordinates.latitude,
        lng: userCoordinates.longitude,
      },
      payment_method: this.state.selectedMethod,
    };
    if (!_.isNil(promoCode)) {
      payload['promo_code_id'] = promoCode.id;
    }

    getMyProposalDetailsRequest(payload, response => {
      if (response) {
      }
    });
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  //accepts the proposal and makes payment for the proposal

  makePayment = () => {
    this.getRfpProposals();
  };

  getRfpProposals = () => {
    const {
      userCoordinates,
      getMyOrderProposalsRequest,
      proposalDetails,
    } = this.props;

    const payload = {
      id: proposalDetails.rfp_id,
      location: {
        address: 'abc xyz',
        lat: userCoordinates.latitude,
        lng: userCoordinates.longitude,
      },
    };

    getMyOrderProposalsRequest(payload, response => {
      if (response) {
      }
      this.performPayment();
    });
  };

  performPayment = () => {
    const {
      proposalId,
      makePaymentRequest,
      selectedPromoCode,
      clearSelectedPromoCode,
    } = this.props;

    let payload = {
      payment_method: this.state.selectedMethod,
      proposal_id: proposalId,
    };

    if (!_.isNil(selectedPromoCode)) {
      payload['promo_code_id'] = selectedPromoCode.id;
    }

    this.setState({loading: true});

    makePaymentRequest(payload, response => {
      if (response.status) {
        clearSelectedPromoCode();
        if (!_.isNil(response.data.payment_url)) {
          this.setState({loading: false});

          Actions.paymentForm({
            paymentUrl: response.data.payment_url,
            paymentHandle: this.paymentHandle,
          });
        } else {
          this.paymentHandle();
        }
      } else {
        this.setState({loading: false});
      }
    });
  };

  paymentHandle = async () => {
    const {proposalsList} = this.props;
    if (proposalsList.length > 1) {
      this.setState({isMoreProposalsModal: true, loading: false});
    } else {
      await this.hanldleMoreProposalsModal(true);
    }
  };

  //close --> checks if this rfp is done or not, if true then rfp is done and no more proposals...
  hanldleMoreProposalsModal = async close => {
    const {proposalDetails, closeRFPRequest} = this.props;
    this.setState({isConfirmBtn: false});
    let payload = {
      rfp_id: proposalDetails.rfp_id,
      close,
    };
    this.setState({loading: true});

    closeRFPRequest(payload, response => {
      this.setState({loading: false});

      if (response) {
        this.setState({isMoreProposalsModal: false, showThankYou: true});
      } else {
        this.setState({isConfirmBtn: true});
      }
    });
  };

  navigateToNextScreen = () => {
    if (
      Actions._state.routes[Actions._state.routes.length - 3].routeName ===
      'proposalList'
    ) {
      Actions.popTo('proposalList');
      Actions.replace('deliverycenter');
    } else {
      Actions.popTo('proposalDetail');
      Actions.replace('deliverycenter');
    }
  };

  handleMethod = selectedMethod => {
    this.setState({
      selectedMethod,
    });
  };

  setValue = key => {
    this.setState(key);
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  render() {
    const {
      isMoreProposalsModal,
      loading,
      selectedMethod,
      showThankYou,
      enteredPromoCode,
      enteredPromoCodeError,
      showPromoCodeModal,
      isConfirmBtn,
    } = this.state;
    return (
      <PaymentDetailView
        isMoreProposalsModal={isMoreProposalsModal}
        loading={loading}
        selectedMethod={selectedMethod}
        showThankYou={showThankYou}
        isConfirmBtn={isConfirmBtn}
        enteredPromoCode={enteredPromoCode}
        enteredPromoCodeError={enteredPromoCodeError}
        showPromoCodeModal={showPromoCodeModal}
        onRemovePromoCode={this.onRemovePromoCode}
        handlePromoCode={this.handlePromoCode}
        hanldleMoreProposalsModal={this.hanldleMoreProposalsModal}
        setValue={this.setValue}
        handleMethod={this.handleMethod}
        makePayment={this.makePayment}
        navigateToNextScreen={this.navigateToNextScreen}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({user, proposals, promoCodes}) => ({
  proposalDetails: proposals.proposalDetails,
  proposalsList: proposals.proposals,
  moneyInWallet: user.data.wallet,
  userCoordinates: user.userCoordinates,
  selectedPromoCode: promoCodes.selectedPromoCode,
  promos: promoCodes.promos,
});
const actions = {
  makePaymentRequest,
  closeRFPRequest,
  getMyOrderProposalsRequest,
  applyPromoCodeRequest,
  getMyProposalDetailsRequest,
  clearSelectedPromoCode,
  applyPromoCodeSuccess,
};

export default connect(
  mapStateToProps,
  actions,
)(PaymentDetailController);
