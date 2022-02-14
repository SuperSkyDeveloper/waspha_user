import {take, put, call, fork} from 'redux-saga/effects';
import {
  GET_DELIVERY_LIST,
  GET_DELIVERY_DETAILS,
  GET_DELIVERY_STATUS_DETAILS,
} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT, strings} from '../constants';
import {
  getDeliveryListSuccess,
  getDeliveryDetailsSuccess,
  getDeliveryStatusDetailsSuccess,
} from '../actions/DeliveryActions';
import {
  GET_DELIVERY_LIST as GET_DELIVERY_LIST_URL,
  GET_DELIVERY_DETAILS as GET_DELIVERY_DETAILS_URL,
  GET_DELIVERY_STATUS_DETAILS as GET_DELIVERY_STATUS_DETAILS_URL,
  callRequest,
} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';
import util from '../util';
import {alertMessage} from '../actions/GeneralActions';

function alert(message, type = 'error') {
  setTimeout(() => {
    util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* getDeliveryList() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_DELIVERY_LIST.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_DELIVERY_LIST_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getDeliveryListSuccess(response.data));
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

function* getDeliveryDetails() {
  while (true) {
    const {payload, responseCallback} = yield take(
      GET_DELIVERY_DETAILS.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        GET_DELIVERY_DETAILS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getDeliveryDetailsSuccess(response.data));
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

function* getDeliveryStatusDetails() {
  while (true) {
    const {payload, responseCallback} = yield take(
      GET_DELIVERY_STATUS_DETAILS.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        GET_DELIVERY_STATUS_DETAILS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getDeliveryStatusDetailsSuccess(response.data));
        if (responseCallback) responseCallback(response);
      } else {
        if (responseCallback) responseCallback(response);
        //util.topAlert(strings.SOMETHING_WENT_WRONG)
        yield put(alertMessage(strings.SOMETHING_WENT_WRONG));
      }
    } catch (err) {
      if (responseCallback) responseCallback({status:false});
    }
  }
}

export default function* root() {
  yield fork(getDeliveryList);
  yield fork(getDeliveryDetails);
  yield fork(getDeliveryStatusDetails);
}
