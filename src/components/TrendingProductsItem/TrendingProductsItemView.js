import React from 'react';
import {View, Image as RnImage} from 'react-native';
import {Text, QuantityInput, HTMLView} from '../../components';
import styles from './TrendingProductsItemStyles';
import {Images, Fonts, Colors, AppStyles} from '../../theme';
import LinearGradient from 'react-native-linear-gradient';
import {strings} from '../../constants';
import util from '../../util';
import {renderNameStringAndImageRender} from '../../helpers/multilingualHelper';

export default function TrendingProductsItemView(props) {
  const {item, handleChangeQuantity, quantity, horizontal} = props;

  return (
    <View
      style={[
        horizontal ? styles.horizontalWrp : styles.trendingWrp,
        styles.shadowStyle,
      ]}>
      {/* {item.isOpen && (
        <View style={styles.openBadge}>
          <Text color={Colors.emerald} size={Fonts.size.font8} type="bold">
            {strings.OPEN}
          </Text>
        </View>
      )}
      <View style={styles.ratingBadge}>
        <RnImage source={Images.StarIcon} style={styles.starImg} />
        <Text color={Colors.portGore} size={Fonts.size.font8} type="bold">
          {item.rating}
        </Text>
      </View> */}
      <RnImage
        source={{uri: renderNameStringAndImageRender(item.image)}}
        style={styles.trendImg}
      />
      <View
        style={[
          util.isRTL() ? AppStyles.rowReverse : AppStyles.flexRow,
          styles.infoSec,
        ]}>
        <View
          style={[
            util.isRTL() ? AppStyles.rowReverse : AppStyles.flexRow,
            styles.leftSec,
          ]}>
          <View>
            <HTMLView
              htmlContent={renderNameStringAndImageRender(item.title)}
              size={Fonts.size.font14}
              color={Colors.fiord}
              type="semiBold"
              numberOfLines={2}
              ellipsizeMode="tail"
            />
            {/* <Text
              style={[styles.leftTextStyle]}
              numberOfLines={1}
              ellipsizeMode="tail"
              color={Colors.fiord}
              size={Fonts.size.font14}
              type="semiBold">
              {renderNameStringAndImageRender(item.title)}
            </Text> */}
            <HTMLView
              htmlContent={renderNameStringAndImageRender(item.description)}
              size={Fonts.size.font8}
              color={Colors.hurricane}
              numberOfLines={2}
              textAlign={util.isRTL() ? 'right' : 'left'}
              ellipsizeMode="tail"
            />
            {/* <Text
              style={[
                styles.leftTextStyle,
                {textAlign: util.isRTL() ? 'right' : 'left'},
              ]}
              numberOfLines={2}
              ellipsizeMode="tail"
              color={Colors.hurricane}
              size={Fonts.size.font8}>
              {renderNameStringAndImageRender(item.description)}
            </Text> */}
          </View>
          <View>
            <QuantityInput
              itemId={item.id}
              handleChangeQuantity={handleChangeQuantity}
              incomingQuantity={quantity}
              fromStore={true}
            />
          </View>
          {/* <LinearGradient
            start={{x: 0.4, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#ff8c48', '#ff5673']}
            style={styles.badge1}>
            <Text color={Colors.white} size={Fonts.size.font8} type="medium">
              {item.country}
            </Text>
          </LinearGradient>
          <View style={styles.badge2}>
            <Text color={Colors.white} size={Fonts.size.font8} type="medium">
              {item.distance}
            </Text>
          </View> */}
        </View>
        {/* <View style={styles.imgWrap}>
          <View style={styles.peoplesImgWrap}>
            <RnImage
              style={styles.peoplesImg}
              source={Images.ProfilePlaceholder}
            />
          </View>
          <View style={styles.peoplesImgWrap}>
            <RnImage
              style={styles.peoplesImg}
              source={Images.ProfilePlaceholder}
            />
          </View>
          <View style={styles.peoplesImgWrap}>
            <RnImage
              style={styles.peoplesImg}
              source={Images.ProfilePlaceholder}
            />
          </View>
        </View> */}
      </View>
    </View>
  );
}
