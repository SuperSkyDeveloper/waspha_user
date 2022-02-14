// @flow

import {
  CART,
  REMOVE_CART_PRODUCT,
  ADD_CART_PRODUCT,
  CLEAR_CART,
} from './ActionTypes';

export function cartRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CART.REQUEST,
  };
}

export function cartSuccess(data) {
  return {
    data,
    type: CART.SUCCESS,
  };
}

export function removeCartProduct(data) {
  return {
    data,
    type: REMOVE_CART_PRODUCT.SUCCESS,
  };
}

export function addCartProduct(data) {
  return {
    data,
    type: ADD_CART_PRODUCT.SUCCESS,
  };
}

export function clearCart() {
  return {
    type: CLEAR_CART,
  };
}
