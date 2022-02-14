import React from 'react';
import _ from 'lodash';
import {
  View,
  Image as RnImage,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Text, RemoveItemModal, Loader} from '..';
import styles from './LocationsSearchBarStyles';
import {Images, AppStyles, Fonts, Colors} from '../../theme';
import {strings} from '../../constants';
import util from '../../util';

export default function LocationsSearchBarView(props) {
  const {
    yourCurrentLocation,
    favLocation,
    removeFavModal,
    closeRemoveFavModal,
    removeFromFav,
    setValue,
    loading,
    onChangeOfRegion,
    focusOnUpdatedLocation,
    userLocationOn,
    showFavLocation,
    updateFavLocation,
    user,
  } = props;
  if (loading) {
    return (
      // <ActivityIndicator
      //   animating
      //   size="small"
      //   style={styles.spinner}
      //   color={Colors.green}
      // />
      <Loader loading={loading} />
    );
  }

  return (
    <View style={[styles.container]}>
      <View style={styles.searchWrapper}>
        <RnImage
          source={Images.WasphaIcon}
          style={
            util.isRTL() ? [styles.iconRTL] : [styles.icon, AppStyles.mRight15]
          }
        />
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            Actions.googlePlacesSearch({
              onChangeOfRegion,
              focusOnUpdatedLocation,
            });
          }}
          style={{flexDirection: 'row'}}>
          <View
            style={[
              util.isRTL()
                ? styles.locationTextWrapRTL
                : styles.locationTextWrap,
            ]}>
            <Text
              style={util.isRTL() && {textAlign: 'right'}}
              size={Fonts.size.xSmall}
              type="medium"
              numberOfLines={1}>
              {yourCurrentLocation}
            </Text>
          </View>
        </TouchableOpacity>
        {!_.isNil(user.access_token) && userLocationOn && showFavLocation && (
          <TouchableOpacity
            onPress={() =>
              !_.isEmpty(favLocation)
                ? setValue({removeFavModal: true})
                : Actions.myaddress({
                    locationAddress: yourCurrentLocation,
                    updateFavLocation,
                  })
            }
            style={util.isRTL() ? styles.favIconRTL : styles.favIcon}>
            <RnImage
              source={
                !_.isEmpty(yourCurrentLocation) &&
                (!_.isEmpty(favLocation)
                  ? Images.ActiveFavorite
                  : Images.UnActiveFavorite)
              }
              style={{height: 25, width: 25}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>

      {removeFavModal && (
        <RemoveItemModal
          title={`${strings.REMOVE_FROM_FAV} ${util.isRTL() ? '؟' : '?'}`}
          btnOneText={util.renderStrings().YES}
          btnTwoText={util.renderStrings().NO}
          isModalOpen={removeFavModal}
          btnPositiveFunc={removeFromFav}
          btnNegativeFunc={closeRemoveFavModal}
          closeModal={setValue}
          modalType="removeFavModal"
        />
      )}
    </View>
  );
}
