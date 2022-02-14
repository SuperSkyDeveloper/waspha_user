import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import ProposalRevisionView from './ProposalRevisionView';
import {strings, NAME_LENGTH, DESC_LENGTH} from '../../constants';
import {reviseProposalRequest} from '../../actions/ProposalsActions';

class ProposalRevisionController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      itemList: [],
      loading: false,
      isRevised: false,
      dataIsChanged: false,
    };
  }

  static propTypes = {
    proposalDetails: PropTypes.array.isRequired,
    proposalId: PropTypes.number,
    editable: PropTypes.bool,
    remainingRevisions: PropTypes.number.isRequired,
  };
  static defaultProps = {editable: true, proposalId: null};

  componentDidMount() {
    let itemList = [];
    this.props.proposalDetails.items.map(item => {
      const {remarks, remarks_image, ...filteredData} = item;
      itemList.push(filteredData);
    });
    this.setState({itemList});
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.isRevised === false && this.state.dataIsChanged === true) {
      this.setState({isRevised: true});
    }
  };

  //performs the changes in any field of list item
  onChangeFiled = (key, index, value) => {
    const tempState = _.cloneDeep(this.state.itemList);

    if (!this.state.isRevised) {
      this.setState({dataIsChanged: true});
    }
    if (key === 'remarksImgData') {
      tempState[index][key] = value;
      tempState[index]['remarks_image'] = value.imageBase64;

      this.setState({
        itemList: tempState,
      });

      return true;
    }

    if (key === 'remark') {
      tempState[index]['remarks'] = value;

      this.setState({
        itemList: tempState,
      });

      return true;
    }

    tempState[index][key] = value;
    this.setState({
      itemList: tempState,
    });
  };

  handleAccordionIndex = index => {
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

  reviseProposal = () => {
    const {reviseProposalRequest, proposalId} = this.props;
    const payload = {proposal_id: proposalId, items: this.state.itemList};
    this.setState({loading: true});

    reviseProposalRequest(payload, response => {
      if (response) {
        if (
          Actions._state.routes[Actions._state.routes.length - 3].routeName ===
          'proposalList'
        ) {
          Actions.popTo('orderAndProposal');
        } else {
          Actions.pop();
          Actions.replace('orderAndProposal');
        }
      }
      this.setState({loading: false});
    });
  };

  render() {
    const {activeIndex, itemList, loading, isRevised} = this.state;
    return (
      <ProposalRevisionView
        {...this.props}
        activeIndex={activeIndex}
        isRevised={isRevised}
        itemList={itemList}
        loading={loading}
        onChangeFiled={this.onChangeFiled}
        reviseProposal={this.reviseProposal}
        handleAccordionIndex={this.handleAccordionIndex}
      />
    );
  }
}

const mapStateToProps = ({proposals}) => ({
  proposalDetails: proposals.proposalDetails,
});

const actions = {reviseProposalRequest};

export default connect(
  mapStateToProps,
  actions,
)(ProposalRevisionController);
