// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {Text} from '../';
import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';
import styles from './styles';

export default class PhoneInputField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cca2: '',
    };
  }
  static propTypes = {};
  static defaultProps = {};

  componentDidMount() {
    this.setState({
      pickerData: this.phone.getPickerData(),
    });
  }

  onPressFlag = () => {
    this.countryPicker.openModal();
  };

  selectCountry = country => {
    this.phone.selectCountry(country.cca2.toLowerCase());
    this.setState({cca2: country.cca2});
  };

  render() {
    return (
      <View style={styles.container}>
        <PhoneInput
          ref={ref => {
            this.phone = ref;
          }}
          onPressFlag={this.onPressFlag}
        />
        <CountryPicker
          ref={ref => {
            this.countryPicker = ref;
          }}
          onChange={value => this.selectCountry(value)}
          translation="eng"
          cca2={this.state.cca2}>
          <View />
        </CountryPicker>
      </View>
    );
  }
}
