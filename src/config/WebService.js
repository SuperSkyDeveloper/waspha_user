import _ from 'lodash';
import Util from '../util';

// export const BASE_URL = 'https://waspha-staging.herokuapp.com/user/';
// export const BASE_URL = 'https://waspha-production.herokuapp.com/user/';
export const BASE_URL = 'https://api.waspha.com/user/';
// export const TRACKING_BASE_URL = 'https://waspha-tracking-dev.herokuapp.com';
export const TRACKING_BASE_URL = 'https://tracking.waspha.com';

export const API_TIMEOUT = 30000;

// API USER ROUTES
export const API_LOG = true;

export const ERROR_SOMETHING_WENT_WRONG = {
  message: 'Something went wrong, Please try again later',
  error: 'Something went wrong, Please try again later',
};
export const ERROR_NETWORK_NOT_AVAILABLE = {
  message: 'Please connect to the working Internet',
  error: 'Please connect to the working Internet',
};

export const ERROR_TOKEN_EXPIRE = {
  message: 'Session Expired, Please login again!',
  error: 'Session Expired, Please login again!',
};

export const REQUEST_TYPE = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete',
  PUT: 'put',
};

// API USER ROUTES

export const APP_SETTINGS = {
  route: 'app-settings',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const GET_TRANSLATIONS = {
  route: 'translations',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const USER_SIGNIN = {
  route: 'login',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const USER_SIGNUP = {
  route: 'signup-request',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const USER_SIGNOUT = {
  route: 'logout',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const SIGNUP_CONFIRM_OTP = {
  route: 'signup',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const USER_FORGOT_PASSWORD = {
  route: 'forget-password',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const GET_NEARBY_SHOPS = {
  route: 'get-nearby-stores',
  access_token_required: false, //asda
  type: REQUEST_TYPE.POST,
};

export const USER_CONFIRM_OTP_FGPASS = {
  route: 'verify-reset-password',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const USER_RESET_PASSWORD = {
  route: 'reset-password',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const RESEND_OTP = {
  route: 'resend-otp',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const USER_CHANGE_PASSWORD = {
  route: 'change-password',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_SHOP_DETAILS = {
  route: 'store-detail-info',
  access_token_required: true, //asda
  type: REQUEST_TYPE.POST,
};

export const GET_SHOP_REVIEWS = {
  route: 'store-reviews-ratings',
  access_token_required: false, //asda
  type: REQUEST_TYPE.POST,
};

export const GET_SHOP_POLICY = {
  route: 'store-policy',
  access_token_required: false, //asda
  type: REQUEST_TYPE.POST,
};

export const GET_DELIVERY_LIST = {
  route: 'order-listing',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_DELIVERY_STATUS_DETAILS = {
  route: 'order-status',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_DELIVERY_DETAILS = {
  route: 'order-detail',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const SAVE_LOCATIONS = {
  route: 'chrome',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_LOCATIONS = {
  route: 'locations',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const ADD_LOCATION = {
  route: 'add-location',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const EDIT_LOCATION = {
  route: 'edit-location',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const REMOVE_LOCATION = {
  route: 'delete-location',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const CREATE_RFP = {
  route: 'create-rfp',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const CANCEL_RFP = {
  route: 'cancel-rfp',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const UPDATE_AVATAR = {
  route: 'update-avatar',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_STORE_PRODUCTS = {
  route: 'store-products',
  access_token_required: false, //asda
  type: REQUEST_TYPE.POST,
};

export const SEARCH_STORE_PRODUCTS = {
  route: 'search-products',
  access_token_required: false, //asda
  type: REQUEST_TYPE.POST,
};

export const GET_STORE_CATEGORIES = {
  route: 'store-categories',
  access_token_required: false, //asda
  type: REQUEST_TYPE.POST,
};

export const SOCIAL_LOGIN = {
  route: 'social-login',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const CONTACT_US = {
  route: 'submit-contact-us',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_FAQS = {
  route: 'faq-listing',
  access_token_required: false, //asda
  type: REQUEST_TYPE.POST,
};
export const CHAT_LISTING = {
  route: 'chat-list',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const GET_RFP_LISTING = {
  route: 'my-rfp-listing',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_MY_ORDER_PROPOSALS = {
  route: 'my-order-proposals',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_MY_ORDER_DETAILS = {
  route: 'my-order-detail',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_MY_PROPOSAL_DETAILS = {
  route: 'my-order-proposal-detail',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const RESPOND_TO_PROPOSAL = {
  route: 'respond-proposal',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const CLOSE_RFP = {
  route: 'close-rfp',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const REVISE_PROPOSAL = {
  route: 'revise-proposal',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const CHANGE_LANGUAGE = {
  route: 'change-language',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_CATEGORY_DETAILS = {
  route: 'category-detail',
  access_token_required: false, //asda
  type: REQUEST_TYPE.POST,
};

export const MAKE_PAYMENT = {
  route: 'make-payment',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const SUBMIT_RATING = {
  route: 'create-review-rating',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const UPDATE_DEVICE_ID = {
  route: 'device-token',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_QUEUE = {
  route: 'queue-status',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_RATINGS = {
  route: 'reviews-ratings',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_TERMS_AND_CONDITIONS = {
  route: 'waspha-terms-n-conditions',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const GET_PRIVACY_POLICY = {
  route: 'waspha-privacy-policy',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const GET_REORDER_LIST = {
  route: 'my-order-history',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_REORDER_DETAILS = {
  route: 'my-order-history-detail',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_NOTIFICATIONS_LIST = {
  route: 'notification-listing',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const IS_ORDER_RATED = {
  route: 'is-order-rated',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const SUBMIT_EDIT_PROFILE = {
  route: 'edit-profile',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_COOKIE_POLICY = {
  route: 'waspha-cookie-policy',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const GET_COPY_RIGHT_POLICY = {
  route: 'waspha-copyright-policy',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const GET_GDPR_COMPLIANCE_STATEMENT = {
  route: 'waspha-gdpr-compliance',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const GET_PROMO_CODES = {
  route: 'promo-codes',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const APPLY_PROMO_CODE = {
  route: 'apply-promo-code',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_ACTIVE_ORDERS = {
  route: 'active-orders',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const VERIFY_NUMBER_OTP = {
  route: 'chrome',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const CHANGE_EMAIL_OR_PHONE = {
  route: 'change-contact-or-email',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const CHANGE_EMAIL_OR_PHONE_OTP = {
  route: 'verify-contact-or-email',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const CHECK_DEVICE_STATE = {
  route: 'save-is-device-active',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const callRequest = function(
  url,
  data,
  parameter,
  header = {},
  ApiSauce,
  baseUrl = BASE_URL,
) {
  // note, import of "ApiSause" has some problem, thats why I am passing it through parameters

  let _header = header;
  if (url.access_token_required) {
    const _access_token = Util.getCurrentUserAccessToken();
    if (_access_token) {
      _header = {
        ..._header,
        ...{
          Authorization: `Bearer ${_access_token}`,
        },
      };
    }
  }

  const _url =
    parameter && !_.isEmpty(parameter)
      ? `${url.route}/${parameter}`
      : url.route;

  if (url.type === REQUEST_TYPE.POST) {
    return ApiSauce.post(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.GET) {
    return ApiSauce.get(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.PUT) {
    return ApiSauce.put(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.DELETE) {
    return ApiSauce.delete(_url, data, _header, baseUrl);
  }
  // return ApiSauce.post(url.route, data, _header);
};
