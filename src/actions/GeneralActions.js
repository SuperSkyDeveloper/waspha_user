// @flow

import {
  FIRST_TIME_OPEN,
  GET_FAQS,
  CHANGE_LANGUAGE,
  UPDATE_DEVICE_ID,
  GET_TERMS_AND_CONDITIONS,
  GET_PRIVACY_POLICY,
  GET_NOTIFICATIONS_LIST,
  GET_COOKIE_POLICY,
  GET_COPY_RIGHT_POLICY,
  GET_GDPR_COMPLIANCE_STATEMENT,
  APP_SETTINGS,
  GET_TRANSLATIONS,
  ALERT_MESSAGE,
  CHECK_DEVICE_STATE,
  SET_COUNTRY_CODE,
} from './ActionTypes';

export function appSettingsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: APP_SETTINGS.REQUEST,
  };
}

export function appSettingsSuccess(data) {
  return {
    data,
    type: APP_SETTINGS.SUCCESS,
  };
}

export function setFirstTime() {
  return {
    type: FIRST_TIME_OPEN,
  };
}

export function getFaqsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_FAQS.REQUEST,
  };
}

export function getFaqsSuccess(data) {
  return {
    data,
    type: GET_FAQS.SUCCESS,
  };
}

export function changeLanguageRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CHANGE_LANGUAGE.REQUEST,
  };
}

export function changeLanguageSuccess(data, responseCallback = () => {}) {
  return {
    data,
    responseCallback,
    type: CHANGE_LANGUAGE.SUCCESS,
  };
}

export function updateDeviceTokenRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: UPDATE_DEVICE_ID.REQUEST,
  };
}
export function updateDeviceTokenSuccess(data) {
  return {
    data,
    type: UPDATE_DEVICE_ID.SUCCESS,
  };
}

export function getTermsAndConditionsRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_TERMS_AND_CONDITIONS.REQUEST,
  };
}
export function getTermsAndConditionsSuccess(data) {
  return {
    data,
    type: GET_TERMS_AND_CONDITIONS.SUCCESS,
  };
}

export function getPrivacyPolicyRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_PRIVACY_POLICY.REQUEST,
  };
}
export function getPrivacyPolicySuccess(data) {
  return {
    data,
    type: GET_PRIVACY_POLICY.SUCCESS,
  };
}

export function getNotificationsListRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_NOTIFICATIONS_LIST.REQUEST,
  };
}
export function getNotificationsListSuccess(data) {
  return {
    data,
    type: GET_NOTIFICATIONS_LIST.SUCCESS,
  };
}

export function getCookiePolicyRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_COOKIE_POLICY.REQUEST,
  };
}
export function getCookiePolicySuccess(data) {
  return {
    data,
    type: GET_COOKIE_POLICY.SUCCESS,
  };
}

export function getCopyRightPolicyRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_COPY_RIGHT_POLICY.REQUEST,
  };
}
export function getCopyRightPolicySuccess(data) {
  return {
    data,
    type: GET_COPY_RIGHT_POLICY.SUCCESS,
  };
}

export function getGDPRComplianceStatementRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_GDPR_COMPLIANCE_STATEMENT.REQUEST,
  };
}
export function getGDPRComplianceStatementSuccess(data) {
  return {
    data,
    type: GET_GDPR_COMPLIANCE_STATEMENT.SUCCESS,
  };
}

export function getTranslationsRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_TRANSLATIONS.REQUEST,
  };
}

export function getTranslationsSuccess(data) {
  return {
    data,
    type: GET_TRANSLATIONS.SUCCESS,
  };
}

export function alertMessage(data) {
  return {
    data,
    type: ALERT_MESSAGE,
  };
}

export function checkDeviceStateRequest(payload, responseCallback) {
  console.log({payloadcheck: payload});
  return {
    payload,
    responseCallback,
    type: CHECK_DEVICE_STATE.REQUEST,
  };
}

export function checkDeviceStateSuccess() {
  return {
    type: CHECK_DEVICE_STATE.SUCCESS,
  };
}

export function setCountryCode(data) {
  return {
    data,
    type: SET_COUNTRY_CODE,
  };
}
