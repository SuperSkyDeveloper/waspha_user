import React from 'react';
import PropTypes from 'prop-types';
import DateItemView from './DateItemView';
import {connect} from 'react-redux';
import {Fonts, Colors} from '../../theme';

class DateItemController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    date: PropTypes.string.isRequired,
    fontSize: PropTypes.number,
    color: PropTypes.string,
  };
  static defaultProps = {
    fontSize: Fonts.size.font10,
    color: Colors.jumbo,
  };

  render() {
    return <DateItemView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(DateItemController);
