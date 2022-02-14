// @flow
import _ from 'lodash';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {
  View,
  Image,
  ImageBackground,
  StatusBar,
  DeviceEventEmitter,
} from 'react-native';
import PropTypes from 'prop-types';
import {Actions} from 'react-native-router-flux';
import moment, {duration} from 'moment';
import 'moment/locale/ar';
import {Images, Colors} from '../../theme';
import styles from './styles';
import Util from '../../util';
import {getInitialCoordinates} from '../../actions/SaveLocationsActions';
import {locationToggleChange} from '../../actions/UserActions';
import {
  appSettingsRequest,
  getTranslationsRequest,
  setCountryCode,
} from '../../actions/GeneralActions';
import util from '../../util';
import {strings} from '../../constants';
import {getCurrentRegion} from '../../services/GeneralHelper';

class Welcome extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    userData: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const {
      userData,
      locationToggleChange,
      initialRun,
      appLanguage,
      setCountryCode,
    } = this.props;

    getCurrentRegion(true).then(countryCode => {
      return setCountryCode(countryCode);
    });

    util.updateLocale(appLanguage);

    DeviceEventEmitter.addListener('locationProviderStatusChange', status => {
      // only trigger when "providerListener" is enabled
      //  status => {enabled: false, status: "disabled"} or {enabled: true, status: "enabled"}
      locationToggleChange(status.enabled);
    });

    this.initial();
  }

  // handle initial
  initial = () => {
    const {translationsUpdateAt} = this.props;
    this.props.appSettingsRequest({}, response => {
      if (response.status) {
        if (
          _.isNil(translationsUpdateAt) ||
          moment(translationsUpdateAt).isBefore(
            response.translations_updated_at,
          )
        ) {
          this.props.getTranslationsRequest(res => {
            if (res) {
              setTimeout(() => {
                this.getUpdatedString();
              }, 1000);
            }
          });
        } else {
          this.getUpdatedString();
        }
      }
    });
  };

  // getUpdatedString
  getUpdatedString = () => {
    strings.setContent(this.props.translations);
    util.switchLanguage(this.props.appLanguage);

    this.setState({});
    this.navigate();
  };

  navigate = () => {
    const {userData, initialRun} = this.props;

    // setTimeout(() => {
    // TOUR SCREENS REMOVED BY HUSSAIN
    // if (!_.isEmpty(userData) && !_.isEmpty(userData.access_token)) {
    //   Actions.reset('drawerMenu');
    // } else {
    //   Actions.reset('login');
    // }

    Actions.reset('drawerMenu');

    // TOUR SCREENS REMOVED BY HUSSAIN

    // if (initialRun) {
    //   Actions.reset('tourScreens');
    // } else {
    //   if (!.isEmpty(userData) && !.isEmpty(userData.access_token)) {
    //     Actions.reset('drawerMenu');
    //   } else {
    //     Actions.reset('login');
    //   }
    // }
    // }, 1500);
  };

  componentWillUnmount() {
    DeviceEventEmitter;
  }

  render() {
    return (
      <>
        <StatusBar hidden={true} />
        <ImageBackground source={Images.SplashBg} style={styles.container}>
          <Image source={Images.Logo} style={styles.image} />
          {/* {/ <DoubleBounce size={15} color={Colors.blue2} /> /} */}
        </ImageBackground>
      </>
    );
  }
}

const mapStateToProps = ({user, general}) => ({
  initialRun: general.initialRun,
  userData: user.data,
  appLanguage: general.appLanguage,
  translations: general.translationLocales.strings,
  translationsUpdateAt: general.translationLocales.translationsUpdatedAt,
});

const actions = {
  getInitialCoordinates,
  locationToggleChange,
  appSettingsRequest,
  getTranslationsRequest,
  setCountryCode,
};

export default connect(
  mapStateToProps,
  actions,
)(Welcome);
