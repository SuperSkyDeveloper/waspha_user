import React from 'react';
import PropTypes from 'prop-types';
import VendorProfileInfoView from './VendorProfileInfoView';
import {connect} from 'react-redux';

class VendorProfileInfoController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    items: PropTypes.array,

    modalType: PropTypes.string,
    closeModal: PropTypes.func,
    isModalOpen: PropTypes.bool,
  };
  static defaultProps = {
    items: [],
    closeModal: () => {},
    isModalOpen: false,
  };

  render() {
    return <VendorProfileInfoView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(VendorProfileInfoController);
