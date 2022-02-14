import {
  GET_DELIVERY_LIST,
  GET_DELIVERY_DETAILS,
  GET_DELIVERY_STATUS_DETAILS,
} from './ActionTypes';

export function getDeliveryListRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_DELIVERY_LIST.REQUEST,
  };
}

export function getDeliveryListSuccess(data) {
  return {
    data,
    type: GET_DELIVERY_LIST.SUCCESS,
  };
}

export function getDeliveryDetailsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_DELIVERY_DETAILS.REQUEST,
  };
}

export function getDeliveryDetailsSuccess(data) {
  return {
    data,
    type: GET_DELIVERY_DETAILS.SUCCESS,
  };
}

export function getDeliveryStatusDetailsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_DELIVERY_STATUS_DETAILS.REQUEST,
  };
}

export function getDeliveryStatusDetailsSuccess(data) {
  return {
    data,
    type: GET_DELIVERY_STATUS_DETAILS.SUCCESS,
  };
}
