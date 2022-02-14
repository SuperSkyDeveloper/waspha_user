import React from 'react';
import {View, Image as RnImage} from 'react-native';
import {Text} from '../../components';
import styles from './DateItemStyles';
import {Colors, Fonts, Images, AppStyles} from '../../theme';
import util from '../../util';

export default function DateItemView(props) {
  const {date, fontSize, color} = props;
  return (
    <View
      style={[
        util.isRTL() ? AppStyles.rowReverse : AppStyles.flexRow,
        styles.dateWrap,
      ]}>
      <Text color={color} size={fontSize} type="medium">
        {date}
      </Text>
      <RnImage
        style={util.isRTL() ? AppStyles.mRight10 : AppStyles.mLeft10}
        source={Images.CalendarIcon}
      />
    </View>
  );
}
