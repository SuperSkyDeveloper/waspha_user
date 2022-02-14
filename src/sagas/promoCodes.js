import {take, put, call, fork} from 'redux-saga/effects';
import {APPLY_PROMO_CODE, GET_PROMO_CODES} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT, strings} from '../constants';

import {
  GET_PROMO_CODES as GET_PROMO_CODES_URL,
  APPLY_PROMO_CODE as APPLY_PROMO_CODE_URL,
  callRequest,
} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';
import {
  getPromoCodesSuccess,
  applyPromoCodeSuccess,
} from '../actions/PromoCodesActions';
import util from '../util';
import {alertMessage} from '../actions/GeneralActions';

function alert(message, type = 'error') {
  setTimeout(() => {
    Util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* getPromoCodes() {
  while (true) {
    const {responseCallback} = yield take(GET_PROMO_CODES.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_PROMO_CODES_URL,
        {},
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getPromoCodesSuccess(response.data));

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

function* applyPromoCode() {
  while (true) {
    const {payload, responseCallback} = yield take(APPLY_PROMO_CODE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        APPLY_PROMO_CODE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(applyPromoCodeSuccess(response.promo_code));
        if (responseCallback) responseCallback(response);
      } else {
        yield put(applyPromoCodeSuccess(null));

        if (responseCallback) responseCallback(response);
      }
    } catch (err) {
      yield put(applyPromoCodeSuccess(null));
      if (responseCallback) responseCallback({status: false, catchError: true});
    }
  }
}

export default function* root() {
  yield fork(getPromoCodes);
  yield fork(applyPromoCode);
}
