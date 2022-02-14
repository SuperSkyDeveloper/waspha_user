import React from 'react';
import PropTypes from 'prop-types';
import AnimatedItemView from './AnimatedItemView';
import {connect} from 'react-redux';
const ANIMATION_DURATION = 250;

class AnimatedItemController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    animated: PropTypes.object,
    item: PropTypes.object,
    itemOutputRange: PropTypes.number,
    index: PropTypes.number,
    onItemPress: PropTypes.func,
    collapseList: PropTypes.bool,
    iconWrapStyle: PropTypes.obj,
    itemWrapStyle: PropTypes.obj,
    selectedItem: PropTypes.obj,
    totalItems: PropTypes.number,
    tintColor: PropTypes.bool,
    scrollToStart: PropTypes.func,
  };
  static defaultProps = {
    collapseList: false,
    selectedItem: {},
    tintColor: false,
    totalItems: null,
    scrollToStart: () => {},
  };

  render() {
    return <AnimatedItemView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(AnimatedItemController);
