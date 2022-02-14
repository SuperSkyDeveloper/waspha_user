// @flow
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {
  CART,
  REMOVE_CART_PRODUCT,
  ADD_CART_PRODUCT,
  CLEAR_CART,
} from '../actions/ActionTypes';
import {Images} from '../theme';

const initialState = Immutable({
  cart: [],
});

export default (state = initialState, action) => {
  switch (action.type) {
    case CART.SUCCESS: {
      return Immutable.merge(state, {
        cart: state.cart,
      });
    }

    case ADD_CART_PRODUCT.SUCCESS: {
      let tempCart = _.cloneDeep(state.cart);
      var index = _.findIndex(tempCart, _.pick(action.data, 'id'));
      if (index !== -1) {
        tempCart.splice(index, 1, action.data);
      } else {
        tempCart.push(action.data);
      }

      return Immutable.merge(state, {
        cart: tempCart,
      });
    }
    case REMOVE_CART_PRODUCT.SUCCESS: {
      let temp = _.cloneDeep(state.cart);

      const findIndex = _.findIndex(state.cart, {
        id: action.data,
      });

      temp.splice(findIndex, 1);
      return Immutable.merge(state, {
        cart: temp,
      });
    }

    case CLEAR_CART: {
      return Immutable.merge(state, {
        cart: [],
      });
    }

    default:
      return state;
  }
};
