import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage} from 'react-native';

import {HTMLView, StarRating, Text} from '../../components';
import styles from './ReviewItemStyles';
import {Images, AppStyles, Colors, Fonts} from '../../theme';
import util from '../../util';
export default function ReviewItemView(props) {
  const {item} = props;
  return (
    <>
      <View
        style={[
          util.isRTL() ? AppStyles.rowReverse : AppStyles.flexRow,
          styles.review,
        ]}>
        <View style={AppStyles.mRight15}>
          <RnImage
            source={
              _.isNil(item.user.avatar)
                ? Images.ProfilePlaceholder
                : {uri: item.user.avatar}
            }
            style={styles.profileImg}
          />
        </View>
        <View style={AppStyles.flex}>
          <View
            style={[
              util.isRTL() ? AppStyles.rowReverse : AppStyles.flexRow,
              ,
              AppStyles.spaceBetween,
            ]}>
            {/* <Text
              style={util.isRTL() && {marginRight: 10}}
              color={Colors.codGray}
              size={Fonts.size.font15}
              type="medium">
              {item.user.name}
            </Text> */}

            <HTMLView
              htmlContent={item.user.name}
              style={util.isRTL() && {marginRight: 10}}
              color={Colors.codGray}
              size={Fonts.size.font15}
              type="medium"
            />
            <View
              style={[
                util.isRTL() ? AppStyles.rowReverse : AppStyles.flexRow,
                styles.providerRatingWrap,
              ]}>
              {/* <AirbnbRating
                count={5}
                defaultRating={item.rating}
                size={13}
                showRating={false}
                isDisabled={true}
              /> */}
              <StarRating
                initialRating={item.rating}
                readonly={true}
                imageSize={13}
              />
            </View>
          </View>
          {/* <Text
            color={Colors.silverChalice1}
            size={Fonts.size.font12}
            type="medium">
            Just Now
          </Text> */}
          {/* <Text
            color={Colors.doveGray}
            size={Fonts.size.font12}
            type="medium"
            style={[
              AppStyles.flex,
              util.isRTL() && {textAlign: 'right', marginRight: 10},
            ]}>
            {item.review}
          </Text> */}
          <HTMLView
            htmlContent={item.review}
            color={Colors.doveGray}
            size={Fonts.size.font12}
            type="medium"
            style={[
              AppStyles.flex,
              util.isRTL() && {textAlign: 'right', marginRight: 10},
            ]}
          />
        </View>
      </View>
      <View style={styles.borderStyle} />
    </>
  );
}
