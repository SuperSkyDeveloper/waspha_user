import React from 'react';
import _, {map} from 'lodash';
import {
  View,
  Image as RnImage,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  CustomNavbar,
  Maps,
  SearchBar,
  Button,
  LocationsSearchBar,
  Loader,
} from '../../components';
import styles from './AddressFlowMapStyles';
import {strings} from '../../constants';
import {Images, AppStyles, Colors, Fonts} from '../../theme';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay';

export default function AddressFlowMapView(props) {
  const {
    loading,
    searchData,
    updateUserLocation,
    setMapRef,
    focusOnUpdatedLocation,
    mapLocationAddress,
    getFavLocation,
    confirmNewLocation,
  } = props;
  return (
    <View style={styles.container}>
      <View style={styles.searchBarSpacing}>
        <LocationsSearchBar
          yourCurrentLocation={mapLocationAddress}
          onChangeOfRegion={updateUserLocation}
          focusOnUpdatedLocation={focusOnUpdatedLocation}
        />
      </View>

      {loading ? (
        <Loader loading={loading} />
      ) : (
        <Maps
          isAddressTitleVisible={false}
          isMarkerMoving={true}
          onChangeOfRegion={updateUserLocation}
          setMapRef={setMapRef}
        />
      )}

      <TouchableOpacity
        style={styles.submitBtnWrap}
        activeOpacity={0.9}
        onPress={confirmNewLocation}>
        <LinearGradient
          style={styles.submitBtn}
          start={{x: 0, y: 0.8}}
          end={{x: 0, y: -0.3}}
          colors={[Colors.resolutionBlue, Colors.violetRed]}>
          <Text color={Colors.white} type="semiBold">
            {strings.CONFIRM.toUpperCase()}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
