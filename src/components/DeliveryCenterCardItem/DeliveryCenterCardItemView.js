import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {Text, DateItem} from '..';
import styles from './DeliveryCenterCardItemStyles';
import {strings, DATE_FORMAT2} from '../../constants';
import {Images, Fonts, Colors, Metrics, AppStyles} from '../../theme';
import {ISOToFormat} from '../../helpers/generalHelper';
import util from '../../util';
import {renderNameStringAndImageRender} from '../../helpers/multilingualHelper';
import {HTMLView} from '../../components';
export default function DeliveryCenterCardItemView(props) {
  const {item} = props;
  return (
    <View
      style={[
        styles.container,
        !item.status === 'accepted' && {
          elevation: 8,
        },
      ]}>
      <View style={styles.orderTypeStyle}>
        <Text color={Colors.purple} type="semiBold" size={Fonts.size.xxxSmall}>
          {/* {_.capitalize(item.type)} */}
          {item.type === 'pickup' ? strings.PICK_UP : strings.DELIVERY}
        </Text>
      </View>
      <View
        style={[
          styles.deliveryImageWrap,
          _.isNil(item.store.image) && {
            borderWidth: 1,

            borderColor: Colors.blue3,
          },
        ]}>
        <RnImage
          source={
            _.isNil(item.store.image)
              ? Images.CosmeticItemsPic
              : {uri: item.store.image}
          }
          style={styles.deliveryImage}
        />
      </View>
      <View style={styles.deliveryNameWrap}>
        <HTMLView
          htmlContent={renderNameStringAndImageRender(item.store.name)}
          size={Fonts.size.font16}
          color={Colors.scorpion}
          type="bold"
        />
        {/* <Text size={Fonts.size.font16} color={Colors.scorpion} type="bold">
          {renderNameStringAndImageRender(item.store.name)}
        </Text> */}
      </View>
      <View style={[styles.orderCodeWrap]}>
        <View
          style={[
            util.isRTL() ? AppStyles.rowReverse : AppStyles.flexRow,
            styles.orderCodeSec,
          ]}>
          <Text style={styles.orderCodeHeadText} size={16}>
            {' '}
            {strings.ORDER_CODE} {' : '}
          </Text>
          <Text style={styles.orderCodeContentText} size={20}>{` ${
            item.id
          } `}</Text>
        </View>
      </View>

      <View style={[styles.orderCodeWrap]}>
        <View
          style={[
            util.isRTL() ? AppStyles.rowReverse : AppStyles.flexRow,
            styles.orderCodeSec,
          ]}>
          <Text style={styles.orderCodeHeadText} size={16}>
            {' '}
            {strings.REQUEST_CODE} {' : '}
          </Text>

          <Text style={styles.orderCodeContentText} size={20}>{` ${
            item.rfp_id
          } `}</Text>
        </View>
      </View>

      <View style={styles.detailsWrap}>
        <Text style={styles.detailsText}>{item.deliveryDetails}</Text>
      </View>
      <View style={styles.deliverySec}>
        <DateItem
          date={ISOToFormat(item.order_date, DATE_FORMAT2)}
          fontSize={Fonts.size.font12}
          color={Colors.grey5}
        />
        {item.status !== 'accepted' &&
          item.status !== 'user_approval_pending' &&
          item.type === 'delivery' && (
            <RnImage
              source={
                _.isNil(item.vehicle.image.color)
                  ? Images.DeliveryVanIcon
                  : {uri: item.vehicle.image.color}
              }
              resizeMode="contain"
              style={styles.deliveryIcon}
            />
          )}
      </View>
    </View>
  );
}
