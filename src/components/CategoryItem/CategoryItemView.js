import React from 'react';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {HTMLView, Text} from '../../components';
import styles from './CategoryItemStyles';
import {Images, Fonts, Colors} from '../../theme';
import {Actions} from 'react-native-router-flux';
import util from '../../util';
import {renderNameStringAndImageRender} from '../../helpers/multilingualHelper';

export default function CategoryItemView(props) {
  const {item, storeId, categoryId, rfpVendors} = props;

  return (
    <TouchableOpacity
      style={styles.category}
      activeOpacity={0.7}
      onPress={() => {
        Actions.productListing({
          category: item,
          categoryId,
          storeId,
          rfpVendors,
        });
      }}>
      <View style={styles.overlay} />
      <View style={styles.titleWrap}>
        <HTMLView
          htmlContent={renderNameStringAndImageRender(item.name)}
          size={Fonts.size.font12}
          color={Colors.white}
          textAlign={util.isRTL() ? 'right' : 'left'}
          type="bold"
        />
        {/* <Text
          size={Fonts.size.font12}
          color={Colors.white}
          style={[styles.cetegoryTitle, util.isRTL() && {textAlign: 'right'}]}
          type="bold">
          {renderNameStringAndImageRender(item.name)}
        </Text> */}
      </View>
      <RnImage
        style={styles.categoryImg}
        source={{uri: renderNameStringAndImageRender(item.image)}}
      />
    </TouchableOpacity>
  );
}
