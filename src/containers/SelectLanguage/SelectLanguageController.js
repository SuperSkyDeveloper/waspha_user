import React from 'react';
import PropTypes from 'prop-types';
import SelectLanguageView from './SelectLanguageView';
import {connect} from 'react-redux';

class SelectLanguageController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {};
  static defaultProps = {};

  render() {
    return <SelectLanguageView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(SelectLanguageController);
