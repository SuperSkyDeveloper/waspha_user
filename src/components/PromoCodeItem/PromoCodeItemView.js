import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage} from 'react-native';
import {Text, TimerCounter} from '..';
import styles from './PromoCodeItemStyles';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import {strings} from '../../constants';
import util from '../../util';
import LinearGradient from 'react-native-linear-gradient';

export default function PromoCodeItemView(props) {
  const {item} = props;
  return (
    <LinearGradient
      start={{x: -1.8, y: 0}}
      end={{x: -0.3, y: 3}}
      colors={[Colors.violetRed, Colors.resolutionBlue]}
      style={styles.wrapper}>
      <View style={[styles.contentStyle, util.isRTL() && AppStyles.rowReverse]}>
        <View style={[styles.imageWrap, util.isRTL() && {top: -30, left: 6}]}>
          <RnImage
            source={
              _.isNil(item.vendor)
                ? Images.WasphaIcon
                : {uri: item.vendor.image}
            }
            style={{width: 70, height: 70, borderRadius: 300, tintColor:_.isNil(item.vendor) && 'white'}}
          />
        </View>
        <View
          style={[
            styles.promoCodeWrap,
            util.isRTL()
              ? {
                  left: 62,
                  marginLeft:-16
                }
              : {marginLeft: 2},
          ]}>
          <Text
            style={{left: 8}}
            size={Fonts.size.small}
            type="semiBold"
            color={Colors.text.secondary}>
            {`${strings.PROMO_CODE} : `}
          </Text>
          <Text
            size={Fonts.size.large}
            type="semiBold"
            color={Colors.text.secondary}>
            {item.promo_code}
          </Text>
        </View>

        {!_.isNil(item.end_time) && item.end_time > 0 && (
          <View
            style={[
              styles.expiryTimeWrap,
              util.isRTL() && {
                top: -10,
                right: 30,
              },
            ]}>
            <TimerCounter time={item.end_time} timeLabelColor={Colors.white} />
          </View>
        )}
      </View>
      <View style={[styles.noOfUsesWrap, util.isRTL() && AppStyles.rowReverse,{alignItems:'flex-end'}]}>
        <Text
          size={Fonts.size.small}
          type="semiBold"
          color={Colors.text.secondary}>
          {`${strings.NUMBER_OF_USES} : `}
        </Text>
        <Text
          size={Fonts.size.large}
          type="semiBold"
          color={Colors.text.secondary}>
          {item.number_of_uses}
        </Text>
      </View>
      <View style={[styles.discountWrap, util.isRTL() && AppStyles.rowReverse,{alignItems:'baseline'}]}>
        <Text
          size={Fonts.size.xSmall}
          type="semiBold"
          color={Colors.text.secondary}>
          {`${strings.DISCOUNT} : `}
        </Text>
        <Text
          size={Fonts.size.small}
          type="semiBold"
          color={Colors.text.secondary}>
          {`${item.discount} %`}
        </Text>
      </View>
    </LinearGradient>
  );
}
