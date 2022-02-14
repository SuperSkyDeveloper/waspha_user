import React from 'react';
import PropTypes from 'prop-types';
import RemoveItemModalView from './RemoveItemModalView';
import {connect} from 'react-redux';
import {strings} from '../../constants';
import util from '../../util';

class RemoveItemModalController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    isModalOpen: PropTypes.bool,
    closeModal: PropTypes.func,
    title: PropTypes.string,
    btnOneText: PropTypes.string,
    btnTwoText: PropTypes.string,
    modalType: PropTypes.string,
    btnPositiveFunc: PropTypes.func,
    btnNegativeFunc: PropTypes.func,
    showOneBtn: PropTypes.bool,
    backPress: PropTypes.bool,
  };

  //static was removed to get updated string data of YES and NO
  static defaultProps = {
    isModalOpen: false,
    closeModal: () => {},

    modalType: 'removeItemModal',
    btnPositiveFunc: () => {},
    btnNegativeFunc: () => {},
    showOneBtn: false,
    backPress: false,
  };

  render() {
    return <RemoveItemModalView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(RemoveItemModalController);
