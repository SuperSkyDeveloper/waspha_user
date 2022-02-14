import React from 'react';
import PropTypes from 'prop-types';
import NearByView from './NearByView';
import {connect} from 'react-redux';

class NearByController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    items: PropTypes.array,
    category: PropTypes.object,
    subCategory: PropTypes.object,
  };
  static defaultProps = {items: [], category: {}, subCategory: {}};

  render() {
    return <NearByView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(NearByController);
