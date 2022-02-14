import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {Actions} from 'react-native-router-flux';
import base64 from 'react-native-base64';
import MyCartView from './MyCartView';
import {connect} from 'react-redux';
import {createRFPRequest} from '../../actions/RFPActions';
import {clearCart} from '../../actions/CartActions';

class MyCartController extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      loginModal: false,
    };
  }
  static propTypes = {
    cartItems: PropTypes.array,
    userAddress: PropTypes.string,
    userCoordinates: PropTypes.object,
    storeId: PropTypes.number,
    categoryId: PropTypes.number,
    clearCart: PropTypes.func.isRequired,
    rfpVendors: PropTypes.array.isRequired,
    isDelivery: PropTypes.bool.isRequired,
    isPickup: PropTypes.bool.isRequired,
  };
  static defaultProps = {cartItems: [], userAddress: '', userCoordinates: {}};

  loginToProceed = () => {
    this.setState({loginModal: false});
    Actions.login();
  };

  onCheckOutPress = () => {
    const {
      userCoordinates,
      userAddress,
      createRFPRequest,
      storeId,
      clearCart,
      rfpVendors,
      isPickup,
      isDelivery,
      user,
    } = this.props;

    if (_.isNil(user.access_token)) {
      this.setState({loginModal: true});
      return true;
    }

    let items = this.props.cartItems.map(item => {
      let filterItem = {
        product_id: item.id,
        // name: item.title,
        // requirements: item.description,
        // image: item.image,
        quantity: item.quantity,
      };
      if (
        !_.isNil(item.additional_notes) &&
        !_.isEmpty(item.additional_notes)
      ) {
        filterItem['additional_notes'] = item.additional_notes;
      }
      return {
        ...filterItem,
      };
    });

    this.setState({loading: true});
    let payload = {
      subcategory_id: this.props.categoryId,
      store_id: storeId,
      items,

      delivery_location: {
        lat: userCoordinates.latitude,
        lng: userCoordinates.longitude,
        address: userAddress,
      },
      type: isPickup || !isDelivery ? 'pickup' : 'delivery',
    };

    // if (isPickup || !isDelivery) {
    //   delete payload.delivery_location;
    // }
    createRFPRequest(payload, response => {
      if (response.status) {
        clearCart();
        Actions.replace('orderplaceNearbyVendors', {
          rfpId: response.data.id,
          orderType: response.data.type,
          fromCheckout: true,
          rfpVendors,
          isParticularStore: true,
          fromStoreMenu: true,
        });
      }
      this.setState({loading: false});
    });
  };

  setValue = key => {
    this.setState(key);
  };

  render() {
    const {loading, loginModal} = this.state;
    return (
      <MyCartView
        onCheckOutPress={this.onCheckOutPress}
        loginModal={loginModal}
        loginToProceed={this.loginToProceed}
        setValue={this.setValue}
        loading={loading}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({cart, user, categories}) => ({
  cartItems: cart.cart,
  userAddress: user.data.address,
  userCoordinates: user.userCoordinates,
  isPickup: categories.isPickup,
  isDelivery: categories.isDelivery,
  user: user.data,
});

const actions = {createRFPRequest, clearCart};

export default connect(
  mapStateToProps,
  actions,
)(MyCartController);
