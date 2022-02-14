// @flow

import {
  SAVE_LOCATIONS,
  GET_INITIAL_REGION,
  ADD_LOCATION,
  EDIT_LOCATION,
  GET_LOCATIONS,
  REMOVE_LOCATION,
  CLEAR_FAV_LOCATIONS,
  GET_DRIVER_CORDS,
  GET_UPDATED_TIME_AND_KM,
} from './ActionTypes';

export function saveLocationsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: SAVE_LOCATIONS.REQUEST,
  };
}

export function saveLocationsSuccess(data) {
  return {
    data,
    type: SAVE_LOCATIONS.SUCCESS,
  };
}

export function addLocationRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: ADD_LOCATION.REQUEST,
  };
}

export function addLocationSuccess(data) {
  return {
    data,
    type: ADD_LOCATION.SUCCESS,
  };
}

export function editLocationRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: EDIT_LOCATION.REQUEST,
  };
}

export function editLocationsSuccess(data) {
  return {
    data,
    type: EDIT_LOCATION.SUCCESS,
  };
}

export function getLocationsRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_LOCATIONS.REQUEST,
  };
}

export function getLocationSuccess(data) {
  return {
    data,
    type: GET_LOCATIONS.SUCCESS,
  };
}

export function removeLocationRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: REMOVE_LOCATION.REQUEST,
  };
}

export function removeLocationSuccess(data) {
  return {
    data,
    type: REMOVE_LOCATION.SUCCESS,
  };
}

export function getInitialCoordinates(data) {
  return {
    data,
    type: GET_INITIAL_REGION.SUCCESS,
  };
}

export function clearFavLocations() {
  return {
    type: CLEAR_FAV_LOCATIONS,
  };
}

export function getDriverCords(data) {
  return {
    data,
    type: GET_DRIVER_CORDS,
  };
}

export function getUpdatedRiderTimeAndKM(data) {
  return {
    data,
    type: GET_UPDATED_TIME_AND_KM,
  };
}
