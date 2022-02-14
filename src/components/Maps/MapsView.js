import React from 'react';
import moment from 'moment';
import * as Animatable from 'react-native-animatable';

import _ from 'lodash';
import {
  View,
  Image as RnImage,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import styles from './MapsStyles';
import {Metrics, Images, Colors, AppStyles, Fonts} from '../../theme';
import Text from '../Text';
import {EditLocationModal, HTMLView, Loader} from '..';
import {
  LATITUDE_DELTA,
  GOOGLE_MAPS_APIKEY,
  strings,
  PLACES_API_KEY,
} from '../../constants';
import {Actions} from 'react-native-router-flux';
import util from '../../util';
import {renderNameStringAndImageRender} from '../../helpers/multilingualHelper';

let doOneTime = false;

export default class MapsView extends React.Component {
  handleMapReady = () => {
    return () =>
      this.mapRef.fitToCoordinates(directionData, {
        edgePadding: {top: 0, right: 0, bottom: 200, left: 10},
        animated: false,
      });
  };

  render() {
    const {
      scrollEnabled,
      mapHeight,
      mapStyle,
      vendorIconDetails,

      loading,
      userLocationOn,
      filteredVendors,
      showMovingMarker,
      renderCords,
      favLocations,
      onChangeOfRegion,
      mapRef,
      rfpVendors,
      isDirection,
      moveMarkerPress,
      availableCategories,
      performAnimation,
      performMovingAnimation,
      startValue,
      endValue,
      setValue,
      showLoader,
      showDriverLocation,
      fromOrderStatus,
      driverImg,
      vendorImg,
      showUserCurrentLocation,
      handleViewRef,
      focusOnZoomIn,
      focusOnZoomOut,
      topOfImage,
      riderTimeAndKM,
    } = this.props;

    if (loading) {
      return (
        <View style={styles.loaderWrap}>
          {showLoader && (
            <RnImage
              style={{width: 60, height: 60}}
              source={Images.preloader}
            />
          )}
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={[styles.mapContainer, {height: mapHeight}, mapStyle]}>
          <View style={styles.userPinWrap}>
            {userLocationOn && !isDirection && showUserCurrentLocation && (
              <View style={{top: topOfImage}}>
                <Animatable.Image
                  useNativeDriver={true}
                  ref={ref => {
                    this.props.handleIconRef(ref);
                  }}
                  source={Images.LocIcon}
                  style={[styles.currentPin, {zIndex: 999}]}
                  resizeMode="cover"
                />
              </View>
            )}
          </View>
          {!_.isEmpty(renderCords) && (
            <MapView
              // followsUserLocation={true}
              // showsUserLocation={true}
              // onLayout={Platform.OS === 'ios' ? this.handleMapReady() : null}

              provider={PROVIDER_GOOGLE}
              showsCompass={false}
              zoomTapEnabled={false}
              maxZoomLevel={19} // default => 20
              moveOnMarkerPress={moveMarkerPress}
              ref={ref => {
                mapRef(ref);
              }}
              zoomEnabled={true}
              scrollEnabled={scrollEnabled}
              rotateEnabled={true}
              style={styles.map}
              initialRegion={{
                latitude: renderCords.lat,
                longitude: renderCords.lng,

                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta:
                  LATITUDE_DELTA * (Metrics.screenWidth / Metrics.screenHeight),
              }}
              onRegionChange={() => {
                if (topOfImage === 0) {
                  setValue({topOfImage: -2});
                }
                focusOnZoomIn();
              }}
              onRegionChangeComplete={e => {
                if (!isDirection) {
                  // setValue({showMovingMarker: false});
                  onChangeOfRegion(e.latitude, e.longitude);
                  performAnimation();
                  setValue({topOfImage: 0});

                  focusOnZoomOut();
                  doOneTime = false;
                }
              }}>
              {userLocationOn && isDirection && (
                <Marker
                  pointerEvents="auto"
                  zIndex={999}
                  coordinate={{
                    // latitude: this.props.userCoordinates.latitude,
                    // longitude: this.props.userCoordinates.longitude,

                    latitude: !fromOrderStatus
                      ? this.props.userCoordinates.latitude
                      : renderCords.lat,
                    longitude: !fromOrderStatus
                      ? this.props.userCoordinates.longitude
                      : renderCords.lng,
                  }}>
                  <View>
                    <RnImage
                      source={Images.LocIcon}
                      style={styles.currentPin}
                      resizeMode="cover"
                    />
                  </View>
                </Marker>
              )}

              {userLocationOn &&
                !isDirection &&
                filteredVendors.map(nearbyshop => {
                  let image;

                  let cat = _.find(availableCategories, {
                    id: nearbyshop.category_id,
                    parent_id: null,
                  });
                  if (_.isNil(cat)) {
                    return true;
                  }

                  image = (
                    <View>
                      <View style={styles.categoryImageWrapStyle}>
                        <RnImage
                          source={{uri: cat.image}}
                          style={{
                            top: 2,
                            width: 12,
                            height: 12,
                          }}
                          resizeMode="contain"
                        />
                      </View>
                      <View
                        style={{
                          width: 35,
                          height: 38,
                        }}>
                        <RnImage
                          source={Images.MapPinIcon}
                          style={{
                            width: 38,
                            height: 38,
                            tintColor: Colors.mapVendorIcon,
                          }}
                          resizeMode="contain"
                        />
                      </View>
                    </View>
                  );

                  return (
                    <Marker
                      pointerEvents="auto"
                      coordinate={{
                        latitude: nearbyshop.lat,

                        longitude: nearbyshop.lng,
                      }}
                      style={{zIndex: -999}}
                      onCalloutPress={() => {
                        Actions.vendorProfile({
                          shopId: nearbyshop.id,
                          category: cat,
                        });
                      }}
                      onPress={() => {
                        // // this.props.setValue({moveMarkerPress: false});
                      }}>
                      {image}

                      <MapView.Callout tooltip={true}>
                        <View style={styles.callOutStyleVendor}>
                          {vendorIconDetails ? (
                            <View style={styles.vendorDetailWrap}>
                              <Text
                                style={{
                                  position: 'relative',
                                  marginRight: 10,
                                }}>
                                <RnImage
                                  transition={true}
                                  source={
                                    _.isNil(nearbyshop.image)
                                      ? Images.ProfileIcon
                                      : {uri: nearbyshop.image}
                                  }
                                  style={{
                                    height: 25,
                                    width: 25,
                                  }}
                                  resizeMode="contain"
                                />
                              </Text>
                              <View>
                                <View
                                  style={[
                                    util.isRTL()
                                      ? {alignItems: 'flex-end'}
                                      : {alignItems: 'flex-start'},
                                  ]}>
                                  <View
                                    style={{
                                      justifyContent: 'center',
                                    }}
                                  />
                                  <View
                                    style={[AppStyles.flexRow, {marginTop: 6}]}>
                                    {/* <Text
                                      type="semiBold"
                                      style={
                                        util.isRTL() && {textAlign: 'right'}
                                      }
                                      size={Fonts.size.xxxSmall}>
                                      {renderNameStringAndImageRender(
                                        nearbyshop.business_name,
                                      )}
                                      
                                    </Text> */}

                                    <HTMLView
                                      htmlContent={renderNameStringAndImageRender(
                                        nearbyshop.business_name,
                                      )}
                                      type="semiBold"
                                      style={
                                        util.isRTL() && {textAlign: 'right'}
                                      }
                                      size={Fonts.size.xxxSmall}
                                    />
                                  </View>
                                </View>
                                <View
                                  style={[
                                    util.isRTL()
                                      ? {justifyContent: 'flex-end'}
                                      : {justifyContent: 'flex-start'},
                                    styles.ratingWrap,
                                  ]}>
                                  <Text
                                    style={[
                                      AppStyles.mRight5,
                                      {position: 'relative'},
                                    ]}>
                                    <RnImage
                                      transition={true}
                                      source={Images.StarIcon}
                                      style={{height: 12, width: 12}}
                                      resizeMode="cover"
                                    />
                                  </Text>
                                  <Text
                                    type="semiBold"
                                    size={Fonts.size.xxxSmall}
                                    style={{top: -1}}>
                                    {nearbyshop.average_rating}
                                  </Text>
                                </View>
                              </View>
                              {/* <View style={styles.kmWrap}>
                            <Text
                              size={Fonts.size.xxxSmall}
                              type="medium"
                              style={styles.kmText}>
                              {`${nearbyshop.distance} ${strings.KM} ${
                                strings.AWAY
                              }`}
                            </Text>
                          </View> */}
                            </View>
                          ) : (
                            <></>
                          )}
                        </View>
                      </MapView.Callout>
                    </Marker>
                  );
                })}

              {userLocationOn &&
                !isDirection &&
                favLocations.map(nearbyshop => {
                  return (
                    <Marker
                      pointerEvents="auto"
                      coordinate={{
                        latitude: nearbyshop.lat,

                        longitude: nearbyshop.lng,
                      }}
                      image={
                        _.isNull(nearbyshop.image)
                          ? Images.ShopIcon
                          : nearbyshop.image
                      }
                      style={{zIndex: -999}}
                      onPress={() => {
                        // this.props.setValue({moveMarkerPress: true});
                      }}
                    />
                  );
                })}

              {userLocationOn &&
                rfpVendors.map((vendor, i) => {
                  let image;

                  let cat = _.find(availableCategories, {
                    id: vendor.category_id,
                    parent_id: null,
                  });
                  if (_.isNil(cat) && !showDriverLocation) {
                    return true;
                  }

                  image = (
                    <View>
                      {!showDriverLocation && (
                        <View style={styles.categoryImageWrapStyle}>
                          <RnImage
                            source={{uri: cat.image}}
                            style={{
                              top: 2,
                              width: 12,
                              height: 12,
                            }}
                            resizeMode="contain"
                          />
                        </View>
                      )}
                      <View
                        style={
                          fromOrderStatus
                            ? {width: 25, height: 25}
                            : {
                                width: 35,
                                height: 38,
                              }
                        }>
                        <RnImage
                          tintColor={
                            !fromOrderStatus || !showDriverLocation
                              ? Colors.mapVendorIcon
                              : ''
                          }
                          source={
                            !showDriverLocation || !_.isNil(vendor.isVendor)
                              ? _.isEmpty(vendorImg)
                                ? Images.MapPinIcon
                                : {uri: vendorImg}
                              : _.isEmpty(driverImg)
                              ? Images.ProfilePlaceholder
                              : {uri: driverImg}
                          }
                          style={
                            fromOrderStatus
                              ? {width: 25, height: 25}
                              : {
                                  width: 38,
                                  height: 38,
                                  tintColor:
                                    !fromOrderStatus || !showDriverLocation
                                      ? Colors.mapVendorIcon
                                      : '',
                                }
                          }
                          resizeMode="contain"
                        />
                      </View>
                    </View>
                  );

                  return (
                    <>
                      <Marker
                        zIndex={i}
                        pointerEvents="auto"
                        coordinate={{
                          latitude: vendor.lat,

                          longitude: vendor.lng,
                        }}>
                        {image}
                        {!_.isNil(vendor.business_name) && (
                          <MapView.Callout tooltip={true}>
                            <View style={styles.callOutStyleVendor}>
                              <View style={styles.vendorDetailWrap}>
                                <View
                                  style={[AppStyles.flexRow, {marginTop: 6}]}>
                                  <Text
                                    style={util.isRTL() && {textAlign: 'right'}}
                                    type="semiBold"
                                    size={Fonts.size.xxxSmall}>
                                    {renderNameStringAndImageRender(
                                      vendor.business_name,
                                    )}
                                  </Text>
                                </View>

                                <View
                                  style={[
                                    {flex: 1},

                                    util.isRTL() && {
                                      justifyContent: 'flex-end',
                                    },
                                    AppStyles.flexRow,
                                    AppStyles.mTop40,
                                    {
                                      position: 'absolute',
                                      top: 30,
                                      right: 30,
                                    },
                                  ]}>
                                  <Text
                                    style={[
                                      AppStyles.mRight5,
                                      {position: 'relative'},
                                    ]}>
                                    <RnImage
                                      transition={true}
                                      source={Images.StarIcon}
                                      style={{height: 12, width: 12}}
                                      resizeMode="cover"
                                    />
                                  </Text>
                                  <Text
                                    type="semiBold"
                                    size={Fonts.size.xxxSmall}
                                    style={{top: -1}}>
                                    {vendor.average_rating}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </MapView.Callout>
                        )}

                        {/* riderTimeAndKM */}
                        {!_.isNil(vendor.showRiderTimeAndKM) &&
                          vendor.showRiderTimeAndKM && (
                            <MapView.Callout tooltip={true}>
                              <View style={[styles.callOutStyleVendor]}>
                                <View
                                  style={[
                                    styles.vendorDetailWrap,
                                    {minHeight: 55},
                                  ]}>
                                  <View
                                    style={[
                                      AppStyles.flexRow,
                                      {
                                        marginTop: 6,
                                        left: 20,
                                      },
                                    ]}>
                                    <Text
                                      style={{textAlign: 'center'}}
                                      type="semiBold"
                                      size={Fonts.size.xxxSmall}>
                                      {/* {renderNameStringAndImageRender(
                                      vendor.business_name,
                                    )} */}

                                      {_.isNil(riderTimeAndKM.distance)
                                        ? '0 KM'
                                        : `${(
                                            riderTimeAndKM.distance.value / 1000
                                          ).toFixed(2)} KM`}
                                    </Text>
                                  </View>

                                  <View
                                    style={[
                                      util.isRTL() && {
                                        justifyContent: 'flex-end',
                                      },
                                      AppStyles.flexRow,
                                      AppStyles.mTop30,
                                    ]}>
                                    <Text
                                      type="semiBold"
                                      size={Fonts.size.xxxSmall}
                                      style={{
                                        top: -1,
                                        right: _.isNil(riderTimeAndKM.duration)
                                          ? 10
                                          : 26,
                                        textAlign: 'center',
                                      }}>
                                      {_.isNil(riderTimeAndKM.duration)
                                        ? '0 min'
                                        : moment
                                            .duration({
                                              minutes:
                                                riderTimeAndKM.duration.value /
                                                60,
                                            })
                                            .humanize()}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            </MapView.Callout>
                          )}
                      </Marker>
                      {!fromOrderStatus && (
                        <MapViewDirections
                          origin={{
                            // latitude: this.props.userCoordinates.latitude,
                            // longitude: this.props.userCoordinates.longitude,

                            latitude: !fromOrderStatus
                              ? this.props.userCoordinates.latitude
                              : renderCords.lat,
                            longitude: !fromOrderStatus
                              ? this.props.userCoordinates.longitude
                              : renderCords.lng,
                          }}
                          destination={{
                            latitude: vendor.lat,

                            longitude: vendor.lng,
                          }}
                          apikey={PLACES_API_KEY}
                          strokeWidth={3}
                          strokeColor={Colors.black}
                        />
                      )}
                    </>
                  );
                })}
            </MapView>
          )}
        </View>
        {this.props.showEditModal && (
          <EditLocationModal
            setValue={this.props.setValue}
            showEditModal={this.props.showEditModal}
          />
        )}
      </View>
    );
  }
}
