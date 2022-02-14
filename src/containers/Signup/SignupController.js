import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import util from '../../util';
import {strings} from '../../constants';
import PropTypes from 'prop-types';
import SignupView from './SignupView';
import {customStatusBar} from '../../services/GeneralHelper';
import {Actions} from 'react-native-router-flux';
import {userSignupRequest} from '../../actions/UserActions';
import {changeLanguageSuccess} from '../../actions/GeneralActions';
import COUNTRY_LIST from '../../constants/countries';
import {Keyboard} from 'react-native';

class SignupController extends React.Component {
  constructor() {
    super();
    this.state = {
      fullName: '',
      email: '',
      password: '',
      retypePwd: '',
      phone: '',
      fullNameError: '',
      passwordError: '',
      emailError: '',
      retypePwdError: '',
      phoneError: '',
      referralCodeError: '',
      hidePassword: true,
      hideRetypePwd: true,
      termsCheckBox: false,
      loading: false,
      termsError: '',
      phoneNumObj: {},
      selectedCountry: {},
      selectedCountryError: '',
      openLangModal: false,
      referralCode: '',
      isLangLoading: false,
    };
  }

  static propTypes = {};
  static defaultProps = {};

  componentDidMount() {
    customStatusBar();
  }

  handleChangeLanguage = lang => {
    const {changeLanguageSuccess} = this.props;
    this.setState({isLangLoading: true});

    util.switchLanguage(lang);
    util.updateLocale(lang);
    changeLanguageSuccess(lang);
    setTimeout(() => {
      this.setState({openLangModal: false, isLangLoading: false});
    }, 200);
  };
  handleLanguageModal = () => {
    this.setState({
      openLangModal: true,
    });
  };

  // get value from field and save into states
  setValue = key => {
    this.setState(key);
  };

  //  focus on fields
  fullNameFocus = () => {
    this.fullNameRef.focus();
  };

  emailFocus = () => {
    this.emailRef.focus();
  };

  passwordFocus = () => {
    this.passRef.focus();
  };
  retypePwdFocus = () => {
    this.retypePwdRef.focus();
  };

  phoneFocus = () => {
    this.phoneRef.focus();
  };

  referralCodeFocus = () => {
    this.referralCodeRef.focus();
  };

  // handle terms checkbox
  handleAcceptTerms = () => {
    this.setState({
      termsCheckBox: !this.state.termsCheckBox,
    });
  };

  // validation all login fields
  validation = () => {
    const {
      fullName,
      email,
      password,
      retypePwd,
      phone,
      termsCheckBox,
      selectedCountry,
    } = this.state;

    let valid = true;

    if (!termsCheckBox) {
      this.setState({
        termsError: strings.PLEASE_ACCEPT_OUR_TERMS_AND_CONDITIONS,
      });
      valid = false;
    }

    if (_.isEmpty(phone)) {
      this.setState({
        phoneError: strings.PHONE_NUM_IS_REQ,
        //util.isRequiredErrorMessage(strings.CONTACT_NO),
      });
      // this.phoneFocus();
      valid = false;
    } else if (phone === 'invalid') {
      this.setState({
        phoneError: strings.ENTER_VALID_NUMBER,
      });
      // this.phoneFocus();
      valid = false;
    }

    if (_.isEmpty(retypePwd)) {
      this.setState({
        retypePwdError: strings.RETYPE_PASSWORD_IS_REQ,
        //util.isRequiredErrorMessage(strings.RETYPE_PASSWORD),
      });
      this.retypePwdFocus();
      valid = false;
    } else if (retypePwd !== password) {
      this.setState({retypePwdError: strings.PASSWORD_NOT_MATCH});
      this.retypePwdFocus();
      valid = false;
    }

    if (_.isEmpty(password)) {
      this.setState({
        passwordError: strings.PASSWORD_IS_REQ,
        //util.isRequiredErrorMessage(strings.PASSWORD),
      });
      this.passwordFocus();
      valid = false;
    } else if (!util.isPasswordValid(password)) {
      this.setState({passwordError: strings.PASSWORD_LENGTH});
      this.passwordFocus();
      valid = false;
    } else if (!util.isStrongPassword(password)) {
      this.setState({
        passwordError: strings.PASSWORD_CONTAIN_ONE_CAPITAL_AND_ONE_NUMBER,
      });
      this.passwordFocus();
      valid = false;
    }

    if (_.isEmpty(email)) {
      this.setState({
        emailError: strings.EMAIL_IS_REQ,
        //util.isRequiredErrorMessage(strings.EMAIL)
      });
      this.emailFocus();
      valid = false;
    } else if (!util.isEmailValid(email)) {
      this.setState({emailError: strings.EMAIL_IS_NOT_VALID});
      this.emailFocus();
      valid = false;
    }

    if (_.isEmpty(fullName)) {
      this.setState({
        fullNameError: strings.FULL_NAME_IS_REQ,
        // util.isRequiredErrorMessage(strings.FULL_NAME),
      });
      this.fullNameFocus();
      valid = false;
    }

    return valid;
  };

  handleSubmit = () => {
    // clear all error msg

    const {userSignupRequest} = this.props;
    const {
      fullName,
      email,
      password,
      phoneNumObj,
      selectedCountry,
      referralCode,
    } = this.state;
    const {country_code, number, phone_number} = phoneNumObj;

    this.setState({
      fullNameError: '',
      passwordError: '',
      emailError: '',
      retypePwdError: '',
      termsError: '',
      phoneError: '',
    });

    // if validation pass
    if (this.validation()) {
      Keyboard.dismiss();
      const payload = {
        name: fullName,
        email,
        contact: {
          country_code,
          phone_number,
          number,
        },
        password,
        referral_code: referralCode,
      };
      this.setState({loading: true});
      if (_.isEmpty(referralCode)) {
        delete payload['referral_code'];
      }

      userSignupRequest(payload, response => {
        this.setState({loading: false});

        if (response.status) {
          Actions.verificationCode({
            signUpFormData: payload,
            fromSignUp: true,
            incomingData: response.data,
          });
        }
      });
    }
  };

  render() {
    const {
      fullName,
      password,
      phone,
      fullNameError,
      passwordError,
      phoneError,
      emailError,
      retypePwdError,
      hidePassword,
      hideRetypePwd,
      termsCheckBox,
      termsError,
      loading,
      selectedCountry,
      selectedCountryError,
      openLangModal,
      referralCode,
      referralCodeError,
      isLangLoading,
    } = this.state;
    return (
      <SignupView
        {...this.props}
        setValue={this.setValue}
        fullName={fullName}
        isLangLoading={isLangLoading}
        password={password}
        phone={phone}
        selectedCountry={selectedCountry}
        fullNameError={fullNameError}
        passwordError={passwordError}
        emailError={emailError}
        phoneError={phoneError}
        selectedCountryError={selectedCountryError}
        loading={loading}
        handleSubmit={this.handleSubmit}
        passwordFocus={this.passwordFocus}
        hidePassword={hidePassword}
        hideRetypePwd={hideRetypePwd}
        fullNameFocus={this.fullNameFocus}
        phoneFocus={this.phoneFocus}
        emailFocus={this.emailFocus}
        retypePwdFocus={this.retypePwdFocus}
        retypePwdError={retypePwdError}
        handleAcceptTerms={this.handleAcceptTerms}
        termsError={termsError}
        handleLanguageModal={this.handleLanguageModal}
        handleChangeLanguage={this.handleChangeLanguage}
        openLangModal={openLangModal}
        referralCode={referralCode}
        referralCodeError={referralCodeError}
        referralCodeFocus={this.referralCodeFocus}
        setPhone={(phone, isValid, phoneNumObj) => {
          isValid
            ? this.setState({phone, phoneNumObj})
            : this.setState({phone: 'invalid'});
        }}
        fullNameRef={ref => {
          this.fullNameRef = ref;
        }}
        termsCheckBox={termsCheckBox}
        emailRef={ref => {
          this.emailRef = ref;
        }}
        passRef={ref => {
          this.passRef = ref;
        }}
        retypePwdRef={ref => {
          this.retypePwdRef = ref;
        }}
        phoneRef={ref => {
          this.phoneRef = ref;
        }}
        referralCodeRef={ref => {
          this.referralCodeRef = ref;
        }}
      />
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {userSignupRequest, changeLanguageSuccess};

export default connect(
  mapStateToProps,
  actions,
)(SignupController);
