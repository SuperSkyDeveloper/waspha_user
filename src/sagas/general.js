import {take, put, call, fork} from 'redux-saga/effects';
import {
  APP_SETTINGS,
  GET_FAQS,
  CHANGE_LANGUAGE,
  UPDATE_DEVICE_ID,
  GET_TERMS_AND_CONDITIONS,
  GET_PRIVACY_POLICY,
  GET_NOTIFICATIONS_LIST,
  GET_COOKIE_POLICY,
  GET_COPY_RIGHT_POLICY,
  GET_TERMS_DELIVERY_PARTNER,
  GET_GDPR_COMPLIANCE_STATEMENT,
  GET_TRANSLATIONS,
  CHECK_DEVICE_STATE,
} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT, strings} from '../constants';
import {
  GET_FAQS as GET_FAQS_URL,
  CHANGE_LANGUAGE as CHANGE_LANGUAGE_URL,
  UPDATE_DEVICE_ID as UPDATE_DEVICE_ID_URL,
  GET_TERMS_AND_CONDITIONS as GET_TERMS_AND_CONDITIONS_URL,
  GET_PRIVACY_POLICY as GET_PRIVACY_POLICY_URL,
  GET_NOTIFICATIONS_LIST as GET_NOTIFICATIONS_LIST_URL,
  GET_COOKIE_POLICY as GET_COOKIE_POLICY_URL,
  GET_COPY_RIGHT_POLICY as GET_COPY_RIGHT_POLICY_URL,
  GET_TERMS_DELIVERY_PARTNER as GET_TERMS_DELIVERY_PARTNER_URL,
  GET_GDPR_COMPLIANCE_STATEMENT as GET_GDPR_COMPLIANCE_STATEMENT_URL,
  APP_SETTINGS as APP_SETTINGS_URL,
  GET_TRANSLATIONS as GET_TRANSLATIONS_URL,
  CHECK_DEVICE_STATE as CHECK_DEVICE_STATE_URL,
  callRequest,
} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';
import {
  getFaqsSuccess,
  changeLanguageSuccess,
  getTermsAndConditionsSuccess,
  getPrivacyPolicySuccess,
  getNotificationsListSuccess,
  getCookiePolicySuccess,
  getCopyRightPolicySuccess,
  getGDPRComplianceStatementSuccess,
  appSettingsSuccess,
  getTranslationsSuccess,
  alertMessage,
} from '../actions/GeneralActions';
import util from '../util';

function alert(message, type = 'error') {
  setTimeout(() => {
    util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* appSetting() {
  while (true) {
    const {payload, responseCallback} = yield take(APP_SETTINGS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        APP_SETTINGS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(appSettingsSuccess(response.data));
        if (responseCallback) responseCallback(response);
      } else {
        if (responseCallback) responseCallback(response);

        // util.yield put(alertMessage(strings.SOMETHING_WENT_WRONG))
      }
    } catch (err) {
      if (responseCallback) responseCallback({status: false});
      // Util.topAlertError(err.message);
    }
  }
}

function* getFaqs() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_FAQS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_FAQS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getFaqsSuccess(response.data));

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

function* changeLanguage() {
  while (true) {
    const {payload, responseCallback} = yield take(CHANGE_LANGUAGE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        CHANGE_LANGUAGE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(changeLanguageSuccess(payload.language));

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

function* getTranslations() {
  while (true) {
    const {responseCallback} = yield take(GET_TRANSLATIONS.REQUEST);

    try {
      const response = yield call(
        callRequest,
        GET_TRANSLATIONS_URL,
        {},
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getTranslationsSuccess(response.data));

        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* getTermsAndConditions() {
  while (true) {
    const {responseCallback} = yield take(GET_TERMS_AND_CONDITIONS.REQUEST);

    try {
      const response = yield call(
        callRequest,
        GET_TERMS_AND_CONDITIONS_URL,
        {},
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(
          getTermsAndConditionsSuccess(
            util.isRTL() ? response.data.ar : response.data.en,
          ),
        );
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* getPrivacyPolicy() {
  while (true) {
    const {responseCallback} = yield take(GET_PRIVACY_POLICY.REQUEST);

    try {
      const response = yield call(
        callRequest,
        GET_PRIVACY_POLICY_URL,
        {},
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(
          getPrivacyPolicySuccess(
            util.isRTL() ? response.data.ar : response.data.en,
          ),
        );
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* updateDeviceToken() {
  while (true) {
    const {payload, responseCallback} = yield take(UPDATE_DEVICE_ID.REQUEST);

    try {
      const response = yield call(
        callRequest,
        UPDATE_DEVICE_ID_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        // yield put(updateDeviceTokenSuccess(response));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(false);
        // alert(response.message || 'Something went wrong');
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);

      // alert(Util.getErrorText(err.message));
    }
  }
}

function* getNoticationsList() {
  while (true) {
    const {responseCallback} = yield take(GET_NOTIFICATIONS_LIST.REQUEST);

    try {
      const response = yield call(
        callRequest,
        GET_NOTIFICATIONS_LIST_URL,
        {},
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(getNotificationsListSuccess(response.data));
        if (responseCallback) responseCallback(response.status);
      } else {
        yield put(getNotificationsListSuccess(response.data));

        if (responseCallback) responseCallback(false);
        // alert(response.message || 'Something went wrong');
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* getCookiePolicy() {
  while (true) {
    const {responseCallback} = yield take(GET_COOKIE_POLICY.REQUEST);

    try {
      const response = yield call(
        callRequest,
        GET_COOKIE_POLICY_URL,
        {},
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(
          getCookiePolicySuccess(
            util.isRTL() ? response.data.ar : response.data.en,
          ),
        );
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* getCopyRightPolicy() {
  while (true) {
    const {responseCallback} = yield take(GET_COPY_RIGHT_POLICY.REQUEST);

    try {
      const response = yield call(
        callRequest,
        GET_COPY_RIGHT_POLICY_URL,
        {},
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(
          getCopyRightPolicySuccess(
            util.isRTL() ? response.data.ar : response.data.en,
          ),
        );
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* getGDPRComplianceStatement() {
  while (true) {
    const {responseCallback} = yield take(
      GET_GDPR_COMPLIANCE_STATEMENT.REQUEST,
    );

    try {
      const response = yield call(
        callRequest,
        GET_GDPR_COMPLIANCE_STATEMENT_URL,
        {},
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(
          getGDPRComplianceStatementSuccess(
            util.isRTL() ? response.data.ar : response.data.en,
          ),
        );
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* checkDeviceState() {
  while (true) {
    const {payload, responseCallback} = yield take(CHECK_DEVICE_STATE.REQUEST);

    try {
      const response = yield call(
        callRequest,
        CHECK_DEVICE_STATE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
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
  yield fork(appSetting);
  yield fork(getFaqs);
  yield fork(changeLanguage);
  yield fork(updateDeviceToken);

  yield fork(getTermsAndConditions);
  yield fork(getPrivacyPolicy);

  yield fork(getNoticationsList);
  yield fork(getTranslations);

  yield fork(getCookiePolicy);
  yield fork(getCopyRightPolicy);
  yield fork(getGDPRComplianceStatement);
  yield fork(checkDeviceState);
}
