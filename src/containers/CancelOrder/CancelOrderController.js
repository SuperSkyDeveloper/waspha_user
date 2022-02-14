import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import CancelOrderView from './CancelOrderView';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {cancelRFPRequest} from '../../actions/RFPActions';
import util from '../../util';
import {alertMessage} from '../../actions/GeneralActions';
import {strings} from '../../constants';

class CancelOrderController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cancelOrderPoints: props.fromProposalDetails
        ? props.proposalRejectionReasons[props.orderType]
        : props.rfpCancellationReasons[props.orderType],
      selectedItems: [],
      description: '',
      loading: false,
    };
  }
  static propTypes = {
    orderType: PropTypes.string.isRequired,
    fromOrderAndProposal: PropTypes.bool,
    rfpId: PropTypes.number,
    cancelRFPRequest: PropTypes.func,
    handleRemoveProposal: PropTypes.func,
    fromProposalDetails: PropTypes.bool,
  };
  static defaultProps = {
    cancelRFPRequest: () => {},
    handleRemoveProposal: () => {},
    fromOrderAndProposal: false,
    fromProposalDetails: false,
  };

  setValue = key => {
    this.setState(key);
  };

  handleItemSelect = key => {
    let selectedItem = _.xor([key], this.state.selectedItems);
    this.setState({selectedItems: selectedItem});
  };

  validate = () => {
    const {alertMessage} = this.props;
    let validate = true;

    if (
      _.isEmpty(this.state.selectedItems) &&
      _.isEmpty(this.state.description)
    ) {
      // util.topAlert('Please provide cancellation reason');
      alertMessage(strings.PLEASE_GIVE_A_REASON);
      validate = false;
    }

    return validate;
  };

  handleSubmit = () => {
    if (this.validate()) {
      const {selectedItems, description} = this.state;
      console.log({selectedItems});
      const {
        rfpId,
        cancelRFPRequest,
        fromOrderAndProposal,
        fromProposalDetails,
        handleRemoveProposal,
        alertMessage,
      } = this.props;
      let reasons = selectedItems;
      // selectedItems.map(item => {
      //   reasons.push(item.id);
      // });

      if (fromProposalDetails) {
        handleRemoveProposal(reasons, description);
        return true;
      }

      const payload = {
        rfp_id: rfpId,
        reasons,
        description,
      };
      this.setState({loading: true});
      cancelRFPRequest(payload, response => {
        if (response) {
          this.setState({loading: false});
          // util.topAlert('Cancellation Successful');
          alertMessage(strings.CANCEL_SUCCESS);

          if (fromOrderAndProposal) {
            Actions.pop();
            return true;
          }
          Actions.reset('drawerMenu');
        }
        this.setState({loading: false});
      });
    }
  };

  render() {
    const {selectedItems, description, loading, cancelOrderPoints} = this.state;
    return (
      <CancelOrderView
        handleSubmit={this.handleSubmit}
        handleItemSelect={this.handleItemSelect}
        setValue={data => this.setValue(data)}
        cancelOrderPoints={cancelOrderPoints}
        selectedItems={selectedItems}
        description={description}
        loading={loading}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({general}) => ({
  proposalRejectionReasons: general.appSettings.proposal_rejection_reasons,
  rfpCancellationReasons: general.appSettings.rfp_cancellation_reasons,
});

const actions = {cancelRFPRequest, alertMessage};

export default connect(
  mapStateToProps,
  actions,
)(CancelOrderController);
