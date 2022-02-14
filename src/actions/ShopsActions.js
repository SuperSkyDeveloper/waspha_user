import {
  GET_NEARBY_SHOPS,
  GET_SHOP_DETAILS,
  GET_SHOP_REVIEWS,
  GET_SHOP_POLICY,
  GET_QUEUE,
  CLEAR_QUEUE_VENDORS,
  NO_QUEUE_VENDORS_FOUND,
  FAKE_ORDER_FOUND,
  STORE_SELECTED_SHOP_ID,
  CLEAR_SELECTED_SHOP_ID
} from './ActionTypes';

export function getNearbyShopsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_NEARBY_SHOPS.REQUEST,
  };
}
export function getNearbyShopsSuccess(data) {
  return {
    data,
    type: GET_NEARBY_SHOPS.SUCCESS,
  };
}

export function getShopDetailsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_SHOP_DETAILS.REQUEST,
  };
}
export function getShopDetailsSuccess(data) {
  return {
    data,
    type: GET_SHOP_DETAILS.SUCCESS,
  };
}
export function getShopReviewsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_SHOP_REVIEWS.REQUEST,
  };
}
export function getShopReviewsSuccess(data) {
  return {
    data,
    type: GET_SHOP_REVIEWS.SUCCESS,
  };
}

export function getShopPolicyRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_SHOP_POLICY.REQUEST,
  };
}

export function getQueueRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_QUEUE.REQUEST,
  };
}

export function getQueueSuccess(data) {
  return {
    data,
    type: GET_QUEUE.SUCCESS,
  };
}

export function clearQueueVendors() {
  return {
    type: CLEAR_QUEUE_VENDORS,
  };
}

export function noQueueVendorsFound(data) {
  return {
    data,
    type: NO_QUEUE_VENDORS_FOUND,
  };
}

export function fakeOrderFound(data) {
  return {
    data,
    type: FAKE_ORDER_FOUND,
  };
}


export function storeSelectedShopId(data){
  return{
    data,
    type: STORE_SELECTED_SHOP_ID,

  }  }

  export function clearSelectedShopId(){
    return{
      type: STORE_SELECTED_SHOP_ID,
  
    }}
