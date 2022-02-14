import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {BackHandler} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import OrderPlaceNearbyVendorsView from './OrderPlaceNearbyVendorsView';
import {fakeOrderFound, noQueueVendorsFound} from '../../actions/ShopsActions';

class OrderPlaceNearbyVendorsController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rfpVendorslist: props.isParticularStore
        ? props.rfpVendors
        : props.queueVendors,

      noVendorsFound: props.noVendorsHere,
    };
  }

  static propTypes = {
    fromCheckout: PropTypes.bool,
    orderType: PropTypes.string,
    fromReOrder: PropTypes.bool,
    rfpVendors: PropTypes.array,
    queueVendors: PropTypes.array,
    rfpId: PropTypes.number,
    scheduledTime: PropTypes.string,
    isParticularStore: PropTypes.bool,
    rfpListing: PropTypes.array,
    fromStoreMenu: PropTypes.bool,
  };
  static defaultProps = {
    fromCheckout: false,
    fromReOrder: false,
    rfpVendors: [
      {
        lat: 24.904210629434207,
        lng: 67.07109304818511,
      },
      {
        lat: 24.764117,
        lng: 67.07109304818511,
      },
    ],
    queueVendors: [],

    scheduledTime: '',
    isParticularStore: false,
    rfpListing: [],
    fromStoreMenu: false,
  };

  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {
    this.props.noQueueVendorsFound(false);
    this.props.fakeOrderFound(false);

    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.queueVendors !== this.props.queueVendors) {
      this.setState({rfpVendorslist: this.props.queueVendors});
    }
    if (prevProps.noVendorsHere !== this.props.noVendorsHere) {
      this.setState({noVendorsFound: this.props.noVendorsHere});
    }

    if (prevProps.fakeOrder !== this.props.fakeOrder) {
      this.setState({noVendorsFound: this.props.fakeOrderFound});
    }
  }

  handleBackButtonClick = () => {
    this.onBackPress();
    return true;
  };

  onBackPress = () => {
    const {fromCheckout, fromReOrder} = this.props;
    if (fromCheckout || fromReOrder) {
      // return Actions.popTo('vendorProfile');
      return Actions.reset('drawerMenu');
    }
    // return Actions.pop();
    return Actions.reset('drawerMenu');
  };

  setValue = key => {
    this.setState(key);
  };

  render() {
    return (
      <OrderPlaceNearbyVendorsView
        rfpVendorslist={this.state.rfpVendorslist}
        noVendorsFound={this.state.noVendorsFound}
        onBackPress={this.onBackPress}
        setValue={this.setValue}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({shops, rfp}) => ({
  queueVendors: shops.queueVendors,
  noVendorsHere: shops.noQueueVendorsFound,
  rfpListing: rfp.rfpListing,
  fakeOrder: shops.fakeOrderFound,
});

const actions = {noQueueVendorsFound, fakeOrderFound};

export default connect(
  mapStateToProps,
  actions,
)(OrderPlaceNearbyVendorsController);
