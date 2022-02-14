// @flow
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const CANCEL = 'CANCEL';
const FAILURE = 'FAILURE';

function createRequestTypes(base) {
  const res = {};
  [REQUEST, SUCCESS, FAILURE, CANCEL].forEach(type => {
    res[type] = `${base}_${type}`;
  });
  return res;
}

export const NETWORK_INFO = 'NETWORK_INFO';
export const USER_SIGNUP = createRequestTypes('USER_SIGNUP');
export const USER_SIGNIN = createRequestTypes('USER_SIGNIN');
export const SOCIAL_LOGIN = createRequestTypes('SOCIAL_LOGIN');
export const USER_SIGNOUT = createRequestTypes('USER_SIGNOUT');
export const UPDATE_USER_DATA = createRequestTypes('UPDATE_USER_DATA');
export const UPDATE_USER_COORDINATES = createRequestTypes(
  'UPDATE_USER_COORDINATES',
);

export const CONTACT_US = createRequestTypes('CONTACT_US');

export const LISTEN_LOCATION_SERVICE_CHANGE = createRequestTypes(
  'LISTEN_LOCATION_SERVICE_CHANGE',
);

export const UPDATE_USER_PROFILE = createRequestTypes('UPDATE_USER_PROFILE');
export const USER_FORGOT_PASSWORD = createRequestTypes('USER_FORGOT_PASSWORD');
export const GET_INITIAL_REGION = createRequestTypes('GET_INITIAL_REGION');
export const RESEND_OTP = createRequestTypes('RESEND_OTP');

export const SIGNUP_CONFIRM_OTP = createRequestTypes('SIGNUP_CONFIRM_OTP');
export const USER_CONFIRM_OTP_FGPASS = createRequestTypes(
  'USER_CONFIRM_OTP_FGPASS',
);
export const USER_RESET_PASSWORD = createRequestTypes('USER_RESET_PASSWORD');
export const CHAT_LISTING = createRequestTypes('CHAT_LISTING');

export const USER_CHANGE_PASSWORD = createRequestTypes('USER_CHANGE_PASSWORD');
export const CONTACT_ADMIN = createRequestTypes('CONTACT_ADMIN');
export const GET_SERVICE_TYPES = createRequestTypes('GET_SERVICE_TYPES');
export const GET_NEARBY_SERVICE_PROVIDERS = createRequestTypes(
  'GET_NEARBY_SERVICE_PROVIDERS',
);
export const CLEAR_SERVICE_PROVIDERS_DATA = 'CLEAR_SERVICE_PROVIDERS_DATA';
export const GET_NEWS = createRequestTypes('GET_NEWS');
export const GET_EVENTS = createRequestTypes('GET_EVENTS');
export const GET_MONTLY_EVENTS = createRequestTypes('GET_MONTLY_EVENTS');
export const GET_SEARCH_EVENTS = createRequestTypes('GET_SEARCH_EVENTS');
export const GET_ORGANIZATIONS = createRequestTypes('GET_ORGANIZATIONS');
export const GET_REVIEWS = createRequestTypes('GET_REVIEWS');
export const GET_PROFILE_SECTIONS = createRequestTypes('GET_PROFILE_SECTIONS');
export const POST_PROFILE_DATA = createRequestTypes('POST_PROFILE_DATA');
export const DELETE_PROFILE_SUBSECTION_DATA = createRequestTypes(
  'DELETE_PROFILE_SUBSECTION_DATA',
);
export const GET_DELIVERY_LIST = createRequestTypes('GET_DELIVERY_LIST');
export const GET_DELIVERY_STATUS_DETAILS = createRequestTypes(
  'GET_DELIVERY_STATUS_DETAILS',
);
export const GET_DELIVERY_DETAILS = createRequestTypes('GET_DELIVERY_DETAILS');

export const GET_CATEGORY_DETAILS = createRequestTypes('GET_CATEGORY_DETAILS');

export const GET_AVAILABLE_CATEGORIES = createRequestTypes(
  'GET_AVAILABLE_CATEGORIES',
);

export const UPDATE_DELIVERY_METHOD = createRequestTypes(
  'UPDATE_DELIVERY_METHOD',
);

export const GET_NEARBY_SHOPS = createRequestTypes('GET_NEARBY_SHOPS');
export const GET_SHOP_DETAILS = createRequestTypes('GET_SHOP_DETAILS');
export const GET_SHOP_REVIEWS = createRequestTypes('GET_SHOP_REVIEWS');
export const GET_SHOP_POLICY = createRequestTypes('GET_SHOP_POLICY');
export const CREATE_RFP = createRequestTypes('CREATE_RFP');
export const CANCEL_RFP = createRequestTypes('CANCEL_RFP');
export const UPDATE_AVATAR = createRequestTypes('UPDATE_AVATAR');

export const ADD_LOCATION = createRequestTypes('ADD_LOCATION');
export const EDIT_LOCATION = createRequestTypes('EDIT_LOCATION');
export const GET_LOCATIONS = createRequestTypes('GET_LOCATIONS');
export const REMOVE_LOCATION = createRequestTypes('REMOVE_LOCATION');

export const SAVE_LOCATIONS = createRequestTypes('SAVE_LOCATIONS');

export const GET_BRAIN_TREE_TOKEN = createRequestTypes('GET_BRAIN_TREE_TOKEN');
export const BRAIN_TREE_PAYMENT = createRequestTypes('BRAIN_TREE_PAYMENT');
export const LOGOUT = 'LOGOUT';
export const EMPTY = createRequestTypes('EMPTY');

export const GET_PRODUCTS = createRequestTypes('GET_PRODUCTS');
export const GET_CATEGORIES = createRequestTypes('GET_CATEGORIES');
export const GET_TRENDING_PRODUCTS = createRequestTypes(
  'GET_TRENDING_PRODUCTS',
);
export const GET_STORE_PRODUCTS = createRequestTypes('GET_STORE_PRODUCTS');

export const GET_STORE_CATEGORIES = createRequestTypes('GET_STORE_CATEGORIES');

export const CLEAR_STORE_PRODUCTS = createRequestTypes('CLEAR_STORE_PRODUCTS');

export const SEARCH_STORE_PRODUCTS = createRequestTypes(
  'SEARCH_STORE_PRODUCTS',
);

export const CLEAR_STORE_CATEGORIES = createRequestTypes(
  'CLEAR_STORE_CATEGORIES',
);
export const CART = createRequestTypes('CART');
export const ADD_CART_PRODUCT = createRequestTypes('ADD_CART_PRODUCT');
export const REMOVE_CART_PRODUCT = createRequestTypes('REMOVE_CART_PRODUCT');
export const REMOVE_ORDER = createRequestTypes('REMOVE_ORDER');
export const REMOVE_PROPOSAL_ITEM = createRequestTypes('REMOVE_PROPOSAL_ITEM');
export const GET_FAQS = createRequestTypes('GET_FAQS');
export const CHANGE_LANGUAGE = createRequestTypes('CHANGE_LANGUAGE');

export const GET_RFP_LISTING = createRequestTypes('GET_RFP_LISTING');

export const GET_MY_ORDER_PROPOSALS = createRequestTypes(
  'GET_MY_ORDER_PROPOSALS',
);

export const GET_MY_PROPOSAL_DETAILS = createRequestTypes(
  'GET_MY_PROPOSAL_DETAILS',
);
export const GET_MY_ORDER_DETAILS = createRequestTypes('GET_MY_ORDER_DETAILS');
export const REVISE_PROPOSAL = createRequestTypes('REVISE_PROPOSAL');

export const RESPOND_TO_PROPOSAL = createRequestTypes('RESPOND_TO_PROPOSAL');
export const CLOSE_RFP = createRequestTypes('CLOSE_RFP');
export const MAKE_PAYMENT = createRequestTypes('MAKE_PAYMENT');
export const SUBMIT_RATING = createRequestTypes('SUBMIT_RATING');
export const UPDATE_DEVICE_ID = createRequestTypes('UPDATE_DEVICE_ID');
export const GET_QUEUE = createRequestTypes('GET_QUEUE');
export const GET_RATINGS = createRequestTypes('GET_RATINGS');
export const GET_TERMS_AND_CONDITIONS = createRequestTypes(
  'GET_TERMS_AND_CONDITIONS',
);
export const GET_PRIVACY_POLICY = createRequestTypes('GET_PRIVACY_POLICY');

export const GET_REORDER_LIST = createRequestTypes('GET_REORDER_LIST');
export const GET_REORDER_DETAILS = createRequestTypes('GET_REORDER_DETAILS');
export const GET_NOTIFICATIONS_LIST = createRequestTypes(
  'GET_NOTIFICATIONS_LIST',
);

export const VERIFY_NUMBER_OTP = createRequestTypes('VERIFY_NUMBER_OTP');

export const IS_ORDER_RATED = createRequestTypes('IS_ORDER_RATED');

export const GET_COOKIE_POLICY = createRequestTypes('GET_COOKIE_POLICY');
export const GET_COPY_RIGHT_POLICY = createRequestTypes(
  'GET_COPY_RIGHT_POLICY',
);
export const SUBMIT_EDIT_PROFILE = createRequestTypes('SUBMIT_EDIT_PROFILE');

export const GET_GDPR_COMPLIANCE_STATEMENT = createRequestTypes(
  'GET_GDPR_COMPLIANCE_STATEMENT',
);

export const GET_PROMO_CODES = createRequestTypes('GET_PROMO_CODES');
export const APPLY_PROMO_CODE = createRequestTypes('APPLY_PROMO_CODE');

export const APP_SETTINGS = createRequestTypes('APP_SETTINGS');
export const GET_TRANSLATIONS = createRequestTypes('GET_TRANSLATIONS');
export const GET_ACTIVE_ORDERS = createRequestTypes('GET_ACTIVE_ORDERS');
export const CHECK_DEVICE_STATE = createRequestTypes('CHECK_DEVICE_STATE');
export const CHANGE_EMAIL_OR_PHONE = createRequestTypes(
  'CHANGE_EMAIL_OR_PHONE',
);
export const CHANGE_EMAIL_OR_PHONE_OTP = createRequestTypes(
  'CHANGE_EMAIL_OR_PHONE_OTP',
);

export const GET_UPDATED_TIME_AND_KM = createRequestTypes(
  'GET_UPDATED_TIME_AND_KM',
);

export const FIRST_TIME_OPEN = 'FIRST_TIME_OPEN';
export const CLEAR_FAV_LOCATIONS = 'CLEAR_FAV_LOCATIONS';
export const CLEAR_CART = 'CLEAR_CART';
export const CLEAR_QUEUE_VENDORS = 'CLEAR_QUEUE_VENDORS';
export const NO_QUEUE_VENDORS_FOUND = 'NO_QUEUE_VENDORS_FOUND';
export const REMEMBER_ME = 'REMEMBER_ME';
export const CLEAR_PROPOSAL_DETAILS = 'CLEAR_PROPOSAL_DETAILS';
export const IS_SOCIAL_LOGIN = 'IS_SOCIAL_LOGIN';
export const FAKE_ORDER_FOUND = 'FAKE_ORDER_FOUND';
export const CLEAR_PROMO_CODE = 'CLEAR_PROMO_CODE';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const ALERT_MESSAGE = 'ALERT_MESSAGE';
export const GET_DRIVER_CORDS = 'GET_DRIVER_CORDS';
export const STORE_SELECTED_SHOP_ID = 'STORE_SELECTED_SHOP_ID';
export const CLEAR_SELECTED_SHOP_ID = 'CLEAR_SELECTED_SHOP_ID';
export const SET_COUNTRY_CODE = 'SET_COUNTRY_CODE';
