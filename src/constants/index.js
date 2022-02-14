import LocalizedStrings from 'react-native-localization';

// export const TIME_ZONE = (-1 * new Date().getTimezoneOffset()) / 60;
export const APP_URL = '';
export const APP_DOMAIN = '';
export const QUERY_LIMIT = 10;
export const SAGA_ALERT_TIMEOUT = 500;
export const ANIMATION_DURATION = 250;
export const LATITUDE_DELTA = 0.0922;
export const NAME_LENGTH = 100;
export const DESC_LENGTH = 1000;

// date time formats
// date time formats
export const DATE_FORMAT1 = 'dddd, DD MMMM, YYYY';
export const DATE_FORMAT2 = 'DD/MM/YYYY';
export const DATE_FORMAT3 = 'YYYY-MM-DD';
export const DATE_FORMAT4 = 'DD-MM-YYYY';
export const TIME_FORMAT1 = 'hh:mm a';
export const TIME_FORMAT2 = 'hh:mm';
export const TIME_FORMAT3 = 'hh';
export const DATE_TIME = 'DD-MM-YYYY hh:mm a';

// Messages

export const LOCATION_PERMISSION_DENIED_ERROR2 =
  'Location permission required, please go to app settings to allow access';
export const INVALID_NAME_ERROR = 'Invalid name';
export const INVALID_EMAIL_ERROR = 'Invalid email';
export const INTERNET_ERROR = 'Please connect to the working internet';
export const SESSION_EXPIRED_ERROR = 'Session expired, Please login again';
export const GOOGLE_MAPS_APIKEY = 'AIzaSyAB4_6W1YjYTt0AMDuBmmgqMlQCefe45Wg';
export const GOOGLE_COUNTRY_APIKEY = 'AIzaSyDXD-qniR-L-VgIziA8K0C__wR5YJnY640';
export const PLACES_API_KEY = 'AIzaSyCYiK5W3N6Zf0t6z_dxIvVtRfLbYFthnv4';

// Message types
export const MESSAGE_TYPES = {
  INFO: 'info',
  ERROR: 'error',
  SUCCESS: 'success',
};

// version
export const APP_VERSION = 'Version 0.10.2';
export const COUNTRY_ITEM_HEIGHT = 60;

// File Types
export const FILE_TYPES = {VIDEO: 'video', IMAGE: 'image', AUDIO: 'audi'};

// Text Fields limit
export const inputFieldsLimit = {
  mLimit100: 100,
  mLimit1000: 1000,
};

export const strings = new LocalizedStrings({
  en: {
    KHALID_ALI: 'Khalid Ali',
    LOGIN: 'Login',
    EMAIL_ID: 'EMAIL ID',
    EMAIL: 'Email',
    LEGAL: 'Legal',
    SETTINGS: 'Settings',
    SELECT_COUNTRY: 'Select Country',
    PLEASE_SELECT_DELIVERY_LOC: 'Please select a delivery locatio',
    HOLD_ON: 'Hold on',
    NAVIGATE_BACK: 'Are you sure you want to navigate back',
    SIGNUP: ' SIGN UP',
    SIGN_UP_NOW: 'SIGN UP NOW',
    THANK_YOU_SHOPPING_WASPHA: 'Thank you for shopping with WASPHA',
    PROPOSAL: 'Proposal',
    CURRENT: 'Current',
    UPCOMING: 'Upcoming',
    PAST: 'Past',
    REFERRAL_DES:
      'Refer the Waspha App to your friends and family and earn money just by viewing advertisements and refer again',
    PROPOSALS: 'Proposals',
    ORDER_DATE: 'Order Date',
    FILL_DETALS_AND_CREATE_ACCOUNT:
      'Please fill the details and create account',
    PASSWORD_LENGTH: 'password must contain more than 5 characters',
    PASSWORD_NOT_MATCH: 'Password does not match ',
    PASSWORD: 'Password',
    RECOVERY: 'Recovery',
    ENTER_VERIFICATION_CODE: 'Enter Verification \nCode',
    PAYMENT_FAILED_TRY_AGAIN: 'Payment Failed,try again',
    CONTINUE: 'CONTINUE',
    RESET_YOUR_PASSWORD: 'Reset Your \nPassword',
    RECOVER_PASSWORD_USING_EMAIL: 'Recover password using Email Or \nPhone No',
    FORGET: 'Forget',
    EMAIL_IS_NOT_VALID: 'Email is not valid',
    WELCOME_PLEASE_LOGIN_TO_YOUR_ACCOUNT:
      'Welcome, Please login to \nyour account.',
    SIGN_UP: 'Sign up',
    DONT_HAVE_AN_ACCOUNT: "Don't Have An Account",
    ACCOUNT: 'Account',
    VERIFICATION: 'Verification',
    WE_ARE: ' WE ARE',
    WASPHA: 'WASPHA',
    FORGOT_PASSWORD: 'Forgot your password',
    ENTER_CODE: 'Enter Code',
    SELECT: 'Select',
    LANGUAGE: 'Language',
    ENGLISH: 'English',
    ARBIC: 'Arbic',
    PAYMENTS: 'Payments',
    FULL_NAME: ' Full Name',
    VERIFIED: 'Verified',
    RE_ORDER_LIST: 'Re-Order List',
    VIEW_REVIEWS: 'View Reviews',
    DISTANCE: 'Distance',
    OPENING_HOURS: 'Opening Hours',
    MORE_INFORMATION: 'More Information',
    CUSTOM_NEED: 'Custom Need',
    RE_ORDER: 'RE-ORDER',
    MENU_OFFER: 'MENU OFFER',
    WASPHA_WALLET: 'WASPHA Wallet',
    CURRENT_PAYMENT_METHODS: 'Current Payment Methods',
    WRITE_DESCRP_HERE: 'Write Description here',
    ADD_PAYMENT_METHOD: 'ADD PAYMENT METHOD',
    CONTACT_NUMBER: 'CONTACT NUMBER',
    RESENT_CODE: 'Resent Code',
    OPEN: 'OPEN',
    TRENDING_PRODUCTS: 'Trending Products',
    SEE_ALL: 'See all',
    CATEGORY: 'Category',
    NO_PRODUCTS_FOUND: 'No products found',
    FEATURED: 'Featured',
    COMMENTS: 'Comments',
    MY_CART: 'My Cart',
    ADDITIONAL_NOTES: 'Additional Notes',
    CHECKOUT: 'CHECK-OUT',
    PROPOSAL: 'Proposal',
    ADDITIONAL_NOTE: 'Additional Note',
    SUBMIT: 'Submit',
    SELECT_PAYMENT_METHOD: 'Select Payment Method',
    YOUR_USING_WASPHA_WALLET: "You'r using WASPHA Wallet",
    ENTER_OR_SELECT_COUPON: 'Enter or Select Coupon',
    CONTACT_NUMBER: 'Contact Number',
    ORDER_PLACE: 'Order Place',
    WRITE_TITLE_HERE: 'Title here',
    ADD_COUPON: 'Add Coupon',
    UPLOAD_IMAGE: 'Upload Image',
    APPLY: 'APPLY',
    PAYMENT_AMOUNT: 'Payment Amount',
    DELIVERY: 'Delivery',
    ITEMS_SUBTOTAL: 'Items Subtotal',
    DISCOUNT_RATE: 'Discount (Rate)',
    DISCOUNT_AMOUNT: 'Discount Amount',
    WASPHA_FEES_AMOUNT: 'WASPHA Fees Amount',
    CHARACTER_LIMIT_EXCEEDED: 'The character limit has exceeded',
    WAITING_PARKING_CHARGES: 'Waiting/ Parking Charges',
    DELIVERY_FEES: 'Delivery Fees',
    WASPHA_CASH_USED: 'WASPHA Cash Used',
    PROVIDERS: 'Providers',
    WASPHA_FEES_RATE: 'WASPHA Fees (Rate)',
    SAVE_DELIVERY_LOCATION: 'Save Delivery Location',
    Location: 'Location',

    TOTAL_TO_BE_PAID: 'Total to be paid',
    EST_BILL: 'Estimated Bill',
    ESTIMATE: 'Estimate',
    REMOVE_ITEM: 'Remove Item',
    TOTAL: 'Total',
    BILL: 'Bill',
    MAKE_PAYMENT: 'Make Payment',
    NEW_ITEM: 'New Item',
    SAVE_LOCATION_PLACEHOLDER: 'Street abc, address , town',
    SELECT_IMAGE: 'Select Image',
    EST: ' EST',
    SIGNOUT: 'Signout',
    UPLOAD: 'UPLOAD',
    YES: 'Yes',
    NO: 'No',
    Evaluate_WASPHA: 'Evaluate WASPHA',
    D_O_B: 'D.O.B',
    GENDER: 'Gender',
    RESET_PASSWORD: 'Reset Password',
    ENTER_NEARBY_LOCATIONS: 'Enter nearby location',
    REQUIREMENT: 'Requirement',
    NEARBY: 'Nearby',
    ADDRESS_TITLE: 'Address Title',
    PHONE_NUM: 'Phone Number',
    ORDER_PLACEMENT: 'Order Placement',
    ADDRESS: 'Address',
    REQUIREMENTS: 'Requirements',
    LANDMARK: 'Landmark',
    ENTER_TITLE: 'Enter Title',
    ENTER_NUM: 'Enter Number',
    ADD: 'ADD',
    PICK_UP_PIN_LOCATION: 'Pick up pin location',
    ORDER_PLACEMENT_TIME: 'Order Placement Time',
    EDIT_LOCATION: 'Edit Location',
    YOUR_LOCATION: 'Your Location',
    COMPLETE_LOCATION: 'Complete Location',
    YOU_ARE_CONNECTED_TO: 'You are connected to',
    PROVIDERS: 'Providers',
    WAITING_FOR_VENDORS_RESPONSE: `Waiting for vendor's response`,
    MOBILE_NUM: 'Mobile Number',
    PHONE_NO: 'PHONE NO',
    STAY_LOGGED_IN: 'Stay Logged In',
    MY_ORDER_PROPOSAL: 'My Order & Proposal',
    PAYMENT: 'Payment',
    WALLET: 'Wallet',
    PROMO_CODE: 'Promo Code',
    CHAT_CONVERSATION: 'Chat Conversation',
    INVITE_EARN: 'Invite & Earn',
    DELIVERY_CENTER: 'Delivery Center',
    MY_ADDRESS: 'My Address',
    EDIT_LOCATION: 'Edit Location',
    CONTACT_US: 'Contact Us',
    ADS_PRIZES: 'ADs & Prizes',
    FAQ: `FAQ's`,
    LOGOUT: 'Logout',
    ACTIVATE_NIGHT_MODE: 'Activate Night mode',
    ORDER_CODE: 'Order Code',
    ITEMS_TO_BE_COLLECTED: 'Items to be collected',
    ORDER_STATUS: 'Order Status',
    PAYMENT_DETAIL: 'Payment Detail',
    PROCEED_TO_CHECKOUT: 'Proceed to Checkout',
    ORDER_AND_PROPOSAL: 'Order And \nProposal',
    ORDER_DETAILS_1: 'Order Detail',
    ORDER_DETAILS: 'ORDER DETAILS',
    ACCEPT_PROPOSAL: 'Accept Proposal',
    PRICE: 'Price',
    QTY: 'QTY',
    REJECT: 'Reject',
    REVISE: 'Revise',
    SHARE: 'Share',
    REMARKS: 'Remarks',
    PRODUCT: 'Product',
    PROCEED_TO_CART: 'Proceed to cart',
    CANCEL: 'Cancel',
    CANCEL_ORDER: 'Cancel Order',
    WHY_CANCEL_ORDER: 'Why do you wish to cancel your order',
    ADD_DESCRP: 'Add Description',
    PLEASE_FILL_ITEM_DETAILS: 'Please fill your item title and requirements',
    TITLE_REQ: 'Title is Required',
    GIVE_REQUIREMENT: 'Please give some requirements',
    PH0NE: 'Phone',
    SUBMIT: 'SUBMIT',
    SCHEDULE: 'SCHEDULE',
    ARE_YOU_SURE: 'Are you sure',
    ARE_YOU_SURE_TO_DELETE_ADDRESS:
      'Are you sure you want to delete this address',
    DO_YOU_WANT_TO_DELETE_ORDER: 'Do you want to delete order',
    MOBILE_NO: 'MOBILE NO.',
    NO_ORDER_FOUNDS: 'No order founds',
    PROPOSAL_DETAIL: 'Proposal Detail',
    REQUIRMENTS: 'Requirments',
    SHARE_PROPOSAL: 'Share Proposal',
    EXPIRY_DATE: 'Expiry Date',
    EXPIRY_TIME: 'Expiry Time',
    PROPOSAL_REVISION: 'Proposal Revision',
    ADD_IMAGE: 'Add image',
    ADD_TEXT_HERE: 'Add text here.....',
    CAMERA: 'Camera',
    GALLERY: 'Gallery',
    CLOSE: 'Close',
    UPLOAD_IMAGE: 'Upload Image',
    AGO: 'ago',
    MIN: 'min',
    PROPOSAL_DETAIL: 'Proposal Detail',
    WRITE_HERE: 'Write here',
    ORDER_TYPE: 'Order Type',
    ESP: 'ESP',
    PLEASE_ACCEPT_OUR_TERMS_AND_CONDITIONS:
      'Please accept our terms and conditions',
    PRIVACY_POLICY: 'Privacy Policy',
    TERMS_CONDITIONS: 'Terms & Conditions',
    BY_CONTINUING_I_CONFIRM_THAT_HAVE_READ_AGREE_TO_THE:
      'By continuing, I confirm that I have read & agree to the',
    AND: 'and',
    PASSWORD_RECOVERY: 'Password recovery',
    PASSWORD_RESET: 'Password Reset',
    SUCCESSFULLY: 'Successfully',
    DONE: 'Done',
    CREDIT_CARD: 'Credit Card',
    ENTER_VALID_NUMBER: 'Enter valid number',
    EDIT: 'Edit',
    NOW: 'Now',
    SCHEDULE: 'Schedule',
    SCHEDULE_YOUR_DELIVERY_TIME: 'Schedule Your Delivery Time',
    RESEND_CODE: 'Resend Code',
    PLEASE_SELECT_AN_IMAGE: 'Please select an image',
    PHONE_NO_SMALL: 'Phone Number',
    PROVIDER: 'Provider ABC',
    HOLD_ON: 'Hold On!',
    ARE_YOU_SURE_TO_REJECT: 'Are you sure you want to reject this proposal',
    ARE_YOU_SURE_TO_DELETE_ORDER: 'Are you sure you want to delete this order',
    CURRENT_PASSWORD: 'Current Password',
    CHANGE_PASSWORD: 'Change Password',
    NEW_PASSWORD: 'New Password',
    RETYPE_PASSWORD: 'Re-Type Password',
    SAVE: 'Save',
    KM: 'KM',
    AWAY: 'away',
    REMOVE_FROM_FAV: 'Remove From Favourites',
    NO_VENDORS_FOUND_NEAR: 'No vendors were found near your area',
    REVIEWS: 'Reviews',
    NO_POLICY_FOUND: 'No Policy Found',
    NO_REVIEWS_AVAILABLE: 'No Reviews Available',
    VERIFICATION_CODE_SEND_ON: 'Verification code send on',
    POINTS: 'Points',
    SCHEDULED_DELIVERY_TIME: 'Scheduled Delivery Time',
    FIND_PRODUCTS: 'Find Products',
    CONFIRM: 'Confirm',
    CONFIRM_ORDER: 'Confirm Order',
    SOMETHING_WENT_WRONG: 'Something went wrong',
    PICK_UP: 'Pick Up ',
    SKIP: 'Skip',
    FINISH: 'Finish',
    NEXT: 'Next',
    SAVE_CHANGES: 'Save Changes',
    SUBJECT_HERE: 'Subject here',
    MESSAGE_HERE: 'Message here',
    SEND: 'Send',
    MESSAGE: 'Message',
    SUBJECT: 'Subject',
    OK: 'OK',
    MESSAGE_HAS_BEEN_SENT_SUCCESSFULLY: 'Message has been sent successfully',
    FAQ: 'faq',
    NO_FAQS_FOUND: "No FAQ'S Found",
    ENTER_LANDMARK: 'Enter Landmark',
    THERE_ARE_SOME_OTHER_PROPOSALS:
      'There are some other proposals which might be active. Do you want to close your account',
    I_WILL_DECIDE_LATER: 'I will decide this later',
    YES_CLOSE_MY_ORDER: 'Yes, close my order',
    YOUR_ITEMS: 'Your Items',
    WRITE_REMARK_HERE: 'Write Remark Here',
    MULTIPLE_SHIFTS: 'Multiple Shifts',
    USER: 'User',
    DRIVER: 'Driver',
    DELIVERY_GUY: 'Delivery Guy',
    GROUP_CHAT: 'Group Chat',
    CHAT_OPTION: 'Chat Option',
    PASSWORD_CONTAIN_ONE_CAPITAL_AND_ONE_NUMBER:
      'Password must contain letter and number',
    REQUEST_CODE: 'Request Code',
    SELECT_LANGUAGE: 'Select Language',
    REFERRAL_CODE: 'Referral Code',
    REFER_VIEW_ADVT_EARN: 'Refer.View Advts.Earn',
    YOUR_REF_CODE: 'Your Referral Code',
    DELIVERY_AND_PICKUP: 'Delivery And Pickup',
    MAP_VIEW: 'Map View',
    LIST_VIEW: 'List View',
    YOUR_USING_CASH_ON_DELIVERY: "You'r using Cash on Delivery",
    DELIVERY_LOCATION: 'Delivery Location',
    NOT_ENOUGH_AMOUNT_IN_WALLET:
      "You don't have enough amount in wallet for this payment",
    ENTER_VENDOR_REVIEWS: 'Enter Vendor Reviews',
    ENTER_DRIVER_REVIEWS: 'Enter Driver Reviews',
    VENDOR: 'Vendor',
    RATINGS_SUBMIT_SUCCESSFULLY: 'Rating Submitted Successfully',
    RATING: 'Rating',
    RATINGS_LIST: 'Ratings List',
    COMPANY_POLICY: 'Company Policy',
    NO_INTERNET_CONNECTION:
      'No internet connection found Check your connection',
    TRY_AGAIN: 'Try Again',
    NOTIFICATIONS_LIST: 'Notifications List',
    NOTIFICATIONS: 'Notifications',
    NO_NOTIFICATIONS_FOUND: 'No Notifications Found',
    REJECT_PROPOSAL: 'Reject Proposal',
    MALE: 'Male',
    FEMALE: 'Female',
    OTHER: 'Other',
    COOKIE_POLICY: 'Cookie Policy',
    COPY_RIGHT_POLICY: 'Copyright Policy',
    TERMS_DELIVERY_PARTNER: 'Terms Delivery Partner',
    GDPR_COMPLIANCE_STATEMENT: 'GDPR Compliance statement',
    WHY_REJECT_PROPOSAL: ' Why do you wish to Reject this proposal ',
    RECEIVED: 'Received',
    NO_COOKIE_POLICY_FOUND: 'No Cookie Policy Found',
    NO_COPY_RIGHT_FOUND: 'No Copy Right Policy Found',
    NO_TERMS_DELIVERY_PARTNER: 'No Terms Delivery Partner Found',
    NO_GDPR_COMPLIANCE_STATEMENT_FOUND: 'No GDPR Compliance Statement Found',
    NUM_NOT_VERIFIED:
      'This phone number is not verified, your old number will be used',
    EMAIL_NOT_VERIFIED:
      'This email is not verified, your old email will be used',
    UNVERIFIED: 'Unverified',
    PROCEED: 'Proceed',
    SEARCH: 'Search',
    COUNTRY_LIST: 'Country list',
    PLEASE_SELECT_COUNTRY: 'Please Select a Country',
    GOOGLE_MAP: 'Google Map',
    WAZE_MAP: 'Waze Map',
    FAKE_ORDER: 'Fake Order',
    PICK_FROM_CONTACT_LIST: 'Pick from contact list',
    PRODUCT_CATEGORY: 'Product Category',
    DAYS: 'Days',
    HOURS: 'Hours',
    MINS: 'Mins',
    SECS: 'Secs',
    REVISION_REMAINING: 'Revision Remaining',
    IS: 'is',
    REQUIRED: 'required',
    USER_ID: 'User ID',
    CONTACT_NO: 'Contact No.',
    COUNTRY: 'Country',
    CODE: 'Code',
    TITLE: 'Title',
    NAME_IS_REQ: 'Name is required',
    DESC_IS_REQ: 'Description is required',
    QUANTITY_CANNOT_BE_ZERO: 'Quantity cannot be zero',
    IMG_IS_REQ: 'Image is required',
    ALREADY_HAVE_ACCOUNT: 'Already have an Account',
    CHECKOUT_PROPOSAL_BY: 'Checkout the Proposal by',
    SENT_BY: 'Sent by',
  },
  ar: {},

  // en: {},
  // ar: {},
});

// export const strings = new LocalizedStrings({
//   ar: {},
//   en: {},
// });

export const FORGET_OPTION = {
  EMAIL: 'email',
  PH0NE: 'phone',
};

// tab list order and proposal screen

// tab name order and proposal screen
export const ORDER_STATUS = {
  CURRENT: 'current',
  UPCOMING: 'upcoming',
  PAST: 'past',
};

// proposal revision comment length sthis

export const COMMENT_LENGTH = 1000;

export const PERMISSION = {
  HIDE: null,
  READ: 'read',
  WRITE: 'write',
};
export const MODAL_TYPE = {
  PRDOUCT_IMG: 'prdouctImg',
  PRDOUCT_IMG_REMARKS: 'prdouctImgRemarks',
};

export const ORDER_ITEM_TYPE = {
  orderPlaceItems: 'orderPlaceItems',
  createProposalForNewItems: 'createProposalForNewItems',
  onlyForRead: 'onlyForRead',
  forProposal: 'forProposal',
  deliveryDetails: 'deliveryDetails',
};

export const PAYMENT_TYPE = {
  WALLET: 'wallet',
  CASH_ON_DELIVERY: 'cash_on_delivery',
  CREDIT_CARD: 'card',
};

export const NOTIFICATION_PERMISSION_DENIED_ERROR =
  'Please allow notifications and get notified timely';

//flit notification Channel
export const NOTIFICATION_CHANNEL = {
  id: 'waspha-user-channel',
  name: 'Waspha Notifications',
};

export const PROMO_TYPES = {
  DISCOUNT: 'discount',
  BUY_1_GET_1: 'buy1_get1',
  GIFT_PRODUCT: 'gift_product',
};

export const APPLY_ON_OPTIONS = {
  SUBTOTAL: 'subtotal',
  TOTAL: 'total',
  WASPHA_FEES_AMOUNT: 'waspha_fee_amount',
  DELIVERY_FEE: 'delivery_fee',
};

export const NOTIFICATIONS = {
  NO_VENDORS_FOUND: 'no_vendors_found',
  PROPOSAL_RECEIVED: 'proposal_received',
  RFP_REJECTED: 'rfp_rejected',
  RFP_EXPIRED: 'rfp_expired',
  RFP_CANCELLED: 'rfp_cancelled',
  QUEUE_CALLED: 'queue_called',
  RIDER_ASSIGNED: 'rider_assigned',
  REVIEW_RECEIVED: 'review_received',
  RIDER_CHANGED: 'rider_changed',
  ADMIN_MESSAGE: 'admin_message',
  DELIVERY_MODE_CHANGED: 'delivery_mode_changed',
  ORDER_COMPLETED: 'order_completed',
  REVISION_ACCEPTED: 'revision_accepted',
  REVISION_REJECTED: 'revision_rejected',
  WALLET_ADDED: 'wallet_added',
  FAKE_ORDER: 'fake_order',
  CHAT_NOTIFICATION: 'message',
  LOYALTY_POINTS_UPDATED: 'loyalty_points_updated',
  DRIVER_ORDER_REJECTED: 'driver_order_rejected',
};

export const PLACED_ORDER_TYPE = {
  NORMAL: 'normal',
  TRADITIONAL: 'traditional',
};

export const RIDER_TYPE = {
  ONLINE: 'online',
  WASPHA_EXPRESS: 'waspha_express',
};

export const RESEND_CODE_TIMER = 60;

export const LOGIN_PLACEHOLDER = 'hani@yopmail.com / 0123456789';
