import React from 'react';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Text, CustomNavbar} from '../../components';
import styles from './GooglePlacesSearchStyles';
import {GOOGLE_COUNTRY_APIKEY, PLACES_API_KEY, strings} from '../../constants';
import {Images, Metrics, Colors, Fonts, AppStyles} from '../../theme';
import {Actions} from 'react-native-router-flux';
import util from '../../util';
export default function GooglePlacesSearchView(props) {
  const {
    onChangeOfRegion,
    focusOnUpdatedLocation,
    userLocationOn,
    favLocations,
    fromOrderPlace,
    getLatLngAndAddress,
    appLanguage,
  } = props;

  return (
    <View style={styles.container}>
      <CustomNavbar hasBottomRadius={true} />
      <GooglePlacesAutocomplete
        placeholder={strings.SEARCH}
        fetchDetails={true}
        enablePoweredByContainer={false}
        textInputProps={{}}
        styles={{
          textInput: [
            styles.textInputWrap,
            util.isRTL() && {textAlign: 'right'},
          ],
          row: styles.rowWrap,
        }}
        renderRow={result => {
          return (
            <>
              <View style={styles.rowItemWrap}>
                <View
                  style={{
                    width: Metrics.screenWidth - 70,
                  }}>
                  <Text
                    numberOfLines={1}
                    size={Fonts.size.xSmall}
                    color={'black'}
                    type="medium"
                    style={{
                      width: util.isRTL()
                        ? Metrics.screenWidth - 40
                        : Metrics.screenWidth - 80,
                      textAlign: util.isRTL() ? 'right' : 'left',
                    }}>
                    {result.structured_formatting.main_text}
                  </Text>
                  <Text
                    color={Colors.silverChalice1}
                    size={Fonts.size.xxSmall}
                    type="medium"
                    numberOfLines={1}
                    style={{
                      width: util.isRTL()
                        ? Metrics.screenWidth - 40
                        : Metrics.screenWidth - 100,
                      textAlign: util.isRTL() ? 'right' : 'left',
                    }}>
                    {result.structured_formatting.secondary_text}
                  </Text>
                </View>
                {/* {userLocationOn && (
                  <TouchableOpacity style={styles.favIcon}>
                    <RnImage
                      source={Images.UnActiveFavorite}
                      style={{height: 25, width: 25}}
                      resizeMode="contain"
                      tintColor={Colors.black}
                    />
                  </TouchableOpacity>
                )} */}
              </View>
            </>
          );
        }}
        //data.description
        onPress={(data, details = null) => {
          const {lat, lng} = details.geometry.location;
          if (!fromOrderPlace) {
            onChangeOfRegion(lat, lng);
            focusOnUpdatedLocation();
          } else {
            getLatLngAndAddress(lat, lng, data.description);
          }
          Actions.pop();
        }}
        query={{
          key:
            //  GOOGLE_COUNTRY_APIKEY
            PLACES_API_KEY,
          language: appLanguage,
        }}
      />
    </View>
  );
}
