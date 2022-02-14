import {take, put, call, fork} from 'redux-saga/effects';
import {
  GET_AVAILABLE_CATEGORIES,
  GET_STORE_CATEGORIES,
  GET_CATEGORY_DETAILS,
} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT, strings} from '../constants';

import {
  GET_AVAILABLE_CATEGORIES as GET_AVAILABLE_CATEGORIES_URL,
  GET_STORE_CATEGORIES as GET_STORE_CATEGORIES_URL,
  GET_CATEGORY_DETAILS as GET_CATEGORY_DETAILS_URL,
  callRequest,
} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';
import util from '../util';
import {
  getCategoriesSuccess,
  getStoreCategoriesSuccess,
} from '../actions/CategoriesActions';
import {alertMessage} from '../actions/GeneralActions';

function alert(message, type = 'error') {
  setTimeout(() => {
    Util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* getCategories() {
  while (true) {
    const {payload, responseCallback} = yield take(
      GET_AVAILABLE_CATEGORIES.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        GET_AVAILABLE_CATEGORIES_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getCategoriesSuccess(response.data));
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

function* getCategoryDetails() {
  while (true) {
    const {payload, responseCallback} = yield take(
      GET_CATEGORY_DETAILS.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        GET_CATEGORY_DETAILS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
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

function* getStoreCategories() {
  while (true) {
    const {payload, responseCallback} = yield take(
      GET_STORE_CATEGORIES.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        GET_STORE_CATEGORIES_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getStoreCategoriesSuccess(response.data));
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

export default function* root() {
  yield fork(getCategories);
  yield fork(getStoreCategories);
  yield fork(getCategoryDetails);
}
