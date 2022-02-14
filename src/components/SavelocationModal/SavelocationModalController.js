import React from 'react';
import PropTypes from 'prop-types';
import SavelocationModalView from './SavelocationModalView';
import {connect} from 'react-redux';
import {strings} from '../../constants';

class SavelocationModalController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    savelocationModal: PropTypes.bool,
    getLatLngAndAddress: PropTypes.func,
    locationAddress: PropTypes.string,
    openModal: PropTypes.func,
    btnPositive: PropTypes.func,
    btnNegative: PropTypes.func,
  };
  static defaultProps = {
    savelocationModal: false,
    locationAddress: strings.SAVE_LOCATION_PLACEHOLDER,
    getLatLngAndAddress: () => {},
    openModal: () => {},
    btnPositive: () => {},
    btnNegative: () => {},
  };

  closeModal = () => {
    const {setValue} = this.props;

    setValue({savelocationModal: false});
  };

  render() {
    return (
      <SavelocationModalView closeModal={this.closeModal} {...this.props} />
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(SavelocationModalController);
