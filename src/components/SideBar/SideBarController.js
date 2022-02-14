import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import SideBarView from './SideBarView';
import {userSignOutRequest, isSocialLogin} from '../../actions/UserActions';
import {clearFavLocations} from '../../actions/SaveLocationsActions';
import {
  changeLanguageRequest,
  changeLanguageSuccess,
} from '../../actions/GeneralActions';
import util from '../../util';

class SideBarController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openLangModal: false,
      loading: false,
      activeIndex: null,
      language: props.appLanguage,
    };
  }
  static propTypes = {
    user: PropTypes.object,
    changeLanguageRequest: PropTypes.func,
    isSocialLogin: PropTypes.func,
    moneyInWallet: PropTypes.number,
  };
  static defaultProps = {
    user: {},
    changeLanguageRequest: () => {},
    isSocialLogin: () => {},
    moneyInWallet: 0,
  };

  setValue = key => {
    this.setState(key);
  };

  handleLangSelect = data => {
    const {changeLanguageRequest, changeLanguageSuccess, user} = this.props;
    this.setState({loading: true, language: data});
    const payload = {
      language: data,
    };

    if (_.isNil(user.access_token)) {
      changeLanguageSuccess(data, () => {
        this.languageChange();
      });
      return true;
    }

    changeLanguageRequest(payload, response => {
      if (response) {
        this.languageChange();
      } else {
        this.setState({loading: false});
      }
    });
  };

  languageChange = () => {
    util.updateLocale(this.state.language);
    this.setState({loading: false, openLangModal: false});
    Actions.reset('drawerMenu');
  };

  logOutUser = () => {
    const {userSignOutRequest, clearFavLocations, isSocialLogin} = this.props;
    // userSignOutRequest(response => {
    //   clearFavLocations();
    //   Actions.reset('login');
    // });
    userSignOutRequest(response => {
      Actions.reset('login', {fromDrawer: true});

      isSocialLogin(false);
      clearFavLocations();
      if (response) {
      }
    });
  };

  handleIndex = index => {
    const pressForClose = index === this.state.activeIndex;
    if (pressForClose) {
      this.setState({
        activeIndex: null,
      });
    } else {
      this.setState({
        activeIndex: index,
      });
    }
  };

  render() {
    const {openLangModal, loading, activeIndex} = this.state;
    return (
      <SideBarView
        openLangModal={openLangModal}
        loading={loading}
        navigate={this.navigate}
        setValue={this.setValue}
        activeIndex={activeIndex}
        handleLangSelect={this.handleLangSelect}
        logOutUser={this.logOutUser}
        handleIndex={this.handleIndex}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({user, general}) => ({
  user: user.data,
  moneyInWallet: user.data.wallet,
  appLanguage: general.appLanguage,
});

const actions = {
  clearFavLocations,
  changeLanguageRequest,
  changeLanguageSuccess,
  userSignOutRequest,
  isSocialLogin,
};

export default connect(
  mapStateToProps,
  actions,
)(SideBarController);
