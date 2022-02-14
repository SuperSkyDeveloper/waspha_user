import React from 'react';
import PropTypes from 'prop-types';
import WalletSectionView from './WalletSectionView';
import {connect} from 'react-redux';

class WalletSectionController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    moneyInWallet: PropTypes.number.isRequired,
    selectedMethod: PropTypes.string.isRequired,
    handleMethod: PropTypes.func.isRequired,
    showWallet: PropTypes.bool.isRequired,
    enteredPromoCode: PropTypes.string,
    setValue: PropTypes.func,
    handlePromoCode: PropTypes.func,
    onRemovePromoCode: PropTypes.func,
    proposalDetails: PropTypes.object,
  };
  static defaultProps = {};

  render() {
    return <WalletSectionView {...this.props} />;
  }
}

const mapStateToProps = ({user, promoCodes, proposals}) => ({
  moneyInWallet: user.data.wallet,
  user: user.data,
  selectedPromoCode: promoCodes.selectedPromoCode,
  proposalDetails: proposals.proposalDetails,
});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(WalletSectionController);
