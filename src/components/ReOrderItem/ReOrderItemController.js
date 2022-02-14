import React from 'react';
import PropTypes from 'prop-types';
import ReOrderItemView from './ReOrderItemView';
import {connect} from 'react-redux';

class ReOrderItemController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    item: PropTypes.object.isRequired,
    rfpVendors: PropTypes.array.isRequired,
  };
  static defaultProps = {};

  render() {
    return <ReOrderItemView {...this.props} />;
  }
}

const mapStateToProps = ({user}) => ({
  user: user.data,
});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(ReOrderItemController);
