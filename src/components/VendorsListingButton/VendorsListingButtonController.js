import React from 'react';
import PropTypes from 'prop-types';
import VendorsListingButtonView from './VendorsListingButtonView';
import {connect} from 'react-redux';

class VendorsListingButtonController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    isListView: PropTypes.bool,
    selectVendorListType: PropTypes.func,
    isMapView: PropTypes.bool,
  };
  static defaultProps = {
    isListView: false,
    selectVendorListType: () => {},
    isMapView: false,
  };

  render() {
    return <VendorsListingButtonView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(VendorsListingButtonController);
