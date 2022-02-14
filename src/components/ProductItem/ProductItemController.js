import React from 'react';
import _ from 'lodash';
import {addCartProduct, clearCart, removeCartProduct} from '../../actions/CartActions';
import PropTypes from 'prop-types';
import ProductItemView from './ProductItemView';
import {connect} from 'react-redux';
import {setTimer} from '../../helpers/generalHelper';

class ProductItemController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: _.isNil(props.item.quantity) ? 0 : props.item.quantity,
      expiryDuration:
        props.item.is_featured && !_.isNil(props.item.menu_promotion)
          ? setTimer(props.item.menu_promotion.expiry_time)
          : null,

      isFeatureModal: false,
    };
  }
  static propTypes = {
    item: PropTypes.object.isRequired,
    addCartProduct: PropTypes.func,
    removeCartProduct: PropTypes.func,
    storeId:PropTypes.number
  };
  static defaultProps = {
    addCartProduct: () => {},
    removeCartProduct: () => {},
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.item.quantity !== this.props.item.quantity) {
      this.setState({quantity: this.props.item.quantity});
    }
  }

  handleChangeQuantity = quantity => {
    this.setState({quantity}, this.handleAddProduct);
  };

  handleAddProduct = () => {
    const {item,clearCart} = this.props;
    if( this.props.selectedShopId!==this.props.storeId){
      clearCart()
    }
    if (this.state.quantity === 0) {
      this.handleRemoveProductFromCart(item.id);
      return true;
    }
    let tempProduct = _.cloneDeep(item);
    tempProduct['quantity'] = this.state.quantity;
    this.props.addCartProduct(tempProduct);
  };

  handleRemoveProductFromCart = productId => {
    this.props.removeCartProduct(productId);
  };

  setValue = key => {
    this.setState(key);
  };

  render() {
    const {quantity, isFeatureModal, expiryDuration} = this.state;
    return (
      <ProductItemView
        quantity={quantity}
        isFeatureModal={isFeatureModal}
        expiryDuration={expiryDuration}
        handleChangeQuantity={this.handleChangeQuantity}
        setValue={this.setValue}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({shops}) => ({
  selectedShopId:shops.selectedShopId

});

const actions = {addCartProduct, removeCartProduct,clearCart};

export default connect(
  mapStateToProps,
  actions,
)(ProductItemController);
