import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import VerificationCodeView from './VerificationCodeView';
import {connect} from 'react-redux';
import util from '../../util';
import {customStatusBar} from '../../services/GeneralHelper';
import {Actions} from 'react-native-router-flux';
import {RESEND_CODE_TIMER, strings} from '../../constants';
import {
  userSignUpConfirmOtpRequest,
  confirmOTPRequest,
  resendOTPRequest,
  forgotPasswordRequest,
  userSignupRequest,
  verifyNumberOtpRequest,
  changeEmailOrPhoneOTPRequest,
  changeEmailOrPhoneRequest,
} from '../../actions/UserActions';

class VerificationCodeController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otpCode: '',
      incomingOTP: '',
      otpCodeError: '',
      editModalVisible: false,
      phoneNumError: '',
      loading: false,
      loadingOTP: false,
      userSignUpCredentials: props.signUpFormData,
      dataFromForgotPassword: props.forgotPasswordData,
      dataFromProfile: props.profilePayload,
      phone: '',
      phoneNumObj: {},
      disableResendOTP: true,
      otpExpireTime: RESEND_CODE_TIMER,
      resetCountdownId: Math.random(),
    };
  }
  static propTypes = {
    isForgetPassword: PropTypes.bool,
    fromSignUp: PropTypes.bool,
    incomingData: PropTypes.object,
    signUpFormData: PropTypes.object,
    userSignupRequest: PropTypes.func,
    forgotPasswordData: PropTypes.object,
    fromProfile: PropTypes.bool,
    profilePayload: PropTypes.any,
  };
  static defaultProps = {
    isForgetPassword: false,
    fromSignUp: false,
    incomingData: {},
    signUpFormData: {},
    userSignupRequest: () => {},
    forgotPasswordData: {},
    fromProfile: false,
    profilePayload: null,
  };

  componentDidMount() {
    const {incomingData} = this.props;
    customStatusBar();
    this.setState({
      incomingOTP: incomingData.otp,
    });
  }

  setValue = key => {
    this.setState(key);
  };
  // validation
  validation = () => {
    const {otpCode, otpCodeError} = this.state;

    if (_.isEmpty(otpCode)) {
      this.setState({
        otpCodeError: strings.CODE_REQUIRED,
        //util.isRequiredErrorMessage(strings.CODE),
      });
      return false;
    }
    return true;
  };

  handleSubmit = () => {
    const {
      userSignUpConfirmOtpRequest,
      confirmOTPRequest,
      incomingData,
      changeEmailOrPhoneOTPRequest,
      verifyNumberOtpRequest,
    } = this.props;

    const {otpCode, dataFromProfile} = this.state;
    // if verification pass
    if (this.validation()) {
      let payload = {};
      this.setState({loading: true});
      if (this.props.isForgetPassword) {
        payload = {
          user_id: incomingData.user_id,
          otp: otpCode,
        };
        confirmOTPRequest(payload, response => {
          if (response) {
            this.setState({loading: false});
            Actions.reset('passwordRecovery', {incomingData});
          }
          this.setState({loading: false});
        });
      } else if (this.props.fromProfile) {
        payload = {
          user_id: dataFromProfile.user_id,
          otp: otpCode,
        };
        changeEmailOrPhoneOTPRequest(payload, response => {
          if (response) {
            this.setState({loading: false});
            Actions.popTo('profile');
          }
          this.setState({loading: false});
        });
      } else {
        payload = {
          email: incomingData.email,
          otp: otpCode,
        };
        userSignUpConfirmOtpRequest(payload, response => {
          if (response) {
            this.setState({loading: false});

            Actions.reset('drawerMenu');
          }
          this.setState({loading: false});
        });
      }
    }
  };

  handleResetOTP = () => {
    const {
      isForgetPassword,
      fromSignUp,
      fromProfile,
      incomingData,
      resendOTPRequest,
      forgotPasswordRequest,
      changeEmailOrPhoneRequest,
    } = this.props;
    const {dataFromProfile} = this.state;
    this.setState({loadingOTP: true});

    if (isForgetPassword) {
      const payload = {
        user_id: incomingData.user_id,
      };

      forgotPasswordRequest(payload, response => {
        if (response.status) {
          this.setState({
            loadingOTP: false,
            incomingOTP: response.data.otp,
            disableResendOTP: true,
            resetCountdownId: Math.random(),
            otpCode: '',
          });
          this.otpRef.clear();
        }
        this.setState({loadingOTP: false});
      });
    } else if (fromProfile) {
      const payload = {
        user_id: dataFromProfile.user_id,
      };
      changeEmailOrPhoneRequest(payload, response => {
        if (response.status) {
          this.setState({
            loadingOTP: false,
            incomingOTP: response.data.otp,
            disableResendOTP: true,
            resetCountdownId: Math.random(),
            otpCode: '',
          });
          this.otpRef.clear();
        }
        this.setState({loadingOTP: false});
      });
    } else {
      const payload = {
        user_id: incomingData.email,
      };
      resendOTPRequest(payload, response => {
        if (response.status) {
          this.setState({
            loadingOTP: false,
            incomingOTP: response.data.otp,
            disableResendOTP: true,
            resetCountdownId: Math.random(),
            otpCode: '',
          });
          this.otpRef.clear();
        }
        this.setState({loadingOTP: false});
      });
    }
  };

  handleEditNumber = () => {
    const {userSignUpCredentials, phoneNumObj} = this.state;
    const {country_code, number, phone_number} = phoneNumObj;
    const {userSignupRequest} = this.props;
    let tempData = _.cloneDeep(userSignUpCredentials);
    if (this.validateNumber()) {
      tempData['contact'] = {
        country_code,
        phone_number,
        number,
      };

      this.setState({loadingOTP: true});
      userSignupRequest(tempData, response => {
        if (response.status) {
          this.setState({
            userSignUpCredentials: tempData,
            loadingOTP: false,
            incomingOTP: response.data.otp,
            resetCountdownId: Math.random(),
          });
          this.handleModal();
        }
        this.setState({loadingOTP: false});
      });
    }
  };

  validateNumber = () => {
    const {phone} = this.state;
    let valid = true;
    if (_.isEmpty(phone)) {
      this.setState({
        phoneNumError: strings.PHONE_NUM_IS_REQ,
        //util.isRequiredErrorMessage(strings.CONTACT_NUMBER),
      });
      // this.phoneFocus();
      valid = false;
    } else if (phone === 'invalid') {
      this.setState({
        phoneNumError: strings.ENTER_VALID_NUMBER,
      });
      // this.phoneFocus();
      valid = false;
    }

    return valid;
  };

  handleModal = () => {
    this.setState({
      editModalVisible: !this.state.editModalVisible,
    });
  };

  render() {
    const {
      incomingOTP,
      otpCode,
      otpCodeError,
      editModalVisible,
      verificationNum,
      phoneNumError,
      loading,
      loadingOTP,
      userSignUpCredentials,
      phone,
      number,
      dataFromForgotPassword,
      disableResendOTP,
      dataFromProfile,
    } = this.state;
    return (
      <VerificationCodeView
        {...this.props}
        incomingOTP={incomingOTP}
        otpCode={otpCode}
        verificationNum={verificationNum}
        loading={loading}
        number={number}
        dataFromProfile={dataFromProfile}
        dataFromForgotPassword={dataFromForgotPassword}
        disableResendOTP={disableResendOTP}
        phoneNumError={phoneNumError}
        otpCodeError={otpCodeError}
        userSignUpCredentials={userSignUpCredentials}
        phone={phone}
        otpExpireTime={this.state.otpExpireTime}
        resetCountdownId={this.state.resetCountdownId}
        handleSubmit={this.handleSubmit}
        loadingOTP={loadingOTP}
        handleResetOTP={this.handleResetOTP}
        setValue={this.setValue}
        handleModal={this.handleModal}
        editModalVisible={editModalVisible}
        handleEditNumber={this.handleEditNumber}
        setPhone={(phone, isValid, phoneNumObj) => {
          isValid
            ? this.setState({phone, phoneNumObj})
            : this.setState({phone: 'invalid'});
        }}
        otpRef={ref => {
          this.otpRef = ref;
        }}
      />
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {
  userSignUpConfirmOtpRequest,
  confirmOTPRequest,
  resendOTPRequest,
  forgotPasswordRequest,
  userSignupRequest,
  verifyNumberOtpRequest,
  changeEmailOrPhoneRequest,
  changeEmailOrPhoneOTPRequest,
};

export default connect(
  mapStateToProps,
  actions,
)(VerificationCodeController);
