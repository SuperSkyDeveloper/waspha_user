import React from 'react';
import PropTypes from 'prop-types';
import VendorHeaderView from './VendorHeaderView';
import {connect} from 'react-redux';

class VendorHeaderController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    showRating: PropTypes.bool,
    showBtn: PropTypes.bool,
    isReviewScreen: PropTypes.bool,

    item: PropTypes.object,
  };
  static defaultProps = {
    showRating: false,
    showBtn: false,
    isReviewScreen: false,
    item: {},
  };

  render() {
    return <VendorHeaderView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(VendorHeaderController);
