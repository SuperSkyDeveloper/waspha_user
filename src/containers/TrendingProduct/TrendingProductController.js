import React from 'react';
import PropTypes from 'prop-types';
import TrendingProductView from './TrendingProductView';
import {connect} from 'react-redux';

class TrendingProductController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    trendingProductList: PropTypes.array.isRequired,
  };
  static defaultProps = {};

  render() {
    return <TrendingProductView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(TrendingProductController);
