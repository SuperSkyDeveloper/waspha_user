import React from 'react';
import PropTypes from 'prop-types';
import ProposalDetailCardView from './ProposalDetailCardView';
import {connect} from 'react-redux';

class ProposalDetailCardController extends React.Component {
  constructor() {
    super();
    this.state = {
      showCustomTime: false,
    };
  }
  static propTypes = {
    proposalDetails: PropTypes.object.isRequired,
  };
  static defaultProps = {};

  setValue = key => {
    this.setState(key);
  };

  render() {
    const {showCustomTime} = this.state;
    return (
      <ProposalDetailCardView
        showCustomTime={showCustomTime}
        setValue={this.setValue}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({user}) => ({
  user: user.data,
});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(ProposalDetailCardController);
