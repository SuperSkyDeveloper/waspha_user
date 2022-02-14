import React from 'react';
import PropTypes from 'prop-types';
import NotificationListingView from './NotificationListingView';
import {connect} from 'react-redux';
import {getNotificationsListRequest} from '../../actions/GeneralActions';

class NotificationListingController extends React.Component {
  constructor() {
    super();
    this.state = {loading: true};
  }
  static propTypes = {notifications: PropTypes.array};
  static defaultProps = {
    notifications: [],
  };

  componentDidMount() {
    this.initial();
  }

  initial = () => {
    const {getNotificationsListRequest} = this.props;
    getNotificationsListRequest(response => {
      this.setState({loading: false});
    });
  };

  render() {
    return (
      <NotificationListingView loading={this.state.loading} {...this.props} />
    );
  }
}

const mapStateToProps = ({general}) => ({
  notifications: general.notifications,
});

const actions = {getNotificationsListRequest};

export default connect(
  mapStateToProps,
  actions,
)(NotificationListingController);
