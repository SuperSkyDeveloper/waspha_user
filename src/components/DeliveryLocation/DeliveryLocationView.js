import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {Text} from '../../components';
import styles from './DeliveryLocationStyles';
import LinearGradient from 'react-native-linear-gradient';
import {Colors, Images, AppStyles, Fonts} from '../../theme';
import {strings} from '../../constants';
import util from '../../util';
import {renderNameStringAndImageRender} from '../../helpers/multilingualHelper';

export default function DeliveryLocationView(props) {
  const {
    address,
    categoryImg,
    category,
    touchable,
    handlePress,
    gradientColor1,
    gradientColor2,
    locationAddress,
    isPickup,
    getLatLngAndAddress,
  } = props;
  return (
    <TouchableOpacity disabled={!touchable} onPress={handlePress}>
      <LinearGradient
        start={{x: 0, y: 0.8}}
        end={{x: 0, y: -0.3}}
        colors={[gradientColor2, gradientColor1]}
        style={[
          styles.locationWrap,
          util.isRTL() ? [AppStyles.rowReverse] : [AppStyles.flexRow],
        ]}>
        <View style={styles.leftCircle} />
        <View style={styles.rightCircle} />
        <View
          style={[
            styles.prdDetail,
            {alignItems: 'center', left: -12},
            // util.isRTL() && {left: -12},
          ]}>
          <RnImage
            source={
              util.isValidURL(categoryImg) ? {uri: categoryImg} : categoryImg
            }
            style={{width: 35, height: 35}}
            // tintColor={Colors.white}
            resizeMode="contain"
          />
          <Text
            style={[AppStyles.mTop5, {textAlign: 'center',}]}
            size={Fonts.size.font12}
            color={Colors.white}
            type="semiBold">
            {renderNameStringAndImageRender(category)}
          </Text>
        </View>
        {!isPickup && !_.isEmpty(locationAddress) && (
          <View style={styles.addressDetail}>
            <Text size={Fonts.size.font16} color={Colors.white} type="semiBold" style={util.isRTL()&&{textAlign:'right'}}
>
              {strings.DELIVERY_LOCATION}
            </Text>
            <Text
            style={util.isRTL()&&{textAlign:'right'}}
              numberOfLines={2}
              size={Fonts.size.font10}
              color={Colors.white}>
              {locationAddress}
            </Text>
          </View>
        )}

        {(isPickup || _.isEmpty(locationAddress)) && (
          <View style={util.isRTL() ? {left: 0, flex: 1} : {right: 20}}>
            <Text size={Fonts.size.large} color={Colors.white} type="semiBold">
              {strings.PICK_UP}
            </Text>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}
