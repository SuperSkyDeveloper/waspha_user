import React from 'react';
import PropTypes from 'prop-types';
import PaymentMethodView from './PaymentMethodView';
import {connect} from 'react-redux';

class PaymentMethodController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {};
  static defaultProps = {};

  render() {
    return <PaymentMethodView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(PaymentMethodController);
