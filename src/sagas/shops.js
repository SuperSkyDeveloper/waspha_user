import {take, put, call, fork} from 'redux-saga/effects';
import {
  GET_NEARBY_SHOPS,
  GET_SHOP_DETAILS,
  GET_SHOP_REVIEWS,
  GET_SHOP_POLICY,
  GET_QUEUE,
} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT, strings} from '../constants';

import {
  GET_NEARBY_SHOPS as GET_NEARBY_SHOPS_URL,
  GET_SHOP_DETAILS as GET_SHOP_DETAILS_URL,
  GET_SHOP_REVIEWS as GET_SHOP_REVIEWS_URL,
  GET_SHOP_POLICY as GET_SHOP_POLICY_URL,
  GET_QUEUE as GET_QUEUE_URL,
  callRequest,
} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';
import Util from '../util';
import {
  getNearbyShopsSuccess,
  getShopDetailsSuccess,
  getShopReviewsSuccess,
  getQueueSuccess,
} from '../actions/ShopsActions';
import {getCategoriesSuccess} from '../actions/CategoriesActions';

function alert(message, type = 'error') {
  setTimeout(() => {
    Util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* getNearbyShops() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_NEARBY_SHOPS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_NEARBY_SHOPS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getNearbyShopsSuccess(response.data.stores));

        yield put(getCategoriesSuccess(response.data.categories));

        if (responseCallback) responseCallback(response);
      } else {
        if (responseCallback) responseCallback(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback({status: false});
    }
  }
}

function* getShopDetails() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_SHOP_DETAILS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_SHOP_DETAILS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getShopDetailsSuccess(response.data));

        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* getShopReviews() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_SHOP_REVIEWS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_SHOP_REVIEWS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getShopReviewsSuccess(response.data.reviews_ratings));

        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* getShopPolicy() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_SHOP_POLICY.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_SHOP_POLICY_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        if (responseCallback) responseCallback(response);
      } else {
        if (responseCallback) responseCallback(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback({status: false});
    }
  }
}

function* getQueue() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_QUEUE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_QUEUE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(getQueueSuccess(response.data.stores));

        if (responseCallback) responseCallback(response.status);
      } else {
        yield put(getQueueSuccess(response.data.stores));

        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

export default function* root() {
  yield fork(getNearbyShops);
  yield fork(getShopDetails);
  yield fork(getShopReviews);
  yield fork(getShopPolicy);
  yield fork(getQueue);
}
