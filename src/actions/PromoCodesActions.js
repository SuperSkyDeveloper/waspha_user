// @flow

import {
  APPLY_PROMO_CODE,
  CLEAR_PROMO_CODE,
  GET_PROMO_CODES,
} from './ActionTypes';

export function getPromoCodesRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_PROMO_CODES.REQUEST,
  };
}

export function getPromoCodesSuccess(data) {
  return {
    data,
    type: GET_PROMO_CODES.SUCCESS,
  };
}

export function applyPromoCodeRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: APPLY_PROMO_CODE.REQUEST,
  };
}

export function applyPromoCodeSuccess(data) {
  return {
    data,
    type: APPLY_PROMO_CODE.SUCCESS,
  };
}

export function clearSelectedPromoCode() {
  return {
    type: CLEAR_PROMO_CODE,
  };
}
