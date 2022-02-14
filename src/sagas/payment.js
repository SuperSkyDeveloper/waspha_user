import {take, put, call, fork} from 'redux-saga/effects';
import {MAKE_PAYMENT} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT, strings} from '../constants';

import {
  MAKE_PAYMENT as MAKE_PAYMENT_URL,
  callRequest,
} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';
import {updateUserData} from '../actions/UserActions';
import util from '../util';
import {alertMessage} from '../actions/GeneralActions';

function alert(message, type = 'error') {
  setTimeout(() => {
    util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* makePayment() {
  while (true) {
    const {payload, responseCallback} = yield take(MAKE_PAYMENT.REQUEST);
    try {
      const response = yield call(
        callRequest,
        MAKE_PAYMENT_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(updateUserData(response.data));
        //util.topAlert(response.message);
        yield put(alertMessage(response.message));
        if (responseCallback) responseCallback(response);
      } else {
        //util.topAlert(strings.SOMETHING_WENT_WRONG)
        yield put(
          alertMessage(response.message || strings.SOMETHING_WENT_WRONG),
        );
        if (responseCallback) responseCallback(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback({status: false});
    }
  }
}

export default function* root() {
  yield fork(makePayment);
}
