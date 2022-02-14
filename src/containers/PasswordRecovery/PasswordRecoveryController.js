import React from 'react';
import PropTypes, {string} from 'prop-types';
import _ from 'lodash';
import PasswordRecoveryView from './PasswordRecoveryView';
import {connect} from 'react-redux';
import util from '../../util';
import {strings} from '../../constants';
import {customStatusBar} from '../../services/GeneralHelper';
import {Actions} from 'react-native-router-flux';
import {Alert} from 'react-native';
import {resetPasswordRequest} from '../../actions/UserActions';

class PasswordRecoveryController extends React.Component {
  constructor() {
    super();
    this.state = {
      otpCode: '',
      password: '',
      retypePwd: '',
      passwordError: '',
      retypePwdError: '',
      hidePassword: true,
      hideRetypePwd: true,
      loading: false,
    };
  }
  static propTypes = {incomingData: PropTypes.object};
  static defaultProps = {incomingData: {}};

  componentDidMount() {
    customStatusBar();
  }

  setValue = key => {
    this.setState(key);
  };

  passwordFocus = () => {
    this.passRef.focus();
  };
  retypePwdFocus = () => {
    this.retypePwdRef.focus();
  };

  // validation all login fields
  validation = () => {
    const {password, retypePwd, passwordError, retypePwdError} = this.state;

    let error = true;

    if (_.isEmpty(retypePwd)) {
      this.setState({
        retypePwdError: strings.RETYPE_PASSWORD_IS_REQ,

        // util.isRequiredErrorMessage(strings.RETYPE_PASSWORD),
      });
      this.retypePwdFocus();
      error = false;
    } else if (retypePwd !== password) {
      this.setState({retypePwdError: strings.PASSWORD_NOT_MATCH});
      this.retypePwdFocus();
      error = false;
    }

    if (_.isEmpty(password)) {
      this.setState({
        passwordError: strings.PASSWORD_IS_REQ,
        //util.isRequiredErrorMessage(strings.PASSWORD),
      });
      this.passwordFocus();
      error = false;
    } else if (!util.isPasswordValid(password)) {
      this.setState({passwordError: strings.PASSWORD_LENGTH});
      this.passwordFocus();
      error = false;
    }

    return error;
  };

  handleSubmit = () => {
    // clear all error msg
    const {incomingData, resetPasswordRequest} = this.props;
    const {password} = this.state;

    this.setState({
      passwordError: '',
      retypePwdError: '',
    });
    // if validation pass
    if (this.validation()) {
      this.setState({loading: true});
      const payload = {
        user_id: incomingData.user_id,
        password,
      };
      resetPasswordRequest(payload, response => {
        if (response) {
          this.setState({loading: false});

          Actions.reset('login', {fromDrawer: true});
        }
        this.setState({loading: false});
      });
    }
  };

  render() {
    const {
      otpCode,
      passwordError,
      hidePassword,
      password,
      hideRetypePwd,
      retypePwdError,
      loading,
    } = this.state;
    return (
      <PasswordRecoveryView
        {...this.props}
        otpCode={otpCode}
        handleSubmit={this.handleSubmit}
        setValue={this.setValue}
        password={password}
        loading={loading}
        hideRetypePwd={hideRetypePwd}
        hidePassword={hidePassword}
        passwordError={passwordError}
        retypePwdError={retypePwdError}
        retypePwdFocus={this.retypePwdFocus}
        passRef={ref => {
          this.passRef = ref;
        }}
        retypePwdRef={ref => {
          this.retypePwdRef = ref;
        }}
      />
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {resetPasswordRequest};

export default connect(
  mapStateToProps,
  actions,
)(PasswordRecoveryController);
