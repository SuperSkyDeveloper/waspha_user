import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {View, ActivityIndicator} from 'react-native';
import PaymentFormView from './PaymentFormView';
import {Colors, AppStyles} from '../../theme';
import {Actions} from 'react-native-router-flux';
import util from '../../util';
import {strings} from '../../constants';
import {alertMessage} from '../../actions/GeneralActions';
import {Loader} from '../../components';

class PaymentFormController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    paymentUrl: PropTypes.string.isRequired,
    paymentHandle: PropTypes.func,
  };

  static defaultProps = {paymentHandle: () => {}};

  onMessage = event => {
    console.log('SDJH0', event);

    const {paymentHandle, alertMessage} = this.props;
    // console.log('On Message', event.nativeEvent.data);
    if (event.nativeEvent.data === 'paymentSuccess') {
      Actions.pop();

      setTimeout(() => {
        paymentHandle();
      }, 200);
    } else if (event.nativeEvent.data === 'paymentFail') {
      // util.topAlert(strings.PAYMENT_FAILED_TRY_AGAIN);
      alertMessage(strings.PAYMENT_FAILED_TRY_AGAIN);
      Actions.pop();
    } else {
      // util.topAlert(strings.PAYMENT_FAILED_TRY_AGAIN);
      alertMessage(strings.PAYMENT_FAILED_TRY_AGAIN);

      Actions.pop();
    }
  };

  indicator = () => {
    return (
      <View
        style={[
          AppStyles.flex,
          AppStyles.alignItemsCenter,
          AppStyles.primaryBackground,
        ]}>
        <ActivityIndicator size="large" color={Colors.green} />
      </View>
    );
  };

  render() {
    return (
      <PaymentFormView
        renderLoading={this.indicator}
        onMessage={this.onMessage}
        paymentUrl={this.props.paymentUrl}
      />
    );
  }
}

const mapStateToProps = () => ({});

const actions = {alertMessage};

export default connect(
  mapStateToProps,
  actions,
)(PaymentFormController);
