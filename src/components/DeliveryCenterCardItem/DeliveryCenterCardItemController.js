import React from 'react';
import PropTypes from 'prop-types';
import DeliveryCenterCardItemView from './DeliveryCenterCardItemView';
import {connect} from 'react-redux';

class DeliveryCenterCardItemController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {item: PropTypes.obj};
  static defaultProps = {item: {}};

  render() {
    return <DeliveryCenterCardItemView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(DeliveryCenterCardItemController);
