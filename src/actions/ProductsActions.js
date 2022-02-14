// @flow

import {
  GET_TRENDING_PRODUCTS,
  GET_STORE_PRODUCTS,
  CLEAR_STORE_PRODUCTS,
  SEARCH_STORE_PRODUCTS,
} from './ActionTypes';

export function getTrendingProductsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_TRENDING_PRODUCTS.REQUEST,
  };
}

export function getTrendingProductsSuccess(data) {
  return {
    data,
    type: GET_TRENDING_PRODUCTS.SUCCESS,
  };
}

export function getStoreProductsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_STORE_PRODUCTS.REQUEST,
  };
}

export function getStoreProductsSuccess(data) {
  return {
    data,
    type: GET_STORE_PRODUCTS.SUCCESS,
  };
}

export function searchStoreProductsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: SEARCH_STORE_PRODUCTS.REQUEST,
  };
}

export function searchStoreProductsSuccess(data) {
  return {
    type: SEARCH_STORE_PRODUCTS.SUCCESS,
  };
}

export function clearStoreProducts() {
  return {
    type: CLEAR_STORE_PRODUCTS.SUCCESS,
  };
}
