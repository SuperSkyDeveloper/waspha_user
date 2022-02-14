import React from 'react';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {Text, Maps} from '../../components';
import styles from './AddressListItemStyles';
import {Fonts, Images, AppStyles, Colors} from '../../theme';
import {strings} from '../../constants';
import {Actions} from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';
import util from '../../util';

export default function AddressListItemView(props) {
  const {item, openRemoveAddressModal} = props;

  return (
    <View style={styles.addressItem}>
      {/* header start */}
      <View
        style={[
          util.isRTL() ? AppStyles.rowReverse : AppStyles.flexRow,
          styles.header,
        ]}>
        <Text size={Fonts.size.font12}>{item.title}</Text>
        <View style={util.isRTL() ? AppStyles.rowReverse : AppStyles.flexRow}>
          <TouchableOpacity
            style={util.isRTL() ? AppStyles.mLeft10 : AppStyles.mRight10}
            onPress={() => {
              Actions.myaddress({editLocationData: item});
            }}>
            <RnImage source={Images.EditIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openRemoveAddressModal(item.id)}>
            <RnImage source={Images.TrashIcon} />
          </TouchableOpacity>
        </View>
      </View>
      {/* header end */}
      <View style={styles.content}>
        <Maps
          fromMyAddress={true}
          isAddressTitleVisible={false}
          coordinates={{latitude: item.lat, longitude: item.lng}}
          mapHeight={190}
          scrollEnabled={false}
          showUserCurrentLocation={false}
        />

        <View
          style={[util.isRTL() ? {right: 6} : {left: 6}, styles.addressCard]}>
          <Text
            style={util.isRTL() && {textAlign: 'right'}}
            size={Fonts.size.font11}
            color={Colors.boulder}
            type="semiBold">
            {strings.ADDRESS}
          </Text>
          <Text
            style={util.isRTL() && {textAlign: 'right'}}
            size={Fonts.size.font11}
            color={Colors.white}
            type="semiBold">
            {item.address}
          </Text>
          <Text
            style={[AppStyles.mTop5, util.isRTL() && {textAlign: 'right'}]}
            size={Fonts.size.font11}
            color={Colors.boulder}
            type="semiBold">
            {strings.LANDMARK}
          </Text>
          <Text
            style={util.isRTL() && {textAlign: 'right'}}
            size={Fonts.size.font11}
            color={Colors.white}
            type="semiBold">
            {item.landmark}
          </Text>
          <Text
            style={[AppStyles.mTop5, util.isRTL() && {textAlign: 'right'}]}
            size={Fonts.size.font11}
            color={Colors.boulder}
            type="semiBold">
            {strings.PH0NE}
          </Text>
          <Text
            style={util.isRTL() && {textAlign: 'right'}}
            size={Fonts.size.font11}
            color={Colors.white}
            type="semiBold">
            {item.phone}
          </Text>
        </View>
      </View>
    </View>
  );
}
