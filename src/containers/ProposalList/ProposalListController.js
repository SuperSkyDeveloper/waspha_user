import React from 'react';
import PropTypes from 'prop-types';
import ProposalListView from './ProposalListView';
import {connect} from 'react-redux';
import {getMyOrderProposalsRequest} from '../../actions/ProposalsActions';

class ProposalListController extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }
  static propTypes = {
    order: PropTypes.object,
    proposals: PropTypes.array.isRequired,
    userCoordinates: PropTypes.object,
    getMyOrderProposalsRequest: PropTypes.func,
    fromPastRFP: PropTypes.bool,
    fromMakePayment: PropTypes.bool,
    proposalDetails: PropTypes.object,
  };
  static defaultProps = {
    userCoordinates: {},
    getMyOrderProposalsRequest: () => {},
    fromPastRFP: false,
    fromMakePayment: false,
    proposalDetails: {},
  };

  componentDidMount() {
    if (!this.props.fromMakePayment) {
      this.initial();
    }
  }

  initial = () => {
    const {userCoordinates, order, getMyOrderProposalsRequest} = this.props;
    this.setState({loading: true});
    const payload = {
      id: order.id,
      location: {
        address: 'abc xyz',
        lat: userCoordinates.latitude,
        lng: userCoordinates.longitude,
      },
    };

    getMyOrderProposalsRequest(payload, response => {
      if (response) {
      }
      this.setState({loading: false});
    });
  };

  render() {
    const {loading} = this.state;
    return <ProposalListView loading={loading} {...this.props} />;
  }
}

const mapStateToProps = ({proposals, user}) => ({
  proposals: proposals.proposals,
  proposalDetails: proposals.proposalDetails,
  userCoordinates: user.userCoordinates,
});

const actions = {getMyOrderProposalsRequest};

export default connect(
  mapStateToProps,
  actions,
)(ProposalListController);
