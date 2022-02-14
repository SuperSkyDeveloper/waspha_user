import React from 'react';
import PropTypes from 'prop-types';
import SignHeaderView from './SignHeaderView';
import {connect} from 'react-redux';

class SignHeaderController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    title: PropTypes.string,
    subTitle: PropTypes.string,
    mainHeading: PropTypes.string,
    subHeading: PropTypes.string,
  };
  static defaultProps = {
    title: '',
    subTitle: '',
    mainHeading: '',
    subHeading: '',
  };




  render() {
    return <SignHeaderView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(SignHeaderController);
