import React from 'react';
import PropTypes from 'prop-types';
import ProposalListItemView from './ProposalListItemView';
import {connect} from 'react-redux';
import {setTimer} from '../../helpers/generalHelper';

class ProposalListItemController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCustomTime: false,
      expiryDuration: setTimer(props.item.expiry_time),
    };
  }
  static propTypes = {
    item: PropTypes.object.isRequired,
    isFirstItem: PropTypes.bool,
    fromPastRFP: PropTypes.bool,
  };
  static defaultProps = {
    isFirstItem: false,
    fromPastRFP: false,
  };

  setValue = key => {
    this.setState(key);
  };

  render() {
    const {expiryDuration, showCustomTime} = this.state;
    return (
      <ProposalListItemView
        showCustomTime={showCustomTime}
        expiryDuration={expiryDuration}
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
)(ProposalListItemController);
