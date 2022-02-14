import React from 'react';
import PropTypes from 'prop-types';
import WalletItemView from './WalletItemView';
import {connect} from 'react-redux';

class WalletItemController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {moneyInWallet: PropTypes.number.isRequired};
  static defaultProps = {};

  render() {
    return <WalletItemView {...this.props} />;
  }
}

const mapStateToProps = ({user}) => ({
  moneyInWallet: user.data.wallet,
  user: user.data,
});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(WalletItemController);
