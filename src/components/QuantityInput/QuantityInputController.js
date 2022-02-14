import React from 'react';
import PropTypes from 'prop-types';
import QuantityInputView from './QuantityInputView';
import {connect} from 'react-redux';

class QuantityInputController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: props.incomingQuantity,
    };
  }
  static propTypes = {
    incomingQuantity: PropTypes.number,
    handleChangeQuantity: PropTypes.func,
    fromMyCart: PropTypes.bool,
    itemId: PropTypes.number,
    fromStore:PropTypes.bool
  };
  static defaultProps = {
    incomingQuantity: 0,
    handleChangeQuantity: () => {},
    fromMyCart: false,
    itemId: 0,
    fromStore:false
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.incomingQuantity !== this.props.incomingQuantity) {
      this.setState({quantity: this.props.incomingQuantity});
    }
  }

  handleIncrement = () => {
    const {quantity} = this.state;
    this.setState(
      {
        quantity: quantity + 1,
      },

      this.props.handleChangeQuantity(quantity + 1),
    );
  };

  handleDecrement = () => {
    const {quantity} = this.state;
    const {fromMyCart} = this.props;

    if (fromMyCart && quantity === 1) {
      this.props.handleChangeQuantity(quantity);

      return true;
    }

    if (quantity !== 0) {
      this.setState(
        {
          quantity: this.state.quantity - 1,
        },

        this.props.handleChangeQuantity(quantity - 1),
      );
    }
  };

  render() {
    return (
      <QuantityInputView
        {...this.props}
        quantity={this.state.quantity}
        handleIncrement={this.handleIncrement}
        handleDecrement={this.handleDecrement}
      />
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(QuantityInputController);
