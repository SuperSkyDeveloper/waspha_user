import React from 'react';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {Text} from '..';
import styles from './VendorsListingButtonStyles';
import {Colors, AppStyles, Fonts} from '../../theme';
import {strings} from '../../constants';
import util from '../../util';
export default function VendorsListingButtonView(props) {
  const {isListView, selectVendorListType, isMapView} = props;
  return (
    <View
      style={
        util.isRTL()
          ? [AppStyles.mRight15, styles.buttonsRTLStyle]
          : [AppStyles.mLeft15, AppStyles.flex, styles.container]
      }>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          //mapView-->true , listView-->false
          selectVendorListType(true, false);
        }}
        style={[
          {
            // backgroundColor: isMapView ? Colors.resolutionBlue : Colors.grey4,
            backgroundColor: Colors.resolutionBlue,
          },
          util.isRTL() ? {marginLeft: 10} : {marginRight: 10},
          styles.buttonStyle,
        ]}>
        <Text size={Fonts.size.xxxxSmall} type="bold" color={Colors.white}>
          {strings.MAP_VIEW}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          //mapView-->false , listView-->true

          selectVendorListType(false, true);
        }}
        style={[
          {
            // backgroundColor: isListView ? Colors.resolutionBlue : Colors.grey4,
            backgroundColor: Colors.grey4,
          },
          styles.buttonStyle,
        ]}>
        <Text size={Fonts.size.xxxxSmall} type="bold" color={Colors.white}>
          {strings.LIST_VIEW}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
