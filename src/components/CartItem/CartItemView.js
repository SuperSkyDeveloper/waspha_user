import React from 'react';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {Text, QuantityInput, HTMLView} from '../../components';
import styles from './CartItemStyles';
import {Images, Fonts, Colors, AppStyles} from '../../theme';
import {strings} from '../../constants';
import {Actions} from 'react-native-router-flux';
import {renderNameStringAndImageRender} from '../../helpers/multilingualHelper';

export default function CartItemView(props) {
  const {
    item,
    handleRemoveProduct,
    handleChangeQuantity,
    quantity,
    fromMyCart,
  } = props;

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.imgWrap}>
          <RnImage
            source={{uri: renderNameStringAndImageRender(item.image)}}
            style={styles.prdImg}
          />
        </View>
        <View style={[styles.content, AppStyles.mTop5]}>
          <HTMLView
            htmlContent={renderNameStringAndImageRender(item.title)}
            size={Fonts.size.font14}
            color={Colors.abbey2}
            textAlign="center"
          />
          {/* <Text
            size={Fonts.size.font14}
            color={Colors.abbey2}
            textAlign="center"
            type="bold">
            {renderNameStringAndImageRender(item.title)}
          </Text> */}

          <View style={[AppStyles.mTop5, AppStyles.mBottom7]}>
            <HTMLView
              htmlContent={renderNameStringAndImageRender(item.description)}
              size={Fonts.size.font9}
              color={Colors.shark}
              textAlign="center"
              type="medium"
            />
          </View>
          {/* <Text
            size={Fonts.size.font9}
            color={Colors.shark}
            textAlign="center"
            type="medium">
            {renderNameStringAndImageRender(item.description)}
          </Text> */}
          <QuantityInput
            fromMyCart={fromMyCart}
            handleChangeQuantity={handleChangeQuantity}
            incomingQuantity={quantity}
          />
          <TouchableOpacity
            style={[{marginTop: 12, marginBottom: 8}, styles.underline]}
            onPress={() => {
              Actions.additionalNote({item: item});
            }}>
            <Text
              size={Fonts.size.xxxxSmall}
              color={Colors.dodgerBlue}
              type="bold">
              {strings.ADDITIONAL_NOTES}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          handleRemoveProduct(item.id);
        }}
        style={styles.closeWrap}
        activeOpacity={0.7}>
        <RnImage source={Images.CloseIcon} />
      </TouchableOpacity>
    </View>
  );
}
