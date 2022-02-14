import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';

import {HTMLView, Text} from '..';
import {strings, PROMO_TYPES} from '../../constants';
import {AppStyles, Colors, Fonts, Metrics} from '../../theme';
import styles from './FeatureModalStyles';
import {renderNameStringAndImageRender} from '../../helpers/multilingualHelper';
export default function FeatureModalView(props) {
  const {
    isModalOpen,

    closeModal,
    modalType,
    item,
    backPress,
  } = props;

  let data = {...item};
  return (
    <View style={styles.container}>
      <Modal
        isVisible={isModalOpen}
        style={styles.modal}
        onBackButtonPress={() => {
          backPress ? () => {} : closeModal({[modalType]: false});
        }}
        onBackdropPress={() => {
          backPress ? () => {} : closeModal({[modalType]: false});
        }}
        backdropOpacity={0.8}
        backdropColor={Colors.white}
        style={styles.imageSelectorWrapper}>
        <LinearGradient
          start={{x: 0.0, y: 0.8}}
          end={{x: 0.0, y: -0.3}}
          colors={[Colors.resolutionBlue, Colors.red2]}
          style={styles.linearWrap}>
          <Text
            color={Colors.white}
            size={Fonts.size.xLarge}
            type="semiBold"
            style={{
              textAlign: 'center',
              marginBottom: Metrics.mediumBaseMargin,
            }}>
            {`${strings.PROMOTIONS} `}
          </Text>
          <View>
            {!_.isNil(data.menu_promotion) &&
              data.menu_promotion.type === PROMO_TYPES.DISCOUNT && (
                <View
                  style={[
                    AppStyles.flexRow,
                    AppStyles.centerInner,
                    AppStyles.spaceBetween,
                  ]}>
                  <Text color={Colors.white}>{strings.DISCOUNT}</Text>
                  <Text color={Colors.white}>
                    {data.menu_promotion.extra_data.discount}%
                  </Text>
                </View>
              )}

            {!_.isNil(data.menu_promotion) &&
              data.menu_promotion.type === PROMO_TYPES.GIFT_PRODUCT && (
                <View
                  style={[
                    AppStyles.flexRow,
                    AppStyles.centerInner,
                    AppStyles.spaceBetween,
                  ]}>
                  <Text color={Colors.white}>{strings.GIFT_PRODUCT}</Text>
                  <Text color={Colors.white}>
                    {renderNameStringAndImageRender(
                      data.menu_promotion.extra_data.product_name,
                    )}
                  </Text>
                </View>
              )}

            {!_.isNil(data.menu_promotion) &&
              data.menu_promotion.type === PROMO_TYPES.BUY_1_GET_1 && (
                <View
                  style={[
                    [AppStyles.flexRow, AppStyles.spaceBetween],
                    {alignSelf: 'center'},
                  ]}>
                  <Text color={Colors.white}>{strings.BUY_1_GET_1} !!!</Text>
                </View>
              )}

            {!_.isNil(data.menu_promotion) &&
              !_.isNil(data.menu_promotion.description) && (
                <View style={[AppStyles.mTop35]}>
                  <Text
                    size={Fonts.size.medium}
                    color={Colors.white}
                    type="semiBold"
                    style={AppStyles.mBottom10}>{`${
                    strings.DESCRIPTION
                  } :`}</Text>

                  {/* <Text color={Colors.white}>
                    {data.menu_promotion.description}
                  </Text> */}
                  <HTMLView
                    htmlContent={data.menu_promotion.description}
                    color={Colors.white}
                  />
                </View>
              )}
          </View>
        </LinearGradient>
      </Modal>
    </View>
  );
}
