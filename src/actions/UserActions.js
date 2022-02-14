// @flow

import {
  USER_SIGNUP,
  USER_SIGNIN,
  USER_SIGNOUT,
  UPDATE_USER_PROFILE,
  USER_FORGOT_PASSWORD,
  USER_CONFIRM_OTP_FGPASS,
  USER_CHANGE_PASSWORD,
  USER_RESET_PASSWORD,
  CONTACT_ADMIN,
  GET_PROFILE_SECTIONS,
  POST_PROFILE_DATA,
  DELETE_PROFILE_SUBSECTION_DATA,
  SIGNUP_CONFIRM_OTP,
  UPDATE_USER_DATA,
  LISTEN_LOCATION_SERVICE_CHANGE,
  UPDATE_USER_COORDINATES,
  RESEND_OTP,
  UPDATE_AVATAR,
  SOCIAL_LOGIN,
  CONTACT_US,
  REMEMBER_ME,
  SUBMIT_EDIT_PROFILE,
  IS_SOCIAL_LOGIN,
  VERIFY_NUMBER_OTP,
  REFRESH_TOKEN,
  CHANGE_EMAIL_OR_PHONE,
  CHANGE_EMAIL_OR_PHONE_OTP,
} from './ActionTypes';

export function userSignupRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_SIGNUP.REQUEST,
  };
}

export function userSignUpConfirmOtpRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: SIGNUP_CONFIRM_OTP.REQUEST,
  };
}

export function userSignUpConfirmOtpSuccess(data) {
  return {
    data,
    type: SIGNUP_CONFIRM_OTP.SUCCESS,
  };
}

export function userSigninRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_SIGNIN.REQUEST,
  };
}

export function userSigninSuccess(data, access_token, save_token) {
  return {
    data,
    access_token,
    save_token,
    type: USER_SIGNIN.SUCCESS,
  };
}

export function userSignOutRequest(responseCallback) {
  return {
    responseCallback,
    type: USER_SIGNOUT.REQUEST,
  };
}

export function userSignOutSuccess() {
  return {
    type: USER_SIGNOUT.SUCCESS,
  };
}

export function updateUserProfileRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: UPDATE_USER_PROFILE.REQUEST,
  };
}

export function updateUserProfileSuccess(data) {
  return {
    data,
    type: UPDATE_USER_PROFILE.SUCCESS,
  };
}

export function forgotPasswordRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_FORGOT_PASSWORD.REQUEST,
  };
}

export function confirmOTPRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_CONFIRM_OTP_FGPASS.REQUEST,
  };
}

export function resetPasswordRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_RESET_PASSWORD.REQUEST,
  };
}

export function resendOTPRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: RESEND_OTP.REQUEST,
  };
}

export function changePasswordRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_CHANGE_PASSWORD.REQUEST,
  };
}

export function contactAdminRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CONTACT_ADMIN.REQUEST,
  };
}

export function getProfileSectionsRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_PROFILE_SECTIONS.REQUEST,
  };
}

export function getProfileSectionsSuccess(data) {
  return {
    data,
    type: GET_PROFILE_SECTIONS.SUCCESS,
  };
}

export function updateAvatarRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: UPDATE_AVATAR.REQUEST,
  };
}

export function updateAvatarSuccess(data) {
  return {
    data,
    type: UPDATE_AVATAR.SUCCESS,
  };
}

export function postProfileDataRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: POST_PROFILE_DATA.REQUEST,
  };
}

export function deleteProfileSubSectionDataRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: DELETE_PROFILE_SUBSECTION_DATA.REQUEST,
  };
}

export function updateUserData(data, responseCallback = () => {}) {
  return {
    data,
    responseCallback,
    type: UPDATE_USER_DATA.SUCCESS,
  };
}

export function updateUserCoordinates(data, responseCallback) {
  return {
    data,
    responseCallback,
    type: UPDATE_USER_COORDINATES.SUCCESS,
  };
}

//this function is invoked first time when app is launched
export function locationToggleChange(data, responseCallback) {
  return {
    data,
    responseCallback,
    type: LISTEN_LOCATION_SERVICE_CHANGE.SUCCESS,
  };
}

export function socialLoginRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: SOCIAL_LOGIN.REQUEST,
  };
}

export function socialLoginSuccess(data, access_token, save_token) {
  return {
    data,
    access_token,
    save_token,
    type: SOCIAL_LOGIN.SUCCESS,
  };
}

export function contactUsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CONTACT_US.REQUEST,
  };
}

export function rememberMe(data) {
  return {
    data,
    type: REMEMBER_ME,
  };
}

export function isSocialLogin(data) {
  return {
    data,
    type: IS_SOCIAL_LOGIN,
  };
}

export function submitEditProfileRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: SUBMIT_EDIT_PROFILE.REQUEST,
  };
}

export function submitEditProfileSuccess(data) {
  return {
    data,
    type: SUBMIT_EDIT_PROFILE.SUCCESS,
  };
}

export function verifyNumberOtpRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: VERIFY_NUMBER_OTP.REQUEST,
  };
}

export function verifyNumberOtpSuccess(data) {
  return {
    data,
    type: VERIFY_NUMBER_OTP.SUCCESS,
  };
}

export function changeEmailOrPhoneRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CHANGE_EMAIL_OR_PHONE.REQUEST,
  };
}

export function changeEmailOrPhoneSuccess(data) {
  return {
    data,
    type: CHANGE_EMAIL_OR_PHONE.SUCCESS,
  };
}

export function changeEmailOrPhoneOTPRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CHANGE_EMAIL_OR_PHONE_OTP.REQUEST,
  };
}

export function changeEmailOrPhoneOTPSuccess(data) {
  return {
    data,
    type: CHANGE_EMAIL_OR_PHONE_OTP.SUCCESS,
  };
}

export function refreshToken(data) {
  return {
    data,
    type: REFRESH_TOKEN,
  };
}
