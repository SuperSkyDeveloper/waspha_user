import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import base64 from 'react-native-base64';
import BottomSheet from 'react-native-bottomsheet';
import PropTypes from 'prop-types';
import ReOrderDetailsView from './ReOrderDetailsView';
import {getReOrderDetailsRequest} from '../../actions/OrdersActions';
import {strings} from '../../constants';
import {
  checkEmptyOrNull,
  GetCurrentTimeInISO,
  toISOString,
} from '../../helpers/generalHelper';
import {clearQueueVendors} from '../../actions/ShopsActions';
import {createRFPRequest} from '../../actions/RFPActions';
import {Actions} from 'react-native-router-flux';
import {getAddress} from '../../services/GeneralHelper';

class ReOrderDetailsController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      itemDetails: {},
      itemList: [],
      loading: false,
      openCalender: false,
      submitLoader: false,
      selectedValueOfDropdown: strings.NOW,
      scheduled_delivery_time: '',
      locationLat: '',
      locationLng: '',
      locationAddress: strings.PLEASE_SELECT_DELIVERY_LOC,
    };
  }
  static propTypes = {
    proposalId: PropTypes.number.isRequired,
    orderDetails: PropTypes.object,
    getReOrderDetailsRequest: PropTypes.func,
    rfpVendors: PropTypes.array.isRequired,
  };
  static defaultProps = {
    getReOrderDetailsRequest: () => {},
    orderDetails: {
      store: {id: 331},
      id: 9221,
      order_date: '2020-12-09T09:48:35.000Z',
      delivery_location: {
        address: 'hassan square',
        lat: 24.860966,
        lng: 66.990501,
      },
      category: {
        id: 1,
        name: 'Pharmacy',
        image: 'https://waspha.s3.amazonaws.com/categories/Zs1Go6vrGH.png',
      },
      items: [
        {
          id: 15781,
          name: 'Zinger burger',
          quantity: 3,
          image: 'https://waspha.s3.amazonaws.com/rfp-items/RKl8LMc1Rn.png',
          description: 'I need 3 zinger burgers with mayonnaise',
        },
      ],
    },
  };

  componentDidMount() {
    this.initial();
    this.getInitialAddressofDeliveryLocation();
  }

  initial = () => {
    const {getReOrderDetailsRequest, proposalId} = this.props;
    const payload = {
      proposal_id: proposalId,
    };
    getReOrderDetailsRequest(payload, response => {
      this.setState({loading: false});

      if (response) {
        const {items, ...itemDetails} = this.props.orderDetails;
        this.setState({itemDetails, itemList: items});
      }
    });
  };

  getInitialAddressofDeliveryLocation = () => {
    const {latitude, longitude} = this.props.userCoordinates;

    getAddress(latitude, longitude).then(res => {
      this.setValue({
        locationLat: latitude,
        locationLng: longitude,
        locationAddress: res,
      });
    });
  };

  openGooglePlacesSearch = () => {
    Actions.googlePlacesSearch({
      getLatLngAndAddress: this.getLatLngAndAddress,
      fromOrderPlace: true,
    });
  };

  getInitialAddressofDeliveryLocation = () => {
    const {latitude, longitude} = this.props.userCoordinates;

    getAddress(latitude, longitude).then(res => {
      this.setValue({
        locationLat: latitude,
        locationLng: longitude,
        locationAddress: res,
      });
    });
  };

  //gets lat lng and address and saves in state
  getLatLngAndAddress = (lat, lng, address) => {
    this.setState({
      locationLat: lat,
      locationLng: lng,
      locationAddress: address,
    });
  };

  setValue = key => {
    this.setState(key);
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

  //performs the changes in any field of list item
  onChangeFiled = (key, index, value) => {
    const tempState = _.cloneDeep(this.state.itemList);

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

  //open the time schedule bottom sheet
  openBottomSheet = () => {
    BottomSheet.showBottomSheetWithOptions(
      {
        options: [strings.NOW, strings.SCHEDULE],
        title: strings.SCHEDULE_YOUR_DELIVERY_TIME,
        dark: false,
        cancelButtonIndex: 0,
      },
      value => {
        if (value === 0) {
          this.setState({
            selectedValueOfDropdown: strings.NOW,
          });
        }
        if (value === 1) {
          this.setState({
            selectedValueOfDropdown: strings.SCHEDULE,
            openCalender: true,
          });
        }
      },
    );
  };

  // selects the value from dropdown list
  setSelectedDropDownValue = value => {
    this.setState({
      selectedValueOfDropdown: value.toString(),
    });
  };

  submitOrder = () => {
    const {
      selectedValueOfDropdown,
      locationLat,
      locationLng,
      locationAddress,
    } = this.state;
    const {
      orderDetails,
      createRFPRequest,
      isPickup,
      isDelivery,
      rfpVendors,
      clearQueueVendors,
    } = this.props;

    let items = this.state.itemList.map(item => {
      if (!_.isNil(item.product_id)) {
        return {
          product_id: item.product_id,
          quantity: item.quantity,
          remarks: checkEmptyOrNull(item.remarks),
          remarks_image: checkEmptyOrNull(item.remarks_image),
          menu_promotion: checkEmptyOrNull(item.menu_promotion),
        };
      }
      return {
        name: item.name,
        image: checkEmptyOrNull(item.image),
        quantity: item.quantity,
        requirements: checkEmptyOrNull(item.description),
        remarks: checkEmptyOrNull(item.remarks),
        remarks_image: checkEmptyOrNull(item.remarks_image),
        menu_promotion: checkEmptyOrNull(item.menu_promotion),
      };
    });

    let payload = {
      store_id: orderDetails.store.id,
      subcategory_id: orderDetails.category.id,
      delivery_location: {
        lat: locationLat,
        lng: locationLng,
        address: locationAddress,
      },
      items,
      scheduled_delivery_time:
        selectedValueOfDropdown === strings.NOW
          ? GetCurrentTimeInISO()
          : selectedValueOfDropdown,
      type: isPickup || !isDelivery ? 'pickup' : 'delivery',
    };

    // if (isPickup || !isDelivery) {
    //   delete payload.delivery_location;
    // }

    this.setState({submitLoader: true});

    clearQueueVendors();
    createRFPRequest(payload, response => {
      this.setState({submitLoader: false});
      if (response.status) {
        Actions.replace('orderplaceNearbyVendors', {
          rfpId: response.data.id,
          rfpVendors,
          scheduledTime:
            selectedValueOfDropdown === strings.NOW
              ? ''
              : selectedValueOfDropdown,
          isParticularStore: true,
          fromReOrder: true,
          orderType: response.data.type,
        });
      }
    });
  };

  setValue = key => {
    this.setState(key);
  };

  render() {
    const {
      activeIndex,
      loading,
      itemList,
      itemDetails,
      openCalender,
      selectedValueOfDropdown,
      submitLoader,
      locationLat,
      locationLng,
      locationAddress,
    } = this.state;
    return (
      <ReOrderDetailsView
        {...this.props}
        handleIndex={this.handleIndex}
        onChangeFiled={this.onChangeFiled}
        setSelectedDropDownValue={this.setSelectedDropDownValue}
        openBottomSheet={this.openBottomSheet}
        setValue={this.setValue}
        submitOrder={this.submitOrder}
        openGooglePlacesSearch={this.openGooglePlacesSearch}
        getLatLngAndAddress={this.getLatLngAndAddress}
        openCalender={openCalender}
        selectedValueOfDropdown={selectedValueOfDropdown}
        loading={loading}
        locationLat={locationLat}
        locationLng={locationLng}
        locationAddress={locationAddress}
        activeIndex={activeIndex}
        itemList={itemList}
        itemDetails={itemDetails}
        submitLoader={submitLoader}
      />
    );
  }
}

const mapStateToProps = ({orders, categories, user}) => ({
  orderDetails: orders.reOrderDetails,
  userCoordinates: user.userCoordinates,
  isPickup: categories.isPickup,
  isDelivery: categories.isDelivery,
});
const actions = {getReOrderDetailsRequest, clearQueueVendors, createRFPRequest};

export default connect(
  mapStateToProps,
  actions,
)(ReOrderDetailsController);
