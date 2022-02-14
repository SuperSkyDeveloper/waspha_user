import {take, put, call, fork} from 'redux-saga/effects';
import {
  USER_SIGNUP,
  USER_SIGNIN,
  USER_SIGNOUT,
  UPDATE_USER_PROFILE,
  USER_FORGOT_PASSWORD,
  USER_CONFIRM_OTP_FGPASS,
  USER_CHANGE_PASSWORD,
  CONTACT_ADMIN,
  GET_PROFILE_SECTIONS,
  POST_PROFILE_DATA,
  DELETE_PROFILE_SUBSECTION_DATA,
  SIGNUP_CONFIRM_OTP,
  USER_RESET_PASSWORD,
  RESEND_OTP,
  UPDATE_AVATAR,
  SOCIAL_LOGIN,
  CONTACT_US,
  SUBMIT_EDIT_PROFILE,
  VERIFY_NUMBER_OTP,
  CHANGE_EMAIL_OR_PHONE,
  CHANGE_EMAIL_OR_PHONE_OTP,
} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT, strings} from '../constants';
import {
  userSigninSuccess,
  userSignOutSuccess,
  updateUserProfileSuccess,
  getProfileSectionsSuccess,
  userSignUpConfirmOtpSuccess,
  updateUserData,
  isSocialLogin,
  verifyNumberOtpSuccess,
  submitEditProfileSuccess,
  changeEmailOrPhoneOTPSuccess,
  changeEmailOrPhoneSuccess,
} from '../actions/UserActions';
import {
  USER_SIGNUP as USER_SIGNUP_URL,
  SIGNUP_CONFIRM_OTP as SIGNUP_CONFIRM_OTP_URL,
  USER_SIGNIN as USER_SIGNIN_URL,
  USER_SIGNOUT as USER_SIGNOUT_URL,
  UPDATE_USER_PROFILE as UPDATE_USER_PROFILE_URL,
  RESEND_OTP as RESEND_OTP_URL,
  USER_FORGOT_PASSWORD as USER_FORGOT_PASSWORD_URL,
  USER_CONFIRM_OTP_FGPASS as USER_CONFIRM_OTP_FGPASS_URL,
  USER_RESET_PASSWORD as USER_RESET_PASSWORD_URL,
  USER_CHANGE_PASSWORD as USER_CHANGE_PASSWORD_URL,
  CONTACT_ADMIN as CONTACT_ADMIN_URL,
  GET_PROFILE_SECTIONS as GET_PROFILE_SECTIONS_URL,
  POST_PROFILE_DATA as POST_PROFILE_DATA_URL,
  DELETE_PROFILE_SUBSECTION_DATA as DELETE_PROFILE_SUBSECTION_DATA_URL,
  UPDATE_AVATAR as UPDATE_AVATAR_URL,
  SOCIAL_LOGIN as SOCIAL_LOGIN_URL,
  CONTACT_US as CONTACT_US_URL,
  SUBMIT_EDIT_PROFILE as SUBMIT_EDIT_PROFILE_URL,
  VERIFY_NUMBER_OTP as VERIFY_NUMBER_OTP_URL,
  CHANGE_EMAIL_OR_PHONE as CHANGE_EMAIL_OR_PHONE_URL,
  CHANGE_EMAIL_OR_PHONE_OTP as CHANGE_EMAIL_OR_PHONE_OTP_URL,
  callRequest,
} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';
import util from '../util';
import {alertMessage} from '../actions/GeneralActions';

function alert(message, type = 'error') {
  setTimeout(() => {
    util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* signup() {
  while (true) {
    const {payload, responseCallback} = yield take(USER_SIGNUP.REQUEST);
    try {
      const response = yield call(
        callRequest,
        USER_SIGNUP_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback) responseCallback(response);
      } else {
        if (responseCallback) responseCallback(response);

        //util.topAlert(response.message);
        yield put(alertMessage(response.message));
      }
    } catch (err) {
      if (responseCallback) responseCallback({status: false});
    }
  }
}

function* verifyNumberOtp() {
  while (true) {
    const {payload, responseCallback} = yield take(VERIFY_NUMBER_OTP.REQUEST);
    try {
      const response = yield call(
        callRequest,
        VERIFY_NUMBER_OTP_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(verifyNumberOtpSuccess(response.data));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
        //util.topAlert(strings.SOMETHING_WENT_WRONG)
        yield put(alertMessage(response.message));
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* socialLogin() {
  while (true) {
    const {payload, responseCallback} = yield take(SOCIAL_LOGIN.REQUEST);
    try {
      const response = yield call(
        callRequest,
        SOCIAL_LOGIN_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        //util.topAlert(response.message);
        yield put(alertMessage(response.message));
        yield put(userSigninSuccess(response.data));
        yield put(isSocialLogin(true));
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

function* contactUs() {
  while (true) {
    const {payload, responseCallback} = yield take(CONTACT_US.REQUEST);
    try {
      const response = yield call(
        callRequest,
        CONTACT_US_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
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

function* updateAvatar() {
  while (true) {
    const {payload, responseCallback} = yield take(UPDATE_AVATAR.REQUEST);
    try {
      const response = yield call(
        callRequest,
        UPDATE_AVATAR_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback) responseCallback(response.status);
        yield put(updateUserData(response.data));
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

function* signUpConfirmOtp() {
  while (true) {
    const {payload, responseCallback} = yield take(SIGNUP_CONFIRM_OTP.REQUEST);
    try {
      const response = yield call(
        callRequest,
        SIGNUP_CONFIRM_OTP_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback) responseCallback(response.status);
        yield put(userSignUpConfirmOtpSuccess(response.data));
      } else {
        if (responseCallback) responseCallback(response.status);
        //util.topAlert(strings.SOMETHING_WENT_WRONG)
        yield put(alertMessage(response.message));
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* signin() {
  while (true) {
    const {payload, responseCallback} = yield take(USER_SIGNIN.REQUEST);
    try {
      const response = yield call(
        callRequest,
        USER_SIGNIN_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(userSigninSuccess(response.data));

        if (responseCallback) responseCallback(response.status);
      } else {
        //util.topAlert(response.message);
        yield put(alertMessage(response.message));
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      //util.topAlert(strings.SOMETHING_WENT_WRONG)
      yield put(alertMessage(strings.SOMETHING_WENT_WRONG));
    }
  }
}

//change phone and email start

function* changeEmailOrPhone() {
  while (true) {
    const {payload, responseCallback} = yield take(
      CHANGE_EMAIL_OR_PHONE.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        CHANGE_EMAIL_OR_PHONE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        // yield put(changeEmailOrPhoneSuccess(response.data));

        if (responseCallback) responseCallback(response);
      } else {
        //util.topAlert(response.message);
        yield put(alertMessage(response.message));
        if (responseCallback) responseCallback(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback({status: false});
      //util.topAlert(strings.SOMETHING_WENT_WRONG)
      yield put(alertMessage(strings.SOMETHING_WENT_WRONG));
    }
  }
}

function* changeEmailOrPhoneOTP() {
  while (true) {
    const {payload, responseCallback} = yield take(
      CHANGE_EMAIL_OR_PHONE_OTP.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        CHANGE_EMAIL_OR_PHONE_OTP_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(changeEmailOrPhoneOTPSuccess(response.data));

        if (responseCallback) responseCallback(response.status);
      } else {
        //util.topAlert(response.message);
        yield put(alertMessage(response.message));
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      //util.topAlert(strings.SOMETHING_WENT_WRONG)
      yield put(alertMessage(strings.SOMETHING_WENT_WRONG));
    }
  }
}

//change phone and email end

function* signout() {
  while (true) {
    const {responseCallback} = yield take(USER_SIGNOUT.REQUEST);
    try {
      const response = yield call(
        callRequest,
        USER_SIGNOUT_URL,
        {},
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        //util.topAlert(response.message);
        yield put(alertMessage(response.message));
        if (responseCallback) responseCallback(response.status);

        yield put(userSignOutSuccess());
      } else {
        if (responseCallback) responseCallback(response.status);
        yield put(userSignOutSuccess());
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      yield put(userSignOutSuccess());
    }
  }
}

function* updateUserProfile() {
  while (true) {
    const {payload, responseCallback} = yield take(UPDATE_USER_PROFILE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        UPDATE_USER_PROFILE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.data) {
        yield put(
          updateUserProfileSuccess({
            first_name: payload.first_name,
            phone: payload.phone,
          }),
        );
        if (responseCallback) responseCallback(response.data, null);
      } else {
        if (responseCallback) responseCallback(null, null);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
    }
  }
}

function* forgotPassword() {
  while (true) {
    const {payload, responseCallback} = yield take(
      USER_FORGOT_PASSWORD.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        USER_FORGOT_PASSWORD_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback) responseCallback(response);
        //util.topAlert(response.message);
        yield put(alertMessage(response.message));
      } else {
        if (responseCallback) responseCallback(response);
        //util.topAlert(response.message);
        yield put(alertMessage(response.message));
      }
    } catch (err) {
      if (responseCallback) responseCallback({status: false});
    }
  }
}

function* confirmOTP_FGPASS() {
  while (true) {
    const {payload, responseCallback} = yield take(
      USER_CONFIRM_OTP_FGPASS.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        USER_CONFIRM_OTP_FGPASS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback) responseCallback(response.status);
        //util.topAlert(response.message);
        yield put(alertMessage(response.message));
      } else {
        if (responseCallback) responseCallback(response.status);
        //util.topAlert(response.message);
        yield put(alertMessage(response.message));
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* resendOTP() {
  while (true) {
    const {payload, responseCallback} = yield take(RESEND_OTP.REQUEST);
    try {
      const response = yield call(
        callRequest,
        RESEND_OTP_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback) responseCallback(response);
        //util.topAlert(response.message);
        yield put(alertMessage(response.message));
      } else {
        if (responseCallback) responseCallback(response);
        //util.topAlert(response.message);
        yield put(alertMessage(response.message));
      }
    } catch (err) {
      if (responseCallback) responseCallback({status: false});
    }
  }
}

function* resetPassword() {
  while (true) {
    const {payload, responseCallback} = yield take(USER_RESET_PASSWORD.REQUEST);
    try {
      const response = yield call(
        callRequest,
        USER_RESET_PASSWORD_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback) responseCallback(response.status);
        //util.topAlert(response.message);
        yield put(alertMessage(response.message));
      } else {
        if (responseCallback) responseCallback(response.status);
        //util.topAlert(response.message);
        yield put(alertMessage(response.message));
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* changePassword() {
  while (true) {
    const {payload, responseCallback} = yield take(
      USER_CHANGE_PASSWORD.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        USER_CHANGE_PASSWORD_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback) responseCallback(response.status);
        //util.topAlert(response.message);
        yield put(alertMessage(response.message));
      } else {
        if (responseCallback) responseCallback(response.status);
        //util.topAlert(response.message);
        yield put(alertMessage(response.message));
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* contactAdmin() {
  while (true) {
    const {payload, responseCallback} = yield take(CONTACT_ADMIN.REQUEST);
    try {
      const response = yield call(
        callRequest,
        CONTACT_ADMIN_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.success) {
        if (responseCallback) responseCallback(response.message, null);
      } else {
        if (responseCallback) responseCallback(null, null);
        yield put(alertMessage(strings.SOMETHING_WENT_WRONG));
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(util.getErrorText(err.message));
    }
  }
}

function* getProfileSections() {
  while (true) {
    const {responseCallback} = yield take(GET_PROFILE_SECTIONS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_PROFILE_SECTIONS_URL,
        {},
        '',
        {},
        ApiSauce,
      );
      if (response.success) {
        if (responseCallback) responseCallback(true, null);
        yield put(getProfileSectionsSuccess(response.data));
      } else {
        if (responseCallback) responseCallback(null, null);
        yield put(alertMessage(strings.SOMETHING_WENT_WRONG));
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(util.getErrorText(err.message));
    }
  }
}

function* postProfileData() {
  while (true) {
    const {payload, responseCallback} = yield take(POST_PROFILE_DATA.REQUEST);
    try {
      const response = yield call(
        callRequest,
        POST_PROFILE_DATA_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.success) {
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(null, null);
        yield put(alertMessage(strings.SOMETHING_WENT_WRONG));
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(util.getErrorText(err.message));
    }
  }
}

function* deleteProfileSubSectionDataRequest() {
  while (true) {
    const {payload, responseCallback} = yield take(
      DELETE_PROFILE_SUBSECTION_DATA.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        DELETE_PROFILE_SUBSECTION_DATA_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.success) {
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(null, null);
        yield put(alertMessage(strings.SOMETHING_WENT_WRONG));
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(util.getErrorText(err.message));
    }
  }
}

function* submitProfile() {
  while (true) {
    const {payload, responseCallback} = yield take(SUBMIT_EDIT_PROFILE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        SUBMIT_EDIT_PROFILE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(submitEditProfileSuccess(response.data));

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

export default function* root() {
  yield fork(signup);
  yield fork(signout);
  yield fork(signin);
  yield fork(updateUserProfile);
  yield fork(forgotPassword);
  yield fork(confirmOTP_FGPASS);
  yield fork(signUpConfirmOtp);
  yield fork(contactUs);
  yield fork(resetPassword);
  yield fork(resendOTP);
  yield fork(changePassword);
  yield fork(contactAdmin);
  yield fork(getProfileSections);
  yield fork(postProfileData);
  yield fork(deleteProfileSubSectionDataRequest);
  yield fork(updateAvatar);
  yield fork(socialLogin);
  yield fork(submitProfile);
  yield fork(verifyNumberOtp);
  yield fork(changeEmailOrPhone);
  yield fork(changeEmailOrPhoneOTP);
}
