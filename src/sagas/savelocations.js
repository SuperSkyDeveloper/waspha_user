import {take, put, call, fork} from 'redux-saga/effects';
import {
  SAVE_LOCATIONS,
  GET_LOCATIONS,
  ADD_LOCATION,
  EDIT_LOCATION,
  REMOVE_LOCATION,
} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT, strings} from '../constants';

import {
  SAVE_LOCATIONS as SAVE_LOCATIONS_URL,
  GET_LOCATIONS as GET_LOCATIONS_URL,
  ADD_LOCATION as ADD_LOCATION_URL,
  EDIT_LOCATION as EDIT_LOCATION_URL,
  REMOVE_LOCATION as REMOVE_LOCATION_URL,
  callRequest,
} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';
import {
  saveLocationsSuccess,
  getLocationSuccess,
  addLocationSuccess,
  removeLocationSuccess,
  editLocationsSuccess,
} from '../actions/SaveLocationsActions';
import util from '../util';
import {alertMessage} from '../actions/GeneralActions';

function alert(message, type = 'error') {
  setTimeout(() => {
    Util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* saveLocations() {
  while (true) {
    const {payload, responseCallback} = yield take(SAVE_LOCATIONS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        SAVE_LOCATIONS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(saveLocationsSuccess(response.data));
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

function* addLocation() {
  while (true) {
    const {payload, responseCallback} = yield take(ADD_LOCATION.REQUEST);
    try {
      const response = yield call(
        callRequest,
        ADD_LOCATION_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(addLocationSuccess(response.data));

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

function* removeLocation() {
  while (true) {
    const {payload, responseCallback} = yield take(REMOVE_LOCATION.REQUEST);
    try {
      const response = yield call(
        callRequest,
        REMOVE_LOCATION_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(removeLocationSuccess(payload.id));

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

function* editLocation() {
  while (true) {
    const {payload, responseCallback} = yield take(EDIT_LOCATION.REQUEST);
    try {
      const response = yield call(
        callRequest,
        EDIT_LOCATION_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(editLocationsSuccess(response.data));

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

function* getLocations() {
  while (true) {
    const {responseCallback} = yield take(GET_LOCATIONS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_LOCATIONS_URL,
        {},
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getLocationSuccess(response.data));

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
  yield fork(addLocation);
  yield fork(editLocation);
  yield fork(getLocations);
  yield fork(removeLocation);

  yield fork(saveLocations);
}
