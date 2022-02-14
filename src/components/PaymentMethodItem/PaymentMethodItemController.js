import React from 'react';
import PropTypes from 'prop-types';
import PaymentMethodItemView from './PaymentMethodItemView';
import {connect} from 'react-redux';

class PaymentMethodItemController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {};
  static defaultProps = {};

  render() {
    return <PaymentMethodItemView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(PaymentMethodItemController);
