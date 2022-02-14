import React from 'react';
import PropTypes from 'prop-types';
import OptionsModalView from './OptionsModalView';
import {connect} from 'react-redux';

class OptionsModalController extends React.Component {
  constructor() {
    super();
    this.state = {
      activeId: '',
    };
  }
  static propTypes = {
    modalType: PropTypes.string,
    closeModal: PropTypes.func,
    isModalOpen: PropTypes.bool,
    callBack: PropTypes.func,
    selectedModeId: PropTypes.number,
    onSubmit: PropTypes.func,
    isLoading: PropTypes.bool,
    isUserChat: PropTypes.bool,
    isDeliveryChat: PropTypes.bool,
    isGroupChat: PropTypes.bool,
    data: PropTypes.object,
    showHeading: PropTypes.bool,
    showPhoneOptions: PropTypes.bool,
  };
  static defaultProps = {
    data: {},
    modalType: '',
    closeModal: () => {},
    isModalOpen: false,
    isLoading: false,
    callBack: () => {},
    selectedModeId: 2,
    onSubmit: () => {},
    showHeading: true,
    showPhoneOptions: false,
  };

  componentDidMount() {
    const {selectedModeId} = this.props;
    this.setState({activeId: selectedModeId});
  }

  setValue = key => {
    this.setState(key);
  };

  render() {
    const {activeId} = this.state;
    return (
      <OptionsModalView
        setValue={data => this.setValue(data)}
        activeId={activeId}
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
)(OptionsModalController);
