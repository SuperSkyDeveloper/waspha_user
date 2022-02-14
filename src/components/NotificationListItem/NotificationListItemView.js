import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {Text} from '../../components';
import styles from './NotificationListItemStyles';
import {Colors, Images, Fonts, AppStyles} from './../../theme';
import {navigateOnNotificationTap} from '../../helpers/firebaseHelper';
import util from '../../util';

export default function NotificationListItemView(props) {
  const {item} = props;
  const {extra_data} = item;
  let extraData = JSON.parse(extra_data);

  return (
    <TouchableOpacity
      style={[
        styles.list,
        util.isRTL() ? AppStyles.rowReverse : AppStyles.flexRow,
      ]}
      activeOpacity={0.7}
      onPress={() => navigateOnNotificationTap(item)}>
      <View
        style={[
          styles.spaceBetween,
          util.isRTL() ? AppStyles.rowReverse : AppStyles.flexRow,
        ]}>
        <View style={styles.imgWrap}>
          <RnImage
            style={styles.img}
            source={
              _.isNil(extraData.sent_by) || _.isNil(extraData.sent_by.avatar)
                ? Images.ProfilePlaceholder
                : {uri: extraData.sent_by.avatar}
            }
          />
        </View>
        <View
          style={[
            util.isRTL()
              ? {alignItems: 'flex-end', ...AppStyles.mRight15}
              : AppStyles.mLeft15,
          ]}>
          <Text size={Fonts.size.small} color={Colors.black} type="semiBold">
            {item.title}
          </Text>
          <Text
            style={[
              {maxWidth: '87%'},
              AppStyles.mTop5,
              util.isRTL() && {textAlign: 'right'},
            ]}
            numberOfLines={2}
            ellipsizeMode="tail"
            size={Fonts.size.xxSmall}
            color={Colors.boulder}
            type="semiBold">
            {item.body}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
