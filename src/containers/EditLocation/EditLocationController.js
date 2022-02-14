import React from 'react';
import PropTypes from 'prop-types';
import EditLocationView from './EditLocationView';
import {connect} from 'react-redux';
import util from '../../util';
import _ from 'lodash';
import {strings} from '../../constants';
import {Actions} from 'react-native-router-flux';

class EditLocationController extends React.Component {
  constructor(props) {
    super();
    this.state = {
      yourLocation: '',
      completeLocation: '',
      phone: '',
      phoneError: '',
    };
  }
  static propTypes = {};
  static defaultProps = {};

  setValue = key => {
    this.setState(key);
  };

  phoneFocus = () => {
    this.phoneRef.focus();
  };

  validation = () => {
    const {phone} = this.state;

    if (_.isEmpty(phone)) {
      this.setState({
        phoneError: strings.PHONE_NUM_IS_REQ,
        // util.isRequiredErrorMessage('Contact No'),
      });
      this.phoneFocus();
      return false;
    } else if (util.isNumber(phone) || phone === 'invalid') {
      this.setState({
        phoneError: strings.ENTER_VALID_NUMBER,
      });
      this.phoneFocus();
      return false;
    }
    return true;
  };

  handleSubmit = () => {
    // clear all error msg
    this.setState({
      phoneError: '',
    });
    // if validation pass
    if (this.validation()) {
      Actions.pop();
    }
  };

  render() {
    const {phoneError} = this.state;
    return (
      <EditLocationView
        {...this.props}
        setValue={this.setValue}
        handleSubmit={this.handleSubmit}
        yourLocationRef={ref => {
          this.yourLocationRef = ref;
        }}
        completeLocationRef={ref => {
          this.completeLocationRef = ref;
        }}
        phoneRef={ref => {
          this.phoneRef = ref;
        }}
        setPhone={(phone, isValid) => {
          isValid ? this.setState(phone) : this.setState({phone: 'invalid'});
        }}
        phoneFocus
        phoneError={phoneError}
      />
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(EditLocationController);
