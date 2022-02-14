import React from 'react';
import PropTypes from 'prop-types';
import EditLocationModalView from './EditLocationModalView';
import {connect} from 'react-redux';

class EditLocationModalController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {showEditModal: PropTypes.bool, setValue: PropTypes.func};
  static defaultProps = {showEditModal: false, setValue: () => {}};

  closeModal = () => {
    const {setValue} = this.props;

    setValue({showEditModal: false});
  };

  render() {
    return (
      <EditLocationModalView closeModal={this.closeModal} {...this.props} />
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(EditLocationModalController);
