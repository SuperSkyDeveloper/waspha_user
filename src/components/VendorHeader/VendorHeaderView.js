import React from 'react';
import _ from 'lodash';
import {
  View,
  Image as RnImage,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {Actions} from 'react-native-router-flux';
import {HTMLView, StarRating, Text} from '../../components';
import styles from './VendorHeaderStyles';
import {Images, Colors, Fonts, AppStyles, Metrics} from '../../theme';
import {strings} from '../../constants';
import util from '../../util';
import {renderNameStringAndImageRender} from '../../helpers/multilingualHelper';

export default function VendorHeaderView(props) {
  const {
    showRating,
    showBtn,
    isReviewScreen,

    item,
  } = props;
  return (
    <ImageBackground
      source={Images.ReviewBg}
      style={[isReviewScreen ? styles.reviewHeader : styles.header]}>
      <TouchableOpacity
        onPress={() => {
          Actions.pop();
        }}
        style={[
          styles.backBtnWrap,
          util.isRTL() && {
            position: 'absolute',
            right: 13,
            paddingHorizontal: Metrics.doubleBaseMargin,
            top: 30,
            transform: [{rotate: '180deg'}],
          },
        ]}>
        <View style={styles.backWrap}>
          <RnImage source={Images.BackBtn} />
        </View>
      </TouchableOpacity>
      <View style={styles.wraper}>
        <RnImage
          style={styles.image}
          source={
            _.isNil(item.image) ? Images.ProfilePlaceholder : {uri: item.image}
          }
        />
        {/* <Text size={Fonts.size.font20} color={Colors.white} type="extraBold">
          {renderNameStringAndImageRender(item.business_name)}
        </Text> */}
        <HTMLView
          size={Fonts.size.font20}
          color={Colors.white}
          type="extraBold"
          htmlContent={renderNameStringAndImageRender(item.business_name)}
        />

        {showRating && (
          <View style={[AppStyles.flexRow, styles.providerRatingWrap]}>
            {/* <AirbnbRating
              count={5}
              defaultRating={item.average_rating}
              size={25}
              showRating={false}
              isDisabled={true}
            /> */}
            <StarRating
              initialRating={item.average_rating}
              readonly={true}
              imageSize={25}
            />
          </View>
        )}
      </View>
      {showBtn && (
        <LinearGradient
          start={{x: 0, y: 1}}
          end={{x: 0, y: 0}}
          colors={['#39475A', '#6c7a8c']}
          style={[
            styles.companySec,
            util.isRTL() ? AppStyles.flexRow : AppStyles.rowReverse,
          ]}>
          <TouchableOpacity
            style={[!util.isRTL() && styles.col, styles.pVertical]}
            onPress={() => Actions.companyPolicy({shopId: item.id})}>
            <Text size={Fonts.size.font13} color={Colors.white} type="semiBold">
              {strings.COMPANY_POLICY}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[util.isRTL() && styles.col, styles.pVertical]}
            onPress={() => Actions.vendorReviews({shopDetails: item})}>
            <Text size={Fonts.size.font13} color={Colors.white} type="semiBold">
              {strings.VIEW_REVIEWS}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      )}
    </ImageBackground>
  );
}
