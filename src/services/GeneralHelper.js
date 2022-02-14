import {StatusBar, Platform} from 'react-native';
import _ from 'lodash';
import * as RNLocalize from 'react-native-localize';
// import Geocoder from 'react-native-geocoding';
import Geocoder from 'react-native-geocoder';

import {GOOGLE_COUNTRY_APIKEY} from '../constants';

export const customStatusBar = () => {
  StatusBar.setBarStyle('light-content');
  if (Platform.OS === 'android') {
    StatusBar.setBackgroundColor('rgba(0,0,0,0)');
    StatusBar.setTranslucent(true);
  }
};

export const getCurrentRegion = async (fromCountryCode = false) => {
  let place = RNLocalize.getTimeZone().split('/')[1];
  let rofl;
  console.log({place});
  Geocoder.fallbackToGoogle(GOOGLE_COUNTRY_APIKEY);
  await Geocoder.geocodeAddress(place)
    .then(json => {
      if (fromCountryCode) {
        rofl = json[0].countryCode;
        console.log('1');
      } else {
        rofl = json[0].position;
        console.log('2');
      }
      console.log({json});
    })
    .catch(error => console.warn('ERRIOR', error));
  console.log('ROFL', rofl);
  return rofl;
};

// export const getAddress = async (lat, lng) => {
//   let rofl;
//   Geocoder.init(GOOGLE_COUNTRY_APIKEY);
//   await Geocoder.from(lat, lng)
//     .then(json => {
//       // rofl = json.results[0].address_components[0];
//       rofl = json.results[0].formatted_address;
//     })
//     .catch(error => console.warn('ERRIOR', error));
//   return rofl;
// };

export const getAddress = async (lat, lng) => {
  Geocoder.fallbackToGoogle(GOOGLE_COUNTRY_APIKEY);
  let result = await Geocoder.geocodePosition({lat, lng});
  return result[0].formattedAddress;
};

export const filterVendorsByCategories = (cat_id, vendors) => {
  const filteredVendors = vendors.filter(vendor => {
    return vendor.category_ids.includes(cat_id);
    // return vendor.category_id === cat_id;
  });
  return filteredVendors;
};

//calculates distance betweeen two coordinates
export const distance = (cord1, cord2) => {
  if (cord1.latitude == cord2.latitude && cord1.longitude == cord2.longitude) {
    return 0;
  } else {
    var radlat1 = (Math.PI * cord1.latitude) / 180;
    var radlat2 = (Math.PI * cord2.latitude) / 180;
    var theta = cord1.longitude - cord2.longitude;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;

    if (dist <= 0.385) {
      return true;
    }
    return false;
  }
};
