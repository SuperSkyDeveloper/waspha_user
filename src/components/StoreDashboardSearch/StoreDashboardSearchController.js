import React from 'react';
import PropTypes from 'prop-types';
import StoreDashboardSearchView from './StoreDashboardSearchView';
import {connect} from 'react-redux';

class StoreDashboardSearchController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  static propTypes = {onSearchBarPress: PropTypes.func};
  static defaultProps = {onSearchBarPress: () => {}};

  render() {
    return (
      <StoreDashboardSearchView
        userIdRef={ref => {
          this.userIdRef = ref;
        }}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(StoreDashboardSearchController);
