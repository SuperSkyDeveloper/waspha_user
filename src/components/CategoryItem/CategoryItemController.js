import React from 'react';
import PropTypes from 'prop-types';
import CategoryItemView from './CategoryItemView';
import {connect} from 'react-redux';

class CategoryItemController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    item: PropTypes.object.isRequired,
    storeId: PropTypes.number.isRequired,
    categoryId: PropTypes.number.isRequired,
    rfpVendors: PropTypes.array.isRequired,
  };
  static defaultProps = {};

  render() {
    return <CategoryItemView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(CategoryItemController);
