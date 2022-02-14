import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {
  FIRST_TIME_OPEN,
  GET_FAQS,
  CHANGE_LANGUAGE,
  GET_TERMS_AND_CONDITIONS,
  GET_PRIVACY_POLICY,
  GET_NOTIFICATIONS_LIST,
  GET_COOKIE_POLICY,
  GET_COPY_RIGHT_POLICY,
  GET_GDPR_COMPLIANCE_STATEMENT,
  APP_SETTINGS,
  GET_TRANSLATIONS,
  ALERT_MESSAGE,
  SET_COUNTRY_CODE,
} from '../actions/ActionTypes';
import {GetCurrentTimeInISO} from '../helpers/generalHelper';
import util from '../util';

const initialState = Immutable({
  initialRun: true,
  faqs: [],
  appLanguage: 'en',

  translationLocales: {
    translationsUpdatedAt: null,
  },
  termsAndConditions: '',
  privacyPolicy: '',
  notifications: [],
  cookiePolicy: '',
  copyRight: '',
  GDPRComplianceStatement: '',
  appSettings: {},
  alertMessage: '',
  countryCode: 'AE',
});

export default (state = initialState, action) => {
  switch (action.type) {
    case APP_SETTINGS.SUCCESS: {
      return Immutable.merge(state, {
        appSettings: action.data,
      });
    }

    case FIRST_TIME_OPEN: {
      return Immutable.merge(state, {
        initialRun: false,
      });
    }

    case GET_FAQS.SUCCESS: {
      return Immutable.merge(state, {
        faqs: action.data,
      });
    }

    case CHANGE_LANGUAGE.SUCCESS: {
      action.responseCallback();
      util.switchLanguage(action.data);

      return Immutable.merge(state, {
        appLanguage: action.data,
      });
    }

    case GET_TERMS_AND_CONDITIONS.SUCCESS: {
      return Immutable.merge(state, {
        termsAndConditions: action.data,
      });
    }

    case GET_PRIVACY_POLICY.SUCCESS: {
      return Immutable.merge(state, {
        privacyPolicy: action.data,
      });
    }

    case GET_NOTIFICATIONS_LIST.SUCCESS: {
      return Immutable.merge(state, {
        notifications: action.data,
      });
    }

    case GET_COOKIE_POLICY.SUCCESS: {
      return Immutable.merge(state, {
        cookiePolicy: action.data,
      });
    }

    case GET_COPY_RIGHT_POLICY.SUCCESS: {
      return Immutable.merge(state, {
        copyRight: action.data,
      });
    }

    case GET_GDPR_COMPLIANCE_STATEMENT.SUCCESS: {
      return Immutable.merge(state, {
        GDPRComplianceStatement: action.data,
      });
    }

    case GET_TRANSLATIONS.SUCCESS: {
      const temp = {
        translationsUpdatedAt: GetCurrentTimeInISO(),
        ...action.data,
      };
      return Immutable.merge(state, {
        translationLocales: temp,
      });
    }

    case ALERT_MESSAGE: {
      return Immutable.merge(state, {
        alertMessage: action.data,
      });
    }

    case SET_COUNTRY_CODE: {
      return Immutable.merge(state, {
        countryCode: action.data,
      });
    }

    default:
      return state;
  }
};
