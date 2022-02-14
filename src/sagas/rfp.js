import {take, put, call, fork} from 'redux-saga/effects';
import {
  CREATE_RFP,
  CANCEL_RFP,
  CLOSE_RFP,
  GET_RFP_LISTING,
} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT, strings} from '../constants';

import {
  CREATE_RFP as CREATE_RFP_URL,
  GET_RFP_LISTING as GET_RFP_LISTING_URL,
  CANCEL_RFP as CANCEL_RFP_URL,
  CLOSE_RFP as CLOSE_RFP_URL,
  callRequest,
} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';

import util from '../util';
import {
  createRFPSuccess,
  getRFPListingSuccess,
  cancelRFPSuccess,
} from '../actions/RFPActions';
import {alertMessage} from '../actions/GeneralActions';

function alert(message, type = 'error') {
  setTimeout(() => {
    Util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* createRFP() {
  while (true) {
    const {payload, responseCallback} = yield take(CREATE_RFP.REQUEST);
    try {
      const response = yield call(
        callRequest,
        CREATE_RFP_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback) responseCallback(response);
      } else {
        if (responseCallback) responseCallback(response);
        //util.topAlert(response.message);
        yield put(alertMessage(response.message));
      }
    } catch (err) {
      if (responseCallback) responseCallback({status: false});
    }
  }
}

function* getRFPListing() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_RFP_LISTING.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_RFP_LISTING_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(
          getRFPListingSuccess({items: response.data, status: payload.status}),
        );

        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
        //util.topAlert(strings.SOMETHING_WENT_WRONG)
        yield put(alertMessage(strings.SOMETHING_WENT_WRONG));
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* cancelRFP() {
  while (true) {
    const {payload, responseCallback} = yield take(CANCEL_RFP.REQUEST);
    try {
      const response = yield call(
        callRequest,
        CANCEL_RFP_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(cancelRFPSuccess(payload.rfp_id));

        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
        //util.topAlert(strings.SOMETHING_WENT_WRONG)
        yield put(alertMessage(strings.SOMETHING_WENT_WRONG));
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* closeRFP() {
  while (true) {
    const {payload, responseCallback} = yield take(CLOSE_RFP.REQUEST);
    try {
      const response = yield call(
        callRequest,
        CLOSE_RFP_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(cancelRFPSuccess(payload.rfp_id));

        if (responseCallback) responseCallback(response.status);
      } else {
        //util.topAlert(strings.SOMETHING_WENT_WRONG)
        yield put(alertMessage(strings.SOMETHING_WENT_WRONG));
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

export default function* root() {
  yield fork(createRFP);
  yield fork(cancelRFP);
  yield fork(closeRFP);
  yield fork(getRFPListing);
}
