import React from 'react';
import _ from 'lodash';
import {selectContactPhone} from 'react-native-select-contact';
import PropTypes from 'prop-types';
import MyAddressView from './MyAddressView';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import util from '../../util';
import {strings} from '../../constants';
import {
  addLocationRequest,
  editLocationRequest,
} from '../../actions/SaveLocationsActions';
import {Platform} from 'react-native';

const getLocationAddress = (locationAddress, editLocationData) => {
  if (_.isEmpty(locationAddress) && _.isEmpty(editLocationData)) {
    return '';
  }

  if (!_.isEmpty(locationAddress)) {
    return locationAddress;
  } else {
    return editLocationData.address;
  }
};

class MyAddressController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: _.isNil(props.editLocationData)
        ? ''
        : props.editLocationData.title,
      phone: '',
      phoneNumObj: {},
      landmark: _.isNil(props.editLocationData)
        ? ''
        : props.editLocationData.landmark,
      address: getLocationAddress(
        props.locationAddress,
        props.editLocationData,
      ),
      titleError: '',
      phoneError: '',
      landmarkError: '',
      addressError: '',
      loading: false,
      shownNumber: _.isEmpty(props.editLocationData)
        ? ''
        : props.editLocationData.phone,

      locationCoordinates: _.isEmpty(props.editLocationData)
        ? props.coordinates
        : {
            latitude: props.editLocationData.lat,
            longitude: props.editLocationData.lng,
          },
      radioBtn1: false,
      radioBtn2: false,
    };
  }
  static propTypes = {
    locationAddress: PropTypes.string,
    coordinates: PropTypes.object,
    editLocationData: PropTypes.object,
    updateFavLocation: PropTypes.func,
  };
  static defaultProps = {
    locationAddress: '',
    coordinates: {},
    editLocationData: {},
    updateFavLocation: () => {},
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.locationAddress !== this.props.locationAddress) {
      this.setState({
        locationCoordinates: this.props.coordinates,
        address: this.props.locationAddress,
      });
    }
  }

  setValue = key => {
    this.setState(key);
  };

  titleFocus = () => {
    this.titleRef.focus();
  };

  phoneFocus = () => {
    this.phoneRef.focus();
  };

  landmarkFocus = () => {
    this.landmarkRef.focus();
  };

  addressFocus = () => {
    this.addressRef.focus();
  };

  renderRadioBtn1 = () => {
    return this.setState({
      radioBtn1: true,
      radioBtn2: false,
    });
  };

  renderRadioBtn2 = () => {
    return this.setState({
      radioBtn1: false,
      radioBtn2: true,
    });
  };

  validation = () => {
    const {
      title,
      phone,
      landmark,
      address,
      shownNumber,
      radioBtn1,
    } = this.state;
    let validate = true;
    if (_.isEmpty(address)) {
      this.setState({
        addressError: strings.ADDRESS_IS_REQ,
        //util.isRequiredErrorMessage(strings.ADDRESS),
      });
      this.addressFocus();
      validate = false;
    }

    if (_.isEmpty(landmark)) {
      this.setState({
        landmarkError: strings.LANDMARK_IS_REQ,
        //util.isRequiredErrorMessage(strings.LANDMARK),
      });
      this.landmarkFocus();
      validate = false;
    }

    if (!radioBtn1) {
      if (_.isEmpty(phone) && _.isEmpty(shownNumber)) {
        this.setState({
          phoneError: strings.PHONE_NUM_IS_REQ,
          //util.isRequiredErrorMessage(strings.CONTACT_NO),
        });
        // this.phoneFocus();
        validate = false;
      } else if (phone === 'invalid') {
        this.setState({
          phoneError: strings.ENTER_VALID_NUMBER,
        });
        // this.phoneFocus();
        validate = false;
      }
    }

    if (_.isEmpty(title)) {
      this.setState({
        titleError: strings.TITLE_IS_REQ,
        //util.isRequiredErrorMessage(strings.TITLE)
      });
      this.titleFocus();
      validate = false;
    }

    return validate;
  };

  handleSubmit = () => {
    const {
      locationAddress,

      addLocationRequest,
      editLocationRequest,
      editLocationData,
      updateFavLocation,
      user,
    } = this.props;
    const {
      title,
      landmark,
      address,
      phoneNumObj,
      shownNumber,
      locationCoordinates,
      radioBtn1,
    } = this.state;
    const {country_code, number, phone_number} = phoneNumObj;

    let userPhoneNumber = user.data.country_code + user.data.contact;

    this.setState({
      titleError: '',
      phoneError: '',
      landmarkError: '',
      addressError: '',
    });
    if (this.validation()) {
      let payload = {
        title,
        phone: radioBtn1
          ? userPhoneNumber
          : _.isEmpty(shownNumber)
          ? phone_number
          : shownNumber,
        landmark,
        location: {
          address,
          lat: locationCoordinates.latitude,
          lng: locationCoordinates.longitude,
        },
      };
      if (!_.isEmpty(locationAddress) && _.isEmpty(editLocationData)) {
        this.setState({loading: true});

        addLocationRequest(payload, response => {
          if (response.status) {
            updateFavLocation(response.data);
            this.setState({loading: false});
          }
          this.setState({loading: false});
        });
      } else if (!_.isEmpty(editLocationData)) {
        this.setState({loading: true});
        payload['id'] = editLocationData.id;

        editLocationRequest(payload, response => {
          if (response) {
            this.setState({loading: false});
          }
          this.setState({loading: false});
        });
      }
      Actions.pop();
    }
  };

  selectFromPhone = async () => {
    let data = true;
    if (util.isPlatformAndroid()) {
      data = await util.getContactPermission();
    }

    if (data) {
      selectContactPhone()
        .then(selection => {
          if (!selection) {
            return null;
          }

          let {contact, selectedPhone} = selection;

          this.setState({shownNumber: selectedPhone.number});
          return selectedPhone.number;
        })

        .catch(err => {
          console.log('EE', err);
        });
    }
  };

  render() {
    const {
      title,
      phone,
      landmark,
      address,
      titleError,
      phoneError,
      landmarkError,
      addressError,
      loading,
      shownNumber,
      radioBtn1,
      radioBtn2,
    } = this.state;

    const {contact, country_code} = this.props.user.data;
    let userPhoneNumber = country_code + contact;

    return (
      <MyAddressView
        {...this.props}
        title={title}
        phone={phone}
        landmark={landmark}
        address={address}
        titleError={titleError}
        phoneError={phoneError}
        addressError={addressError}
        landmarkError={landmarkError}
        loading={loading}
        shownNumber={shownNumber}
        titleFocus={this.titleFocus}
        phoneFocus={this.phoneFocus}
        landmarkFocus={this.landmarkFocus}
        addressFocus={this.addressFocus}
        setValue={data => this.setValue(data)}
        handleSubmit={this.handleSubmit}
        selectFromPhone={this.selectFromPhone}
        radioBtn1={radioBtn1}
        renderRadioBtn1={this.renderRadioBtn1}
        radioBtn2={radioBtn2}
        renderRadioBtn2={this.renderRadioBtn2}
        userPhoneNumber={userPhoneNumber}
        titleRef={ref => {
          this.titleRef = ref;
        }}
        phoneRef={ref => {
          this.phoneRef = ref;
        }}
        landmarkRef={ref => {
          this.landmarkRef = ref;
        }}
        addressRef={ref => {
          this.addressRef = ref;
        }}
        setPhone={(phone, isValid, phoneNumObj) => {
          isValid
            ? this.setState({phone, phoneNumObj})
            : this.setState({
                phone: 'invalid',
              });
        }}
      />
    );
  }
}

const mapStateToProps = ({user}) => ({
  coordinates: user.userCoordinates,
  user: user,
});

const actions = {addLocationRequest, editLocationRequest};

export default connect(
  mapStateToProps,
  actions,
)(MyAddressController);
