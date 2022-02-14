import React from 'react';
import PropTypes from 'prop-types';
import FeatureModalView from './FeatureModalView';
import {connect} from 'react-redux';

class FeatureModalController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    isModalOpen: PropTypes.bool,

    modalType: PropTypes.string,

    backPress: PropTypes.bool,
  };

  //static was removed to get updated string data of YES and NO
  static defaultProps = {
    isModalOpen: false,
    closeModal: () => {},

    modalType: '',

    backPress: false,
  };

  render() {
    return <FeatureModalView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(FeatureModalController);
