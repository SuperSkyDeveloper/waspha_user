import React from 'react';
import PropTypes from 'prop-types';
import DeliveryLocationView from './DeliveryLocationView';
import {connect} from 'react-redux';
import {Colors} from '../../theme';

class DeliveryLocationController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    address: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    categoryImg: PropTypes.object.isRequired,
    handlePress: PropTypes.func,
    touchable: PropTypes.bool,
    gradientColor1: PropTypes.object,
    gradientColor2: PropTypes.object,
    locationAddress: PropTypes.string,
    getLatLngAndAddress: PropTypes.func,
    isPickup: PropTypes.bool,
  };
  static defaultProps = {
    gradientColor1: Colors.violetRed,
    gradientColor2: Colors.resolutionBlue,
    touchable: false,
    handlePress: () => {},
    locationAddress: '',
    getLatLngAndAddress: () => {},
    isPickup: false,
  };

  render() {
    return <DeliveryLocationView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(DeliveryLocationController);
