import React from 'react';
import _ from 'lodash';
import {View, ScrollView, FlatList} from 'react-native';
import {Text, ReviewItem, VendorHeader} from '../../components';
import styles from './VendorReviewsStyles';
import {Fonts, Colors, AppStyles, Metrics} from '../../theme';
import {strings} from '../../constants';

export default function VendorReviewsView(props) {
  const {shopReviews, loading, shopDetails} = props;
  if (loading) {
    return true;
  }
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <VendorHeader
        isReviewScreen={true}
        showRating={true}
        item={shopDetails}
      />
      {!_.isEmpty(shopReviews) ? (
        <View style={styles.ratingSec}>
          <Text
            size={Fonts.size.font30}
            color={Colors.grey}
            textAlign="center"
            type="extraBold">
            {strings.REVIEWS}
          </Text>
          <View style={styles.reviewsWrap}>
            <FlatList
              data={shopReviews}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => {
                return <ReviewItem item={item} />;
              }}
            />
          </View>
        </View>
      ) : (
        <View style={styles.noReviewsWrap}>
          <Text size={Fonts.size.xLarge} type="semiBold">
            {strings.NO_REVIEWS_AVAILABLE}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}
