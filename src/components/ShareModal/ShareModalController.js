import React from 'react';
import PropTypes from 'prop-types';
import ShareModalView from './ShareModalView';
import {connect} from 'react-redux';

class ShareModalController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
  };
  static defaultProps = {};

  render() {
    return (
      <ShareModalView {...this.props} handleShareFb={this.handleShareFb} />
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(ShareModalController);
