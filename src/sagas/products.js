import {take, put, call, fork} from 'redux-saga/effects';
import {
  GET_STORE_PRODUCTS,
  SEARCH_STORE_PRODUCTS,
} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT, strings} from '../constants';

import {
  GET_STORE_PRODUCTS as GET_STORE_PRODUCTS_URL,
  SEARCH_STORE_PRODUCTS as SEARCH_STORE_PRODUCTS_URL,
  callRequest,
} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';
import {getStoreProductsSuccess} from '../actions/ProductsActions';
import util from '../util';
import {Actions} from 'react-native-router-flux';
import {alertMessage} from '../actions/GeneralActions';

function alert(message, type = 'error') {
  setTimeout(() => {
    util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* getStoreProducts() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_STORE_PRODUCTS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_STORE_PRODUCTS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getStoreProductsSuccess(response.data));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
        //util.topAlert(strings.SOMETHING_WENT_WRONG)
        yield put(alertMessage(strings.SOMETHING_WENT_WRONG));
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      Actions.pop();
    }
  }
}

function* searchStoreProducts() {
  while (true) {
    const {payload, responseCallback} = yield take(
      SEARCH_STORE_PRODUCTS.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        SEARCH_STORE_PRODUCTS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback) responseCallback(response.status, response.data);
      } else {
        //util.topAlert(strings.SOMETHING_WENT_WRONG)
        yield put(alertMessage(strings.SOMETHING_WENT_WRONG));
        if (responseCallback) responseCallback(response.status, {});
      }
    } catch (err) {
      if (responseCallback) responseCallback(false, {});
    }
  }
}

export default function* root() {
  yield fork(getStoreProducts);
  yield fork(searchStoreProducts);
}
