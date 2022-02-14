import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import GenderModalView from './GenderModalView';
import {connect} from 'react-redux';
import {strings} from '../../constants';

class GenderModalController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static propTypes = {
    modalType: PropTypes.string,
    isModalOpen: PropTypes.bool,
    closeModal: PropTypes.func,
    onSubmit: PropTypes.func,
  };
  static defaultProps = {
    isModalOpen: false,
    modalType: 'isGenderModal',
    closeModal: () => {},
    onSubmit: () => {},
  };

  render() {
    return <GenderModalView {...this.props} />;
  }
}

const mapStateToProps = ({general}) => ({
  appLanguage: general.appLanguage,
  translations: general.translationLocales

});
const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(GenderModalController);
