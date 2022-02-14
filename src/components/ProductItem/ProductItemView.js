import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {Text, QuantityInput, FeatureModal, HTMLView} from '../../components';
import styles from './ProductItemStyles';
import {Images, Fonts, Colors, AppStyles, Metrics} from '../../theme';
import {strings} from '../../constants';
import {Actions} from 'react-native-router-flux';
import util from '../../util';
import CountDown from 'react-native-countdown-component';
import {renderNameStringAndImageRender} from '../../helpers/multilingualHelper';

export default function ProductItemView(props) {
  const {
    item,
    handleChangeQuantity,
    quantity,
    setValue,
    isFeatureModal,
    expiryDuration,
  } = props;

  return (
    <>
      <View
        style={[
          util.isRTL() ? [AppStyles.rowReverse] : [AppStyles.flexRow],
          styles.product,
        ]}>
        <View style={[styles.productImgWrap]}>
          <RnImage
            style={styles.productImg}
            source={{uri: renderNameStringAndImageRender(item.image)}}
          />
        </View>
        <View
          style={[
            util.isRTL() ? [AppStyles.rowReverse] : [AppStyles.flexRow],
            styles.rightWrap,
          ]}>
          <View
            style={[
              styles.mT10,
              AppStyles.mLeft30,
              util.isRTL() ? AppStyles.mRight15 : AppStyles.mRight5,
              AppStyles.flex,
            ]}>
            <HTMLView
              htmlContent={renderNameStringAndImageRender(item.title)}
              size={Fonts.size.font14}
              color={Colors.shark}
              textAlign={util.isRTL() ? 'right' : 'left'}
              type="bold"
            />
            {/* <Text
              style={util.isRTL() && {textAlign: 'right'}}
              color={Colors.shark}
              size={Fonts.size.font14}
              type="bold">
              {renderNameStringAndImageRender(item.title)}
            </Text> */}
            <View style={[AppStyles.mTop5]}>
              <HTMLView
                htmlContent={renderNameStringAndImageRender(item.description)}
                size={Fonts.size.font11}
                color={Colors.dustyGray}
                textAlign={util.isRTL() ? 'right' : 'left'}
                type="medium"
              />
            </View>

            {/* <Text
              style={[AppStyles.mTop5, util.isRTL() && {textAlign: 'right'}]}
              color={Colors.dustyGray}
              size={Fonts.size.font11}
              type="medium">
              {renderNameStringAndImageRender(item.description)}
            </Text> */}
          </View>
          <QuantityInput
            itemId={item.id}
            handleChangeQuantity={handleChangeQuantity}
            incomingQuantity={quantity}
            fromStore={true}
          />
          <View
            style={{
              zIndex: 99999,
              right: 0,
              top: 42,
              position: 'absolute',
            }}>
            {!_.isNil(expiryDuration) && expiryDuration > 0 && (
              <View>
                <CountDown
                  until={expiryDuration}
                  //duration of countdown in seconds
                  timetoShow={['D', 'H', 'M', 'S']}
                  //formate to show
                  // onFinish={() => alert('finished')}
                  //on Finish call
                  digitStyle={{backgroundColor: Colors.red}}
                  digitTxtStyle={{color: Colors.white}}
                  timeLabels={{
                    d: 'Days',
                    h: 'Hours',
                    m: 'Mins',
                    s: 'Secs',
                  }}
                  timeLabelStyle={{
                    color: Colors.red,
                    fontWeight: 'bold',

                    fontSize: 8,
                    paddingRight: 4,
                  }}
                  //on Press call
                  size={7}
                />
              </View>
            )}
          </View>
        </View>
        {item.is_featured && !_.isNil(expiryDuration) && expiryDuration > 0 && (
          <TouchableOpacity
            onPress={() => setValue({isFeatureModal: true})}
            style={[styles.badge, {paddingVertical: Metrics.xsmallMargin}]}>
            <View style={styles.dot} />
            <Text size={Fonts.size.font7} color={Colors.white} type="bold">
              {strings.FEATURED}
            </Text>
          </TouchableOpacity>
        )}

        {isFeatureModal && (
          <FeatureModal
            isModalOpen={isFeatureModal}
            closeModal={setValue}
            modalType="isFeatureModal"
            item={item}
          />
        )}
      </View>
    </>
  );
}
