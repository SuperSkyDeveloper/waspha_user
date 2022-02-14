import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import SignWithSectionView from './SignWithSectionView';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import util from '../../util';
import {socialLoginRequest} from '../../actions/UserActions';
import {strings} from '../../constants';
import {getLocationsRequest} from '../../actions/SaveLocationsActions';
import {alertMessage} from '../../actions/GeneralActions';

class SignWithSectionController extends React.Component {
  constructor() {
    super();
    this.state = {
      socialLoginLoading: false,
    };
  }
  static propTypes = {
    signup: PropTypes.bool,
    login: PropTypes.bool,
  };
  static defaultProps = {
    signup: false,
    login: false,
  };

  socialLoginRequest = payload => {
    const {getLocationsRequest} = this.props;
    this.setState({socialLoginLoading: true});
    this.props.socialLoginRequest(payload, status => {
      this.setState({socialLoginLoading: false});
      if (status) {
        getLocationsRequest(response => {});

        Actions.reset('drawerMenu');
      }
    });
  };

  socialLoginError = (error = null) => {
    const {alertMessage} = this.props;
    let errorText = '';
    if (error === null) {
      this.setState({socialLoginLoading: false});
      return true;
    } else if (error && _.isString(error)) {
      errorText = error;
    } else {
      errorText = strings.SOMETHING_WENT_WRONG;
    }
    this.setState({socialLoginLoading: false});
    // util.topAlert(errorText, 'error');
    alertMessage(errorText);
  };

  render() {
    return (
      <SignWithSectionView
        {...this.props}
        socialLoginLoading={this.state.socialLoginLoading}
        socialLoginRequest={this.socialLoginRequest}
        socialLoginError={this.socialLoginError}
      />
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {socialLoginRequest, getLocationsRequest, alertMessage};

export default connect(
  mapStateToProps,
  actions,
)(SignWithSectionController);
