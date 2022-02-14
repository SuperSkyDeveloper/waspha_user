import React from 'react';
import PropTypes from 'prop-types';
import CardSectionView from './CardSectionView';
import {connect} from 'react-redux';

class CardSectionController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {};
  static defaultProps = {};

  render() {
    return <CardSectionView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(CardSectionController);
