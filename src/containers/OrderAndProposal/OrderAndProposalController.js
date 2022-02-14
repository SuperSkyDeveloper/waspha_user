import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {Actions} from 'react-native-router-flux';
import OrderAndProposalView from './OrderAndProposalView';
import {connect} from 'react-redux';
import {filterRFPs} from '../../services/RFPHelper';
import {ORDER_STATUS} from '../../constants';
import {getRFPListingRequest, cancelRFPRequest} from '../../actions/RFPActions';
import {getPromoCodesRequest} from '../../actions/PromoCodesActions';

class OrderAndProposalController extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTabIndex: props.incomingActiveTab,
      currentRFPs: [],
      upcomingRFPs: [],
      pastRFPs: [],
      pressedOnceList: [],
      loading: false,
      removeRFPModal: false,
      removeItemId: null,
    };
  }

  static propTypes = {
    incomingActiveTab: PropTypes.number,
    getRFPListingRequest: PropTypes.func,
    rfpListing: PropTypes.array,
    refreshScreen: PropTypes.bool,
    proposalDetails: PropTypes.object,
  };
  static defaultProps = {
    incomingActiveTab: 1,
    getRFPListingRequest: () => {},
    rfpListing: [],
    proposalDetails: {},
  };

  componentDidMount() {
    const {getPromoCodesRequest} = this.props;

    getPromoCodesRequest(() => {});

    this.initialRequest();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.rfpListing !== this.props.rfpListing) {
      this.setState({loading: true});
      await this.getRFPsIntoState();
      this.setState({loading: false});
    }
  }

  initialRequest = () => {
    switch (this.state.activeTabIndex) {
      case 0: {
        this.pushTabInArray(ORDER_STATUS.CURRENT);

        break;
      }
      case 1: {
        this.pushTabInArray(ORDER_STATUS.UPCOMING);

        break;
      }
      case 2: {
        this.pushTabInArray(ORDER_STATUS.PAST);

        break;
      }
    }
  };

  pushTabInArray = status => {
    let pressedOnceList = _.cloneDeep(this.state.pressedOnceList);
    if (!_.includes(pressedOnceList, status)) {
      this.getTabData(status);
      pressedOnceList.push(status);
      this.setState({pressedOnceList});
    }
  };

  getTabData = status => {
    const {getRFPListingRequest} = this.props;

    const payload = {
      status,
    };
    this.setState({loading: true});
    getRFPListingRequest(payload, response => {
      if (response) {
        this.getRFPsIntoState();
      }
      this.setState({loading: false});
    });
  };

  getRFPsIntoState = async () => {
    this.setState({
      currentRFPs: filterRFPs(this.props.rfpListing, ORDER_STATUS.CURRENT),
      upcomingRFPs: filterRFPs(this.props.rfpListing, ORDER_STATUS.UPCOMING),
      pastRFPs: filterRFPs(this.props.rfpListing, ORDER_STATUS.PAST),
    });
  };

  handleTabIndex = index => {
    this.setState(
      {
        activeTabIndex: index,
      },
      () => {
        this.initialRequest();
      },
    );
  };

  handleRemoveItem = (removeItemId, type) => {
    if (this.state.activeTabIndex !== 2) {
      Actions.cancelorder({
        rfpId: removeItemId,
        fromOrderAndProposal: true,
        orderType: type,
      });
      return true;
    }

    this.setState({removeRFPModal: true, removeItemId});
  };

  rejectRFP = () => {
    const {cancelRFPRequest} = this.props;
    const payload = {
      rfp_id: this.state.removeItemId,
    };

    this.setState({loading: true});
    cancelRFPRequest(payload, response => {
      if (response) {
      }
      this.setState({loading: false, removeRFPModal: false});
    });
  };

  setValue = key => {
    this.setState(key);
  };
  render() {
    const {
      activeTabIndex,
      currentRFPs,
      upcomingRFPs,
      pastRFPs,
      loading,
      removeRFPModal,
    } = this.state;
    return (
      <OrderAndProposalView
        {...this.props}
        getTabData={this.getTabData}
        handleTabIndex={this.handleTabIndex}
        handleRemoveItem={this.handleRemoveItem}
        setValue={this.setValue}
        rejectRFP={this.rejectRFP}
        removeRFPModal={removeRFPModal}
        activeTabIndex={activeTabIndex}
        currentRFPs={currentRFPs}
        upcomingRFPs={upcomingRFPs}
        pastRFPs={pastRFPs}
        loading={loading}
      />
    );
  }
}

const mapStateToProps = ({rfp, proposals}) => ({
  rfpListing: rfp.rfpListing,
  proposalDetails: proposals.proposalDetails,
});

const actions = {getRFPListingRequest, cancelRFPRequest, getPromoCodesRequest};

export default connect(
  mapStateToProps,
  actions,
)(OrderAndProposalController);
