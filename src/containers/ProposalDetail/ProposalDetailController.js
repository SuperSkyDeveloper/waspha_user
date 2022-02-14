import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import ProposalDetailView from './ProposalDetailView';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {Share} from 'react-native';

import {
  removeProposalItemSuccess,
  removeProposalSuccess,
} from '../../actions/OrdersActions';
import {
  getMyProposalDetailsRequest,
  respondToProposalRequest,
  clearProposalDetails,
} from '../../actions/ProposalsActions';
import {closeRFPRequest, getRFPListingRequest} from '../../actions/RFPActions';
import {strings} from '../../constants';
import {renderNameStringAndImageRender} from '../../helpers/multilingualHelper';

class ProposalDetailController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      isShareModelShow: false,
      removeItemModal: false,
      removeProposal: false,
      isProposalAccepted: false,
      isMoreProposalsModal: false,
      loading: false,
      isDisabled: props.disableButtons,
    };
  }
  static propTypes = {
    proposalId: PropTypes.number.isRequired,
    isAccordionItemRemoveable: PropTypes.bool,
    userCoordinates: PropTypes.object,
    proposalDetails: PropTypes.object.isRequired,
    proposalsList: PropTypes.array,
    closeRFPRequest: PropTypes.func,
    user: PropTypes.object.isRequired,
    disableButtons: PropTypes.bool,
    fromPastRFP: PropTypes.bool,
  };
  static defaultProps = {
    isAccordionItemRemoveable: false,
    userCoordinates: {},
    proposalsList: [],
    closeRFPRequest: () => {},
    disableButtons: false,
    fromPastRFP: false,
  };

  componentDidMount() {
    this.initial();
  }

  initial = () => {
    this.setState({loading: true});

    const {
      getMyProposalDetailsRequest,
      proposalId,
      userCoordinates,
    } = this.props;
    const payload = {
      proposal_id: proposalId,

      location: {
        address: 'abc xyz',
        lat: userCoordinates.latitude,
        lng: userCoordinates.longitude,
      },
    };

    getMyProposalDetailsRequest(payload, response => {
      if (response) {
        this.handleDisable();
      }
      this.setState({loading: false});
    });
  };

  handleDisable = () => {
    const {proposalDetails} = this.props;
    const {status} = proposalDetails;

    if (
      status === 'accepted' ||
      status === 'rejected' ||
      status === 'expired' ||
      status === 'completed'
    ) {
      this.setState({isDisabled: true});
    }
  };

  handleIndex = index => {
    const pressForClose = index === this.state.activeIndex;
    if (pressForClose) {
      this.setState({
        activeIndex: null,
      });
    } else {
      this.setState({
        activeIndex: index,
      });
    }
  };

  rejectProposal = () => {
    const {proposalDetails} = this.props;
    Actions.cancelorder({
      fromProposalDetails: true,
      handleRemoveProposal: this.handleRemoveProposal,
      orderType: proposalDetails.type,
    });
  };

  // handle reject proposal
  handleRemoveProposal = async (reasons, description) => {
    await this.sendProposalRequest(false, reasons, description);
    this.setState({loading: false});
  };

  sendProposalRequest = async (accept, reasons = [], description = '') => {
    const {
      proposalId,
      respondToProposalRequest,
      clearProposalDetails,
      getRFPListingRequest,
    } = this.props;
    let payload = {
      proposal_id: proposalId,
      accept,
    };

    if (!_.isEmpty(reasons)) {
      payload['reasons'] = reasons;
    }

    if (!_.isEmpty(description)) {
      payload['description'] = description;
    }

    this.setState({loading: true});
    respondToProposalRequest(payload, response => {
      if (response) {
        getRFPListingRequest({status: 'current'}, () => {});
        clearProposalDetails();
        Actions.pop();
        Actions.pop();
        if (Actions.currentScene === 'proposalList') {
          Actions.pop();
        }
      }
      this.setState({loading: false});
    });
  };

  handleCloseRemoveProposal = () => {
    this.setState({removeProposal: false});
  };

  //handle more proposals
  checkOtherProposals = () => {
    const {proposalId} = this.props;

    Actions.paymentDetail({proposalId: proposalId});
  };

  // handle share btn

  handleShareBtn = async () => {
    let data = await this.getDataForSharing();
    try {
      const result = await Share.share({
        title: 'App link',
        message: data,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  getDataForSharing = async () => {
    const regex = /(<([^>]+)>)/gi;
    // const result = data.description.replace(regex, '');
    const {user, proposalDetails} = this.props;
    const {items, store, estimate_bill, invoice} = proposalDetails;
    const {bill, total} = invoice;
    let str = `           
                  ${strings.WASPHA}
`;

    str += `
    
      ${strings.CHECKOUT_PROPOSAL_BY} ${store.name.replace(regex, '')}: 
    

`;

    items &&
      items.map(item => {
        return (str += ` - ${renderNameStringAndImageRender(item.name).replace(
          regex,
          '',
        )} (x${item.quantity}): ${
          _.isNil(user.currency_code) ? 'ESP' : user.currency_code
        } ${item.price}

`);
      });

    str += `
`;

    bill &&
      bill.map(item => {
        return (str += ` -> ${item.label} : ${
          !item.label.includes('Rate')
            ? _.isNil(user.currency_code)
              ? 'ESP'
              : user.currency_code
            : ''
        } ${item.value.toFixed(2)} ${item.label.includes('Rate') ? '%' : ''}  

`);
      });

    str += `   

  ${total.label} : ${
      _.isNil(user.currency_code) ? 'ESP' : user.currency_code
    } ${total.value}
    
  ${strings.SENT_BY} ${_.capitalize(user.name).replace(regex, '')} 
`;
    return str;
  };

  setValue = (key, callBack) => {
    this.setState(key, callBack);
  };

  render() {
    const {
      activeIndex,
      isShareModelShow,
      removeItemModal,
      removeProposal,
      loading,
      isMoreProposalsModal,
      isDisabled,
    } = this.state;
    return (
      <ProposalDetailView
        {...this.props}
        handleIndex={this.handleIndex}
        activeIndex={activeIndex}
        handleRemoveProposalItem={this.handleRemoveProposalItem}
        handleRemoveProposal={this.handleRemoveProposal}
        handleCloseRemoveProposal={this.handleCloseRemoveProposal}
        hanldleMoreProposalsModal={this.hanldleMoreProposalsModal}
        checkOtherProposals={this.checkOtherProposals}
        handleShareBtn={this.handleShareBtn}
        rejectProposal={this.rejectProposal}
        setValue={data => this.setValue(data)}
        isShareModelShow={isShareModelShow}
        loading={loading}
        isMoreProposalsModal={isMoreProposalsModal}
        isDisabled={isDisabled}
        removeItemModal={removeItemModal}
        removeProposal={removeProposal}
      />
    );
  }
}

const mapStateToProps = ({user, proposals}) => ({
  user: user.data,
  userCoordinates: user.userCoordinates,
  proposalDetails: proposals.proposalDetails,
  proposalsList: proposals.proposals,
});

const actions = {
  removeProposalItemSuccess,
  removeProposalSuccess,
  getMyProposalDetailsRequest,
  respondToProposalRequest,
  closeRFPRequest,
  clearProposalDetails,
  getRFPListingRequest,
};

export default connect(
  mapStateToProps,
  actions,
)(ProposalDetailController);
