import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import ProfileView from './ProfileView';
import {connect} from 'react-redux';
import {customStatusBar} from '../../services/GeneralHelper';
import {
  userSignOutSuccess,
  updateAvatarRequest,
  isSocialLogin,
  submitEditProfileRequest,
  userSignOutRequest,
} from '../../actions/UserActions';
import {toISOString} from '../../helpers/generalHelper';
import util from '../../util';
import {strings} from '../../constants';
import {clearFavLocations} from '../../actions/SaveLocationsActions';
import {Actions} from 'react-native-router-flux';
import {helper, constains} from '../../s3Helper';

class ProfileController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSwitchActive: true,
      isImgUploadVisible: false,
      loading: false,
      isEditAble: false,
      userName: props.user.name,
      userNameError: '',
      email: props.user.email,
      emailError: '',

      dateOfBirth: _.isNull(props.user.dob) ? '' : props.user.dob,
      gender: _.isNil(props.user.gender) ? '' : _.capitalize(props.user.gender),
      showGender: _.isNil(props.user.gender)
        ? ''
        : _.capitalize(props.user.gender),
      openCalender: false,
      isGenderModal: false,
      activeGenderId: null,
      phone: props.user.contact,
      phoneNumObj: {},
      phoneNumError: '',
      phoneNum: props.user.contact,
    };
  }

  validation = () => {
    const {userName, email, phone, dateOfBirth, gender} = this.state;
    let valid = true;

    // if (_.isEmpty(dateOfBirth)) {
    //   this.setState({
    //     phoneError: util.isRequiredErrorMessage('Date of Birth'),
    //   });
    //   valid = false;
    // }

    // if (_.isEmpty(gender)) {
    //   this.setState({
    //     phoneError: util.isRequiredErrorMessage('Gender'),
    //   });
    //   valid = false;
    // }

    if (_.isEmpty(phone)) {
      this.setState({
        phoneError: strings.PHONE_NUM_IS_REQ,
        // util.isRequiredErrorMessage('Contact No'),
      });
      valid = false;
    } else if (phone === 'invalid') {
      this.setState({
        phoneError: strings.ENTER_VALID_NUMBER,
      });
      valid = false;
    }

    if (_.isEmpty(email)) {
      this.setState({
        emailError: strings.EMAIL_IS_REQ,
        // util.isRequiredErrorMessage('Email')
      });
      this.emailFocus();
      valid = false;
    } else if (!util.isEmailValid(email)) {
      this.setState({emailError: strings.EMAIL_IS_NOT_VALID});
      this.emailFocus();
      valid = false;
    }

    if (_.isEmpty(userName)) {
      this.setState({
        userNameError: strings.FULL_NAME_IS_REQ,
        //util.isRequiredErrorMessage('Full Name')
      });
      this.userNameFocus();
      valid = false;
    }

    return valid;
  };

  static propTypes = {
    user: PropTypes.object,
    userSignOutSuccess: PropTypes.func,
    updateAvatarRequest: PropTypes.func,
  };
  static defaultProps = {
    user: {},
    userSignOutSuccess: () => {},
    updateAvatarRequest: () => {},
  };

  componentDidMount() {
    customStatusBar();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.user.contact !== prevProps.user.contact) {
      this.setState({phoneNum: this.props.user.contact});
    }
  }

  userNameFocus = () => {
    this.userNameRef.focus();
  };

  emailFocus = () => {
    this.emailRef.focus();
  };

  setValue = key => {
    this.setState(key);
  };

  setSelectedDropDownValue = value => {
    this.setState({
      dateOfBirth: toISOString(value.toString()),
    });
  };

  updateProfileImage = async image => {
    let imagePayload = {
      uri: image.path,
      fileType: image.mime,
    };

    let imageLink = await helper.uploadImageOnS3(
      imagePayload,
      constains.folderList.USER,
    );

    const {updateAvatarRequest} = this.props;
    const payload = {
      avatar: imageLink,
    };
    this.setState({loading: true});
    updateAvatarRequest(payload, response => {
      if (response) {
        this.setState({isImgUploadVisible: false, loading: false});
      }
      this.setState({loading: false});
    });
  };

  closeImageModal = () => {
    this.setState({isImgUploadVisible: false});
  };

  signOut = () => {
    const {userSignOutRequest, isSocialLogin, clearFavLocations} = this.props;

    userSignOutRequest(response => {
      Actions.reset('login');

      isSocialLogin(false);
      clearFavLocations();
      if (response) {
      }
    });
  };

  submit = () => {
    const {gender, dateOfBirth, userName} = this.state;
    const {submitEditProfileRequest} = this.props;
    if (this.validation()) {
      this.setState({loading: true});

      const payload = {
        name: userName,
        dob: dateOfBirth,
        gender: gender.toLowerCase(),
      };

      submitEditProfileRequest(payload, response => {
        this.setState({loading: false});
        if (response) {
          Actions.pop();
        }
      });
    }
  };

  render() {
    const {
      isSwitchActive,
      isImgUploadVisible,
      loading,
      userName,
      userNameError,
      email,
      emailError,
      isEditAble,
      dateOfBirth,
      openCalender,
      gender,
      isGenderModal,
      activeGenderId,
      phone,
      phoneNumError,
      phoneNum,
      showGender,
    } = this.state;
    return (
      <ProfileView
        isSwitchActive={isSwitchActive}
        isImgUploadVisible={isImgUploadVisible}
        loading={loading}
        setValue={this.setValue}
        addProfileImage={this.addProfileImage}
        closeImageModal={this.closeImageModal}
        updateProfileImage={this.updateProfileImage}
        setSelectedDropDownValue={this.setSelectedDropDownValue}
        submit={this.submit}
        signOut={this.signOut}
        userName={userName}
        userNameError={userNameError}
        email={email}
        dateOfBirth={dateOfBirth}
        gender={gender}
        showGender={showGender}
        activeGenderId={activeGenderId}
        emailError={emailError}
        phone={phone}
        phoneNumError={phoneNumError}
        phoneNum={phoneNum}
        isGenderModal={isGenderModal}
        isEditAble={isEditAble}
        openCalender={openCalender}
        setPhone={(phone, isValid, phoneNumObj) => {
          isValid
            ? this.setState({phone, phoneNumObj})
            : this.setState({phone: 'invalid', phoneNum: phoneNumObj.number});
        }}
        userNameRef={ref => {
          this.userNameRef = ref;
        }}
        emailRef={ref => {
          this.emailRef = ref;
        }}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({user}) => ({
  user: user.data,
});

const actions = {
  userSignOutRequest,
  updateAvatarRequest,
  submitEditProfileRequest,

  isSocialLogin,
  clearFavLocations,
};

export default connect(
  mapStateToProps,
  actions,
)(ProfileController);
