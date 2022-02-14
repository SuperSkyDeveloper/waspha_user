import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TrendingProductsItemView from './TrendingProductsItemView';
import {addCartProduct, clearCart, removeCartProduct} from '../../actions/CartActions';

class TrendingProductsItemController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: _.isNil(props.item.quantity) ? 0 : props.item.quantity,
    };
  }
  static propTypes = {
    item: PropTypes.object.isRequired,
    horizontal: PropTypes.bool,
    storeId:PropTypes.number
  };
  static defaultProps = {
    horizontal: false,
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
    const {item,     clearCart    } = this.props;

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

  render() {
    const {quantity} = this.state;

    return (
      <TrendingProductsItemView
        quantity={quantity}
        handleChangeQuantity={this.handleChangeQuantity}
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
)(TrendingProductsItemController);
