// @flow

import {
  REMOVE_ORDER,
  REMOVE_PROPOSAL_ITEM,
  GET_MY_ORDER_DETAILS,
  GET_REORDER_LIST,
  GET_REORDER_DETAILS,
  IS_ORDER_RATED,
  GET_ACTIVE_ORDERS
} from './ActionTypes';

export function removeOrderRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: REMOVE_ORDER.REQUEST,
  };
}

export function removeOrderSuccess(data) {
  return {
    data,
    type: REMOVE_ORDER.SUCCESS,
  };
}

export function removeProposalItemRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: REMOVE_PROPOSAL_ITEM.REQUEST,
  };
}

export function removeProposalItemSuccess(data) {
  return {
    data,
    type: REMOVE_PROPOSAL_ITEM.SUCCESS,
  };
}

export function getMyOrderDetailsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_MY_ORDER_DETAILS.REQUEST,
  };
}

export function getMyOrderDetailsSuccess(data) {
  return {
    data,
    type: GET_MY_ORDER_DETAILS.SUCCESS,
  };
}

export function getReOrderListRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_REORDER_LIST.REQUEST,
  };
}

export function getReOrderListSuccess(data) {
  return {
    data,
    type: GET_REORDER_LIST.SUCCESS,
  };
}

export function getReOrderDetailsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_REORDER_DETAILS.REQUEST,
  };
}

export function getReOrderDetailsSuccess(data) {
  return {
    data,
    type: GET_REORDER_DETAILS.SUCCESS,
  };
}

export function isOrderRatedRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: IS_ORDER_RATED.REQUEST,
  };
}

export function isOrderRatedSuccess(data) {
  return {
    data,
    type: IS_ORDER_RATED.SUCCESS,
  };
}

export function getActiveOrdersRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_ACTIVE_ORDERS.REQUEST,
  };
}

export function getActiveOrdersSuccess(data) {
  return {
    data,
    type: GET_ACTIVE_ORDERS.SUCCESS,
  };
}
