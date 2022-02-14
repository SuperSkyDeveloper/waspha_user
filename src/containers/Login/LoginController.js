import React from 'react';
import {Keyboard} from 'react-native';
import _ from 'lodash';
import {connect} from 'react-redux';
import util from '../../util';
import {strings} from '../../constants';
import PropTypes from 'prop-types';
import LoginView from './LoginView';
import {changeLanguageSuccess} from '../../actions/GeneralActions';
import {customStatusBar} from '../../services/GeneralHelper';
import {Actions} from 'react-native-router-flux';
import {userSigninRequest, rememberMe} from '../../actions/UserActions';
import {getLocationsRequest} from '../../actions/SaveLocationsActions';

class LoginController extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: '',
      password: '',
      userIdError: '',
      passwordError: '',
      hidePassword: true,
      stayLogged: false,
      loading: false,
      openLangModal: false,
    };
  }

  static propTypes = {
    fromDrawer: PropTypes.bool,
  };
  static defaultProps = {
    fromDrawer: false,
  };

  componentDidMount() {
    customStatusBar();
    this.initial();
  }

  initial = () => {
    // check is user credentials save then fill in field
    const {credentials} = this.props;
    if (!_.isEmpty(credentials)) {
      this.setState({
        userId: credentials.userId,
        password: credentials.password,
        stayLogged: true,
      });
    }
  };

  handleChangeLanguage = lang => {
    const {changeLanguageSuccess} = this.props;
    util.switchLanguage(lang);
    util.updateLocale(lang);
    changeLanguageSuccess(lang);
    this.setState({openLangModal: false});
  };
  handleLanguageModal = () => {
    this.setState({
      openLangModal: true,
    });
  };

  handleShowPassword = () => {
    this.setState({
      hidePassword: !this.state.hidePassword,
    });
  };

  // get value from field and save into states
  setValue = key => {
    this.setState(key);
  };

  //  focus on fields
  userIdFocus = () => {
    this.userIdRef.focus();
  };

  passwordFocus = () => {
    this.passRef.focus();
  };

  handleStayLogged = () => {
    this.setState({
      stayLogged: !this.state.stayLogged,
    });
  };

  // validation all login fields
  validation = () => {
    const {userId, password, userIdError, passwordError} = this.state;
    let error = true;

    if (_.isEmpty(password)) {
      this.setState({
        passwordError: strings.PASSWORD_IS_REQ,
        // util.isRequiredErrorMessage(strings.PASSWORD),
      });
      this.passwordFocus();
      error = false;
    } else if (!util.isPasswordValid(password)) {
      this.setState({passwordError: strings.PASSWORD_LENGTH});
      this.passwordFocus();
      error = false;
    }
    if (_.isEmpty(userId)) {
      this.setState({
        userIdError: strings.USER_ID_IS_REQ,
        // util.isRequiredErrorMessage(strings.USER_ID),
      });
      this.userIdFocus();
      error = false;
    }

    return error;
  };

  // here i am check if user remember me then save user credentials
  handleRemember = () => {
    const {stayLogged, userId, password} = this.state;
    const {rememberMe} = this.props;
    if (stayLogged) {
      const payload = {
        userId,
        password,
      };
      rememberMe(payload);
    }
  };

  handleSubmit = () => {
    const {userSigninRequest, getLocationsRequest, fromDrawer} = this.props;
    const {userId, password} = this.state;
    // clear all error msg
    this.setState({
      userIdError: '',
      passwordError: '',
    });

    // if validation pass
    if (this.validation()) {
      Keyboard.dismiss();
      // here i am check if user remember me then save user credtionl
      this.handleRemember();

      this.setState({loading: true});

      const payload = {
        user_id: userId,
        password,
        language: this.props.appLanguage,
      };
      userSigninRequest(payload, response => {
        if (response) {
          getLocationsRequest(response => {});
          if (fromDrawer) {
            return Actions.reset('drawerMenu');
          }
          return Actions.pop();
        }
        this.setState({loading: false});
      });
    }
  };

  render() {
    const {
      userId,
      password,
      userIdError,
      passwordError,
      hidePassword,
      stayLogged,
      loading,
      openLangModal,
    } = this.state;
    return (
      <LoginView
        {...this.props}
        setValue={this.setValue}
        userId={userId}
        password={password}
        userIdError={userIdError}
        passwordError={passwordError}
        handleSubmit={this.handleSubmit}
        passwordFocus={this.passwordFocus}
        hidePassword={hidePassword}
        handleShowPassword={this.handleShowPassword}
        stayLogged={stayLogged}
        loading={loading}
        handleStayLogged={this.handleStayLogged}
        handleLanguageModal={this.handleLanguageModal}
        handleChangeLanguage={this.handleChangeLanguage}
        openLangModal={openLangModal}
        userIdRef={ref => {
          this.userIdRef = ref;
        }}
        passRef={ref => {
          this.passRef = ref;
        }}
      />
    );
  }
}

const mapStateToProps = ({user, general}) => ({
  credentials: user.credentials,
  appLanguage: general.appLanguage,
});

const actions = {
  userSigninRequest,
  getLocationsRequest,
  rememberMe,
  changeLanguageSuccess,
};

export default connect(
  mapStateToProps,
  actions,
)(LoginController);
