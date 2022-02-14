import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import CartItemView from './CartItemView';
import {connect} from 'react-redux';
import {addCartProduct, removeCartProduct} from '../../actions/CartActions';

class CartItemController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: _.isNil(props.item.quantity) ? 0 : props.item.quantity,
    };
  }
  static propTypes = {
    item: PropTypes.object.isRequired,
    addCartProduct: PropTypes.func,
    removeCartProduct: PropTypes.func,
    fromMyCart: PropTypes.bool,
  };
  static defaultProps = {
    addCartProduct: () => {},
    removeCartProduct: () => {},
    fromMyCart: false,
  };
  handleChangeQuantity = quantity => {
    if (quantity !== 0) {
      this.setState({quantity}, this.handleAddProduct);
    }
  };

  handleAddProduct = () => {
    const {item} = this.props;

    let tempProduct = _.cloneDeep(item);
    tempProduct['quantity'] = this.state.quantity;
    this.props.addCartProduct(tempProduct);
  };

  handleRemoveProduct = productId => {
    this.props.removeCartProduct(productId);
  };

  render() {
    const {quantity} = this.state;
    return (
      <CartItemView
        {...this.props}
        quantity={quantity}
        handleChangeQuantity={this.handleChangeQuantity}
        handleRemoveProduct={this.handleRemoveProduct}
      />
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {
  addCartProduct,
  removeCartProduct,
};

export default connect(
  mapStateToProps,
  actions,
)(CartItemController);
