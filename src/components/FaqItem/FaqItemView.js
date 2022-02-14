import React from 'react';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {Text} from '..';
import styles from './FaqItemStyles';
import {Metrics, Images, Colors, Fonts, AppStyles} from '../../theme';
import util from '../../util';
export default function FaqItemView(props) {
  const {item, toggler, active} = props;
  return (
    <View>
      <TouchableOpacity
        onPress={() => toggler(item.id)}
        style={[
          util.isRTL() ? AppStyles.rowReverse : AppStyles.flexRow,
          styles.spacing,
        ]}>
        <View style={[util.isRTL() ? AppStyles.rowReverse : AppStyles.flexRow]}>
          <Text style={styles.idTextStyle} type="semiBold">{`${
            util.isRTL() ? ` .${item.id}` : `${item.id}.`
          } `}</Text>

          <Text
            style={[
              styles.questionText,
              util.isRTL()
                ? {marginRight: Metrics.smallMargin, textAlign: 'right'}
                : {marginLeft: Metrics.smallMargin},
            ]}
            type="semiBold">
            {item.title}
          </Text>
        </View>
        <View style={{justifyContent: 'flex-end'}}>
          <RnImage
            source={Images.Icon2}
            style={[
              !active && styles.iconStyle,
              styles.icon,
              util.isRTL()
                ? {marginRight: Metrics.smallMargin}
                : {marginLeft: Metrics.smallMargin},
            ]}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.hLine} />
      {active && (
        <>
          <View
            style={[
              util.isRTL()
                ? {
                    paddingRight: Metrics.mediumBaseMargin,
                    paddingLeft: Metrics.smallMargin,
                  }
                : {
                    paddingLeft: Metrics.mediumBaseMargin,
                    paddingRight: Metrics.smallMargin,
                  },
              styles.descText,
            ]}>
            <Text
              style={util.isRTL() && {textAlign: 'right'}}
              size={Fonts.size.xxSmall}
              type="semiBold"
              color={Colors.grey11}>
              {item.description}
            </Text>
          </View>
          <View style={styles.hLine} />
        </>
      )}
    </View>
  );
}
