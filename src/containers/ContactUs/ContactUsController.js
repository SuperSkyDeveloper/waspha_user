import React from 'react';
import PropTypes from 'prop-types';
import ContactUsView from './ContactUsView';
import util from '../../util';
import {strings} from '../../constants';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import _ from 'lodash';
import {contactUsRequest} from '../../actions/UserActions';
const refSubject = React.createRef();
const refMessage = React.createRef();
class ContactUsController extends React.Component {
  constructor() {
    super();
    this.state = {
      subject: '',
      message: '',
      subjectError: '',
      messageError: '',
      confirmModal: false,
      loading: false,
    };
  }
  static propTypes = {};
  static defaultProps = {};

  setValue = key => {
    this.setState(key);
  };

  subjectFocus = () => {
    // this.subjectRef.focus();
  };

  messageFocus = () => {
    //this.messageRef.focus();
  };

  validation = () => {
    const {subject, message} = this.state;
    let error = true;

    if (_.isEmpty(message)) {
      this.setState({
        messageError: strings.MESSAGE_IS_REQ,
        //util.isRequiredErrorMessage(strings.MESSAGE),
      });
      this.messageFocus();
      error = false;
    }

    if (_.isEmpty(subject)) {
      this.setState({
        subjectError: strings.SUBJECT_IS_REQ,
        //util.isRequiredErrorMessage(strings.SUBJECT),
      });
      this.subjectFocus();
      error = false;
    }
    return error;
  };

  handleSubmitPress = () => {
    const {subject, message} = this.state;
    const {contactUsRequest} = this.props;
    this.setState({
      messageError: '',
      subjectError: '',
    });
    if (this.validation()) {
      const payload = {
        subject,
        message,
      };
      this.setState({loading: true});
      contactUsRequest(payload, response => {
        if (response) {
          this.setState({
            message: '',
            subject: '',
            confirmModal: true,
          });
          this.subjectFocus();
        }
        this.setState({loading: false});
      });
    }
  };

  render() {
    const {
      subjectError,
      messageError,
      subject,
      message,
      confirmModal,
      loading,
    } = this.state;
    return (
      <ContactUsView
        refMessage={refMessage}
        refSubject={refSubject}
        subject={subject}
        message={message}
        subjectRef={ref => {
          this.subjectRef = ref;
        }}
        messageRef={ref => {
          this.messageRef = ref;
        }}
        subjectEror={subjectError}
        loading={loading}
        confirmModal={confirmModal}
        messageError={messageError}
        subjectFocus={this.subjectFocus}
        messageFocus={this.messageFocus}
        handleSubmitPress={this.handleSubmitPress}
        setValue={this.setValue}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {contactUsRequest};

export default connect(
  mapStateToProps,
  actions,
)(ContactUsController);
