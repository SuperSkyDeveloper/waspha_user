// @flow
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {
  USER_SIGNIN,
  USER_SIGNUP,
  SIGNUP_CONFIRM_OTP,
  USER_SIGNOUT,
  UPDATE_USER_PROFILE,
  GET_PROFILE_SECTIONS,
  UPDATE_USER_DATA,
  UPDATE_USER_COORDINATES,
  LISTEN_LOCATION_SERVICE_CHANGE,
  REMEMBER_ME,
  IS_SOCIAL_LOGIN,
  VERIFY_NUMBER_OTP,
  SUBMIT_EDIT_PROFILE,
  REFRESH_TOKEN,
  CHANGE_EMAIL_OR_PHONE,
  CHANGE_EMAIL_OR_PHONE_OTP,
} from '../actions/ActionTypes';

const initialState = Immutable({
  data: {},
  credentials: {},
  userCoordinates: {},
  profileSections: [],
  userLocationOn: false,
  socialLogin: false,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNIN.SUCCESS: {
      return Immutable.merge(state, {
        data: {...state.data, ...action.data},
      });
    }
    case SIGNUP_CONFIRM_OTP.SUCCESS: {
      return Immutable.merge(state, {
        data: action.data,
      });
    }
    case UPDATE_USER_PROFILE.SUCCESS: {
      return Immutable.merge(state, {
        data: {...state.data, ...action.data},
      });
    }
    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, {
        data: {},
        credentials: {},
        userCoordinates: {},
      });
    }

    case GET_PROFILE_SECTIONS.SUCCESS: {
      return Immutable.merge(state, {
        profileSections: action.data,
      });
    }

    case CHANGE_EMAIL_OR_PHONE_OTP.SUCCESS: {
      return Immutable.merge(state, {
        data: {...state.data, ...action.data},
      });
    }

    case UPDATE_USER_DATA.SUCCESS: {
      return Immutable.merge(state, {
        data: {...state.data, ...action.data},
      });
    }

    case UPDATE_USER_COORDINATES.SUCCESS: {
      return Immutable.merge(state, {
        userCoordinates: action.data,
      });
    }

    case LISTEN_LOCATION_SERVICE_CHANGE.SUCCESS: {
      return Immutable.merge(state, {
        userLocationOn: action.data,
      });
    }

    case REMEMBER_ME: {
      return Immutable.merge(state, {
        credentials: action.data,
      });
    }

    case IS_SOCIAL_LOGIN: {
      return Immutable.merge(state, {
        socialLogin: action.data,
      });
    }

    case VERIFY_NUMBER_OTP.SUCCESS: {
      return Immutable.merge(state, {
        data: action.data,
      });
    }

    case SUBMIT_EDIT_PROFILE.SUCCESS: {
      return Immutable.merge(state, {
        data: {...state.data, ...action.data},
      });
    }

    case REFRESH_TOKEN: {
      let newData = _.cloneDeep(state.data);
      newData.access_token = action.data.access_token;
      newData.refresh_token = action.data.refresh_token;

      return Immutable.merge(state, {
        data: newData,
      });
    }

    default:
      return state;
  }
};
