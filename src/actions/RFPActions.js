// @flow

import {
  CREATE_RFP,
  CANCEL_RFP,
  CLOSE_RFP,
  GET_RFP_LISTING,
} from './ActionTypes';

export function createRFPRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CREATE_RFP.REQUEST,
  };
}

export function createRFPSuccess(data) {
  return {
    data,
    type: CREATE_RFP.SUCCESS,
  };
}
export function cancelRFPRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CANCEL_RFP.REQUEST,
  };
}

export function cancelRFPSuccess(data) {
  return {
    data,
    type: CANCEL_RFP.SUCCESS,
  };
}

export function closeRFPRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CLOSE_RFP.REQUEST,
  };
}

export function getRFPListingRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_RFP_LISTING.REQUEST,
  };
}

export function getRFPListingSuccess(data) {
  return {
    data,
    type: GET_RFP_LISTING.SUCCESS,
  };
}
