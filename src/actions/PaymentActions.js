// @flow

import {MAKE_PAYMENT} from './ActionTypes';

export function makePaymentRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: MAKE_PAYMENT.REQUEST,
  };
}

export function makePaymentSuccess(data) {
  return {
    data,
    type: MAKE_PAYMENT.SUCCESS,
  };
}
