import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import ActionButton from 'react-native-action-button';
import {
  Text,
  CustomNavbar,
  Maps,
  SearchBar,
  LocationsSearchBar,
  BottomAlertSnackBar,
  BackHandlerModel,
  Loader,
} from '../../components';

import styles from './HomeStyles';
import {AppStyles, Colors, Images, Fonts, Metrics} from '../../theme';
import AvailableCategoriesOnMap from '../../components/AvailableCategoriesOnMap/';
import util from '../../util';

export default function HomeView(props) {
  const {
    filteredVendors,
    animated,
    onOptionPress,
    activeIndex,
    updateUserLocation,
    mapLocationAddress,
    selectCategory,
    getFavLocation,
    onChangeOfRegion,
    setMapRef,
    focusOnUpdatedLocation,
    isMapView,
    isListView,
    selectVendorListType,
    navigateToCurrentLocation,
    optionCollapsed,
    setValue,
    BackHandler,
    isBackHandler,
    backHandlerModal,
  } = props;

  let options = [
    {
      id: 0,
      image: Images.ChooseDeliveryType,
    },
    {
      id: 1,
      image: util.isRTL() ? Images.RiderDeliverTypeAR : Images.RiderDeliverType,
    },
    {
      id: 2,
      image: util.isRTL() ? Images.TakeAwayTypeAR : Images.TakeAwayType,
    },
  ];
  return (
    <>
      <View style={styles.container}>
        {/* {/* <CustomNavbar
        titleColor={Colors.white}
        hasBack={false}
        hasBottomRadius={true}
        leftBtnImage={Images.BaselineIcon}
        leftBtnPress={() => {
          Actions.drawerOpen();
        }}
        isRTL={util.isRTL()}
        showBackgroundColor={false}
      /> */}
        <View style={styles.searchBarSpacing}>
          <LocationsSearchBar
            yourCurrentLocation={mapLocationAddress}
            getFavLocation={getFavLocation}
            onChangeOfRegion={onChangeOfRegion}
            focusOnUpdatedLocation={focusOnUpdatedLocation}
            showFavLocation={true}
          />
        </View>

        <Maps
          isAddressTitleVisible={true}
          vendorIconDetails={true}
          updateUserLocation={updateUserLocation}
          filteredVendors={filteredVendors}
          onChangeOfRegion={onChangeOfRegion}
          setMapRef={setMapRef}
        />

        <TouchableOpacity
          onPress={() => {
            Actions.drawerOpen();
          }}
          style={[
            {
              position: 'absolute',
              top: 20,
              paddingHorizontal: 70,
              paddingVertical: 20,
            },
            util.isRTL() ? {right: -12} : {left: -12},
          ]}>
          <RnImage
            source={Images.BaselineIcon}
            style={[
              {height: 30, width: 30, tintColor: '#663399'},
              util.isRTL() ? {right: -45, top: -8} : {left: -40, top: -8},
            ]}
          />
        </TouchableOpacity>
        {/* <VendorsListingButton
        selectVendorListType={selectVendorListType}
        isMapView={isMapView}
        isListView={isListView}
      /> */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={navigateToCurrentLocation}
          style={
            util.isRTL()
              ? [
                  styles.currentLocationPin,
                  {
                    right: 7,
                  },
                ]
              : [styles.currentLocationPin, {left: -5}]
          }>
          <RnImage
            source={Images.CurrentLocationButton}
            style={{
              left: 5,
              top: 4,
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>
        {/*  */}
        <>
          {console.log({optionCollapsed})}
          {console.log({activeIndex})}
          {console.log({activeItem: options[activeIndex]})}
          <ActionButton
            backgroundTappable={true}
            style={[util.isRTL() ? {left: -20} : {right: -10}]}
            offsetY={240}
            position={util.isRTL() ? 'left' : 'right'}
            active={false}
            onPress={() => {
              console.warn('main option');
              setValue({optionCollapsed: !optionCollapsed});
            }}
            renderIcon={() => {
              return (
                <RnImage
                  style={styles.optionImage}
                  source={
                    optionCollapsed
                      ? options[activeIndex].image
                      : options[0].image
                  }
                />
              );
            }}
            verticalOrientation="down">
            {options.map((item, index) => {
              if (index === 0) {
                return true;
              }
              const isActive = index === activeIndex && index !== 0;
              return (
                <ActionButton.Item
                  onPress={() => {
                    console.log({index});
                    onOptionPress(index);
                    setValue({optionCollapsed: !optionCollapsed});
                  }}>
                  <RnImage
                    style={[
                      styles.optionImage,
                      isActive ? styles.optionImageActive : {},
                    ]}
                    source={item.image}
                  />
                </ActionButton.Item>
              );
            })}
          </ActionButton>

          {/*  */}
        </>
        <View>
          <AvailableCategoriesOnMap
            selectCategory={selectCategory}
            filteredVendors={filteredVendors}
          />
        </View>
      </View>
      {/* <BottomAlertSnackBar/> */}

      {isBackHandler && (
        <BackHandlerModel
          isModalOpen={isBackHandler}
          closeModal={setValue}
          BackHandler={BackHandler}
          backHandlerModal={backHandlerModal}
        />
      )}
    </>
  );
}
