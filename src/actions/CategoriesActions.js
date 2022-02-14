import {
  GET_AVAILABLE_CATEGORIES,
  CLEAR_STORE_CATEGORIES,
  GET_STORE_CATEGORIES,
  UPDATE_DELIVERY_METHOD,
  GET_CATEGORY_DETAILS,
} from './ActionTypes';

export function getCategoriesRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_AVAILABLE_CATEGORIES.REQUEST,
  };
}
export function getCategoriesSuccess(data) {
  return {
    data,
    type: GET_AVAILABLE_CATEGORIES.SUCCESS,
  };
}

export function getCategoryDetailsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_CATEGORY_DETAILS.REQUEST,
  };
}
export function getCategoryDetailsSuccess(data) {
  return {
    data,
    type: GET_CATEGORY_DETAILS.SUCCESS,
  };
}

export function getStoreCategoriesRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_STORE_CATEGORIES.REQUEST,
  };
}
export function getStoreCategoriesSuccess(data) {
  return {
    data,
    type: GET_STORE_CATEGORIES.SUCCESS,
  };
}

export function clearStoreCategories() {
  return {
    type: CLEAR_STORE_CATEGORIES.SUCCESS,
  };
}

export function updateDeliveryMethod(data) {
  return {
    data,
    type: UPDATE_DELIVERY_METHOD.SUCCESS,
  };
}
