import {take, put, call, fork} from 'redux-saga/effects';
import {
  GET_MY_ORDER_DETAILS,
  GET_REORDER_LIST,
  GET_REORDER_DETAILS,
  IS_ORDER_RATED,
  GET_ACTIVE_ORDERS,
} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT, strings} from '../constants';
import {
  GET_MY_ORDER_DETAILS as GET_MY_ORDER_DETAILS_URL,
  GET_REORDER_LIST as GET_REORDER_LIST_URL,
  GET_REORDER_DETAILS as GET_REORDER_DETAILS_URL,
  IS_ORDER_RATED as IS_ORDER_RATED_URL,
  GET_ACTIVE_ORDERS as GET_ACTIVE_ORDERS_URL,
  callRequest,
} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';
import util from '../util';
import {
  getMyOrderDetailsSuccess,
  getReOrderListSuccess,
  getReOrderDetailsSuccess,
  isOrderRatedSuccess,
  getActiveOrdersSuccess,
} from '../actions/OrdersActions';
import {alertMessage} from '../actions/GeneralActions';
function alert(message, type = 'error') {
  setTimeout(() => {
    util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* isOrderRated() {
  while (true) {
    const {payload, responseCallback} = yield take(IS_ORDER_RATED.REQUEST);
    try {
      const response = yield call(
        callRequest,
        IS_ORDER_RATED_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(isOrderRatedSuccess(response.data.is_rated));

        if (responseCallback) responseCallback(response);
      } else {
        if (responseCallback) responseCallback(response);
        //util.topAlert(strings.SOMETHING_WENT_WRONG)
        yield put(alertMessage(strings.SOMETHING_WENT_WRONG));
      }
    } catch (err) {
      if (responseCallback) responseCallback({status: false});
    }
  }
}

function* getMyOrderDetails() {
  while (true) {
    const {payload, responseCallback} = yield take(
      GET_MY_ORDER_DETAILS.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        GET_MY_ORDER_DETAILS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getMyOrderDetailsSuccess(response.data));

        if (responseCallback) responseCallback(response);
      } else {
        if (responseCallback) responseCallback(response);
        //util.topAlert(strings.SOMETHING_WENT_WRONG)
        yield put(alertMessage(strings.SOMETHING_WENT_WRONG));
      }
    } catch (err) {
      if (responseCallback) responseCallback({status: false});
    }
  }
}

function* getReOrderList() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_REORDER_LIST.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_REORDER_LIST_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getReOrderListSuccess(response.data));

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

function* getReOrderDetails() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_REORDER_DETAILS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_REORDER_DETAILS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getReOrderDetailsSuccess(response.data));

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

function* getActiveOrders() {
  while (true) {
    const {responseCallback} = yield take(GET_ACTIVE_ORDERS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_ACTIVE_ORDERS_URL,
        {},
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getActiveOrdersSuccess(response.orders));

        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

export default function* root() {
  yield fork(getMyOrderDetails);
  yield fork(getReOrderList);
  yield fork(getReOrderDetails);
  yield fork(isOrderRated);
  yield fork(getActiveOrders);
}
