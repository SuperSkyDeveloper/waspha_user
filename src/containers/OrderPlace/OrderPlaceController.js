import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import OrderPlaceView from './OrderPlaceView';
import {connect} from 'react-redux';
import util from '../../util';
import {strings, NAME_LENGTH, DESC_LENGTH} from '../../constants';
import BottomSheet from 'react-native-bottomsheet';
import {createRFPRequest} from '../../actions/RFPActions';
import {ISOToFormat, GetCurrentTimeInISO} from '../../helpers/generalHelper';
import {Actions} from 'react-native-router-flux';
import {getAddress} from '../../services/GeneralHelper';
import {clearQueueVendors} from '../../actions/ShopsActions';
import {updateUserData, updateUserCoordinates} from '../../actions/UserActions';
import logger from 'redux-logger';
import {alertMessage} from '../../actions/GeneralActions';

class OrderPlaceController extends React.Component {
  constructor() {
    super();
    this.state = {
      addItem: false,
      firstTimeAddItem: true,
      itemTitle: '',
      itemRequirements: '',
      itemImage: '',
      itemImageBase64: '',
      addedItems: [],
      activeIndex: 0,
      itemList: [],
      savelocationModal: false,
      openCalender: false,
      selectedValueOfDropdown: strings.NOW,
      counter: 0,
      removeItemModal: false,
      locationLat: '',
      locationLng: '',
      locationAddress: strings.PLEASE_SELECT_DELIVERY_LOC,
      loading: false,
      scheduled_delivery_time: '',
      loginModal: false,
    };
  }
  static propTypes = {
    category: PropTypes.obj,
    subCategory: PropTypes.obj,
    fromMapCustomView: PropTypes.bool,
    createRFPRequest: PropTypes.func,
    isParticularStore: PropTypes.bool,
    storeId: PropTypes.number,
    rfpVendors: PropTypes.array,
    showRemoveImgBtn: PropTypes.bool,
  };
  static defaultProps = {
    category: {},
    subCategory: {},
    fromMapCustomView: false,
    createRFPRequest: () => {},
    isParticularStore: false,
    storeId: null,
    rfpVendors: [],
    showRemoveImgBtn: false,
  };

  componentDidMount() {
    this.getInitialAddressofDeliveryLocation();
  }

  itemTitleFocus = () => {
    this.itemTitleRef.focus();
  };

  itemRequirementsFocus = () => {
    this.itemRequirementsRef.focus();
  };

  validation = () => {
    const {alertMessage} = this.props;
    const {itemTitle, itemRequirements} = this.state;
    if (_.isEmpty(itemTitle) && _.isEmpty(itemRequirements)) {
      // util.topAlert(strings.PLEASE_FILL_ITEM_DETAILS);
      alertMessage(strings.PLEASE_FILL_ITEM_DETAILS);
      this.itemTitleFocus();
      return false;
    } else if (_.isEmpty(itemTitle)) {
      // util.topAlert(strings.TITLE_REQ);
      alertMessage(strings.TITLE_REQ);
      this.itemTitleFocus();
      return false;
    } else if (_.isEmpty(itemRequirements)) {
      // util.topAlert(strings.GIVE_REQUIREMENT);
      alertMessage(strings.GIVE_REQUIREMENT);
      this.itemRequirementsFocus();
      return false;
    }
    return true;
  };

  addNewItem = () => {
    const {
      firstTimeAddItem,
      addedItems,
      itemTitle,
      itemRequirements,
      itemImage,
    } = this.state;

    const totalItems = _.cloneDeep(addedItems);
    const item = {
      name: itemTitle,
      description: itemRequirements,
      image: itemImage,
    };

    if (firstTimeAddItem) {
      this.setState({firstTimeAddItem: false, addItem: true});
      return true;
    } else {
      if (this.validation()) {
        totalItems.push(item);
        this.setState({
          itemTitle: '',
          itemRequirements: '',
          itemImage: '',
          itemImageBase64: '',
          addedItems: totalItems,
          addItem: true,
        });
      }
    }
    this.setState({addItem: true});
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

  hanldeNewItemPress = () => {
    let findArray = this.state.itemList.length;

    if (findArray !== 0) {
      if (!this.validate()) {
        return true;
      }
    }

    this.setState({
      activeIndex: findArray,
      itemList: [
        ...this.state.itemList,
        {
          id: findArray,
          name: '',
          description: '',
          image: '',
          imageBase64: '',
          quantity: 1,
          nameError: '',
          descError: '',
          quantityError: '',
          imageError: '',
        },
      ],
    });
  };

  validate = () => {
    const tempList = _.cloneDeep(this.state.itemList);

    let valid = true;

    if (_.isEmpty(tempList)) {
      return valid;
    }

    if (_.isEmpty(tempList[tempList.length - 1].name)) {
      tempList[tempList.length - 1].nameError = strings.NAME_IS_REQ; //'Name is required'
      this.setState({itemList: tempList});
      valid = false;
      return valid;
    }

    if (
      _.isEmpty(tempList[tempList.length - 1].description) &&
      _.isEmpty(tempList[tempList.length - 1].image)
    ) {
      tempList[tempList.length - 1].descError = strings.DESC_IS_REQ; //'Description is required'

      this.setState({itemList: tempList});
      valid = false;
      return valid;
    }

    if (tempList[tempList.length - 1].quantity === 0) {
      tempList[tempList.length - 1].quantityError =
        strings.QUANTITY_CANNOT_BE_ZERO; //'Quantity cannot be zero'
      this.setState({itemList: tempList});
      valid = false;
      return valid;
    }

    if (
      _.isEmpty(tempList[tempList.length - 1].image) &&
      _.isEmpty(tempList[tempList.length - 1].description)
    ) {
      tempList[tempList.length - 1].imageError = strings.IMG_IS_REQ; //'Image is required'

      this.setState({itemList: tempList});
      valid = false;
      return valid;
    }

    return valid;
  };

  //removes item from list
  handleRemoveItem = removeItemIndex => {
    const {itemList} = this.state;

    const filteredItems = itemList.filter(item => {
      return item.id !== removeItemIndex;
    });

    this.setState({itemList: filteredItems});
  };

  // focusOnUpdatedLocation = () => {
  //   const {latitude, longitude} = this.props.userCoordinates;
  //   this.mapRef &&
  //     // this.mapRef.fitToCoordinates([
  //     //   {
  //     //     latitude: latitude,
  //     //     longitude: longitude,
  //     //   },
  //     // ]);

  //     this.mapRef.animateToRegion(
  //       {
  //         latitude: latitude,
  //         longitude: longitude,
  //         latitudeDelta: 0.01,
  //         longitudeDelta: 0.01,
  //       },
  //       2000,
  //     );
  // };

  // updateUserLocation = cords => {
  //   const {updateUserCoordinates} = this.props;

  //   updateUserCoordinates(cords);
  // };

  // onChangeOfRegion = (lat, lng) => {
  //   const {updateUserData} = this.props;
  //   this.updateUserLocation({
  //     latitude: lat,
  //     longitude: lng,
  //   });
  //   getAddress(lat, lng).then(res => {
  //     this.setValue({mapLocationAddress: res});
  //     updateUserData({address: res});
  //     this.getNearbyStores();
  //   });
  // };

  openGooglePlacesSearch = () => {
    Actions.googlePlacesSearch({
      getLatLngAndAddress: this.getLatLngAndAddress,
      fromOrderPlace: true,
    });
  };

  //gets lat lng and address and saves in state
  getLatLngAndAddress = (lat, lng, address) => {
    this.setState({
      locationLat: lat,
      locationLng: lng,
      locationAddress: address,
    });

    this.updateUserLocation({
      latitude: lat,
      longitude: lng,
    });
  };

  updateUserLocation = cords => {
    const {updateUserCoordinates} = this.props;

    updateUserCoordinates(cords);
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

  //performs the changes in any field of list item
  onChangeFiled = (key, index, value) => {
    const tempState = _.cloneDeep(this.state.itemList);

    if (key === 'name' && value.length > NAME_LENGTH) {
      tempState[index].nameError = strings.CHARACTER_LIMIT_EXCEEDED;
      this.setState({
        itemList: tempState,
      });
      return true;
    } else if (key === 'name') {
      tempState[index].nameError = '';
    }

    if (key === 'description' && value.length > DESC_LENGTH) {
      tempState[index].descError = strings.CHARACTER_LIMIT_EXCEEDED;
      this.setState({
        itemList: tempState,
      });
      return true;
    } else if (key === 'description') {
      tempState[index].descError = '';
      tempState[index].imageError = '';
    }

    if (key === 'image') {
      if (_.isEmpty(value.image)) {
        tempState[index][key] = '';
      } else {
        tempState[index][key] = value.image;
        tempState[index]['imageBase64'] = value.imageBase64;
        tempState[index].imageError = '';
        tempState[index].descError = '';
      }
      this.setState({
        itemList: tempState,
      });

      return true;
    }

    if (key === 'quantity') {
      tempState[index].quantityError = '';
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

  loginToProceed = () => {
    this.setState({loginModal: false});
    Actions.login();
  };

  // submits the rfp
  submitOrder = () => {
    const {
      locationLat,
      locationLng,
      locationAddress,
      selectedValueOfDropdown,
    } = this.state;
    const {
      createRFPRequest,
      category,
      fromMapCustomView,
      isPickup,
      isDelivery,
      isParticularStore,
      storeId,
      rfpVendors,
      clearQueueVendors,
      user,
      alertMessage,
    } = this.props;

    if (!this.validate()) {
      return true;
    }

    if (!_.isNumber(locationLat)) {
      // util.topAlert(strings.SPECIFY_DELIVERY_LOCATION);
      alertMessage(strings.SPECIFY_DELIVERY_LOCATION);
      return true;
    }

    if (_.isEmpty(this.state.itemList)) {
      // util.topAlert(strings.ADD_ONE_ITEM);
      alertMessage(strings.ADD_ONE_ITEM);

      return true;
    }

    if (_.isNil(user.access_token)) {
      this.setState({loginModal: true});
      return true;
    }

    let items = this.state.itemList.map(item => {
      console.log({
        item,
      });
      return {
        name: item.name,
        image: item.image,
        quantity: item.quantity,
        requirements: item.description,
      };
    });

    let payload = {
      subcategory_id: category.id,
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

    if (isParticularStore) {
      payload['store_id'] = storeId;
    }

    this.setState({loading: true});

    clearQueueVendors();
    createRFPRequest(payload, response => {
      if (response.status) {
        isParticularStore
          ? Actions.orderplaceNearbyVendors({
              rfpId: response.data.id,
              orderType: response.data.type,
              rfpVendors,
              scheduledTime:
                selectedValueOfDropdown === strings.NOW
                  ? ''
                  : selectedValueOfDropdown,
              isParticularStore: isParticularStore,
            })
          : Actions.orderplaceNearbyVendors({
              rfpId: response.data.id,
              orderType: response.data.type,

              scheduledTime:
                selectedValueOfDropdown === strings.NOW
                  ? ''
                  : selectedValueOfDropdown,
              isParticularStore: isParticularStore,
            });
      }
      this.setState({loading: false});
    });
  };

  render() {
    const {
      itemTitle,
      itemRequirements,
      itemImage,
      itemImageBase64,
      addItem,
      addedItems,
      activeIndex,
      itemList,
      savelocationModal,
      openCalender,
      selectedValueOfDropdown,
      removeItemModal,
      locationAddress,
      loading,
      loginModal,
    } = this.state;

    return (
      <OrderPlaceView
        itemTitle={itemTitle}
        itemRequirements={itemRequirements}
        itemImage={itemImage}
        itemImageBase64={itemImageBase64}
        addItem={addItem}
        addedItems={addedItems}
        openCalender={openCalender}
        removeItemModal={removeItemModal}
        locationAddress={locationAddress}
        loading={loading}
        loginModal={loginModal}
        loginToProceed={this.loginToProceed}
        openGooglePlacesSearch={this.openGooglePlacesSearch}
        addNewItem={this.addNewItem}
        handleIndex={this.handleIndex}
        savelocationModal={savelocationModal}
        activeIndex={activeIndex}
        setValue={data => this.setValue(data)}
        itemList={itemList}
        hanldeNewItemPress={this.hanldeNewItemPress}
        handleRemoveItem={this.handleRemoveItem}
        getLatLngAndAddress={this.getLatLngAndAddress}
        onChangeFiled={this.onChangeFiled}
        setSelectedValue={this.setSelectedValue}
        selectedValueOfDropdown={selectedValueOfDropdown}
        counter={this.state.counter}
        submitOrder={this.submitOrder}
        itemTitleRef={ref => {
          this.itemTitleRef = ref;
        }}
        itemRequirementsRef={ref => {
          this.itemRequirementsRef = ref;
        }}
        setSelectedDropDownValue={this.setSelectedDropDownValue}
        openBottomSheet={this.openBottomSheet}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({user, categories}) => ({
  userCoordinates: user.userCoordinates,
  isPickup: categories.isPickup,
  isDelivery: categories.isDelivery,
  user: user.data,
});

const actions = {
  createRFPRequest,
  clearQueueVendors,
  updateUserData,
  updateUserCoordinates,
  alertMessage,
};

export default connect(
  mapStateToProps,
  actions,
)(OrderPlaceController);
