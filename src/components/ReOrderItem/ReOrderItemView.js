import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {Text, HTMLView} from '..';
import styles from './ReOrderItemStyles';
import {AppStyles, Colors, Fonts} from '../../theme';
import {Actions} from 'react-native-router-flux';
import {ISOToFormat} from '../../helpers/generalHelper';
import {DATE_FORMAT2, strings} from '../../constants';
import util from '../../util';
export default function ReOrderItemView(props) {
  const {item, rfpVendors, user} = props;
  return (
    <TouchableOpacity
      onPress={() =>
        Actions.reOrderDetails({proposalId: item.proposal_id, rfpVendors})
      }
      style={[
        util.isRTL() ? AppStyles.rowReverse : AppStyles.flexRow,
        styles.product,
      ]}>
      <View
        style={[
          util.isRTL() ? AppStyles.rowReverse : AppStyles.flexRow,
          styles.rightWrap,
        ]}>
        <View
          style={[
            util.isRTL() ? AppStyles.mRight30 : AppStyles.mLeft30,
            util.isRTL() ? AppStyles.mLeft5 : AppStyles.mRight5,
            AppStyles.flex,
          ]}>
          <View
            style={[
              {
                top: 10,
                alignItems: util.isRTL() ? 'flex-end' : 'flex-start',
              },
            ]}>
            <View
              style={[util.isRTL() ? AppStyles.rowReverse : AppStyles.flexRow]}>
              <Text
                color={Colors.shark}
                size={Fonts.size.xxxSmall}
                type="semiBold">
                {`${strings.ORDER_DATE} : `}
              </Text>
              <Text
                color={Colors.shark}
                size={Fonts.size.xxxSmall}
                type="semiBold">
                {`${ISOToFormat(item.order_date, DATE_FORMAT2)}`}
              </Text>
            </View>

            <View style={{top: 7}}>
              <HTMLView
                htmlContent={item.description}
                color={Colors.dustyGray}
                size={Fonts.size.font11}
                type="medium"
                textAlign={util.isRTL() ? 'right' : 'left'}
              />
              {/* <Text
                style={AppStyles.mTop5}
                color={Colors.dustyGray}
                size={Fonts.size.font11}
                type="medium">
                {item.description}
              </Text> */}
            </View>
          </View>
          <View
            style={{
              alignItems: util.isRTL() ? 'flex-start' : 'flex-end',
              top: -14,
            }}>
            {!_.isNil(item.type) && (
              <View>
                <Text
                  color={Colors.purple}
                  type="semiBold"
                  size={Fonts.size.xxxxSmall}>
                  {item.type}
                </Text>
              </View>
            )}
            {!_.isNil(item.total_amount) && (
              <Text color={Colors.shark} size={Fonts.size.font14} type="bold">
                {`${
                  _.isNil(user.currency_code) ? 'ESP' : user.currency_code
                } ${item.total_amount.toFixed(2)}`}
              </Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
