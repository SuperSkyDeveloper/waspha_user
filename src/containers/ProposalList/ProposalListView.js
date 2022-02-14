import React from 'react';
import _ from 'lodash';
import {
  View,
  Image as RnImage,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';
import {Text, ProposalListItem, Loader} from '../../components';
import styles from './ProposalListStyles';
import {Images, Fonts, Colors, AppStyles, Metrics} from '../../theme';
import {strings} from '../../constants';
import util from '../../util';

export default function ProposalListView(props) {
  const {proposals, loading, order, fromPastRFP, proposalDetails} = props;

  return !loading ? (
    <ImageBackground source={Images.ProposalBg} style={styles.container}>
      <ScrollView contentContainerStyle={AppStyles.pTop25}>
        <TouchableOpacity
          onPress={() => {
            Actions.pop();
          }}
          style={
            util.isRTL() && {
              padding: 30,
            }
          }>
          <RnImage
            source={Images.BackBtn}
            style={[util.isRTL() ? styles.backBtnRTL : styles.backBtn]}
          />
        </TouchableOpacity>
        <View
          style={[
            AppStyles.paddingHorizontalBase,
            AppStyles.mBottom35,
            util.isRTL() && {alignSelf: 'flex-end'},
          ]}>
          <Text
            size={Fonts.size.font23}
            color={Colors.white}
            type="semiBold"
            style={util.isRTL() && {textAlign: 'right'}}>
            {_.isNil(order)
              ? util.isRTL()
                ? proposalDetails.category.name.ar
                : proposalDetails.category.name.en
              : util.isRTL()
              ? order.category.name.ar
              : order.category.name.en}
          </Text>
          <Text
            size={Fonts.size.font23}
            color={Colors.white}
            type="medium"
            style={util.isRTL() && {textAlign: 'right'}}>
            {strings.PROPOSAL}
          </Text>
        </View>

        <View
          style={[
            AppStyles.mBottom50,
            util.isRTL() && {alignSelf: 'flex-end', marginLeft: 7},
          ]}>
          <FlatList
            inverted={util.isRTL()}
            scrollEnabled={proposals.length > 1 ? true : false}
            nestedScrollEnabled
            data={proposals}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <View>
                  <ProposalListItem
                    item={item}
                    fromPastRFP={fromPastRFP}
                    isFirstItem={util.isFirstItem(index)}
                  />
                </View>
              );
            }}
            ListEmptyComponent={
              <Text
                style={AppStyles.mTop30}
                color={Colors.white}
                textAlign="center">
                {strings.NO_PRODUCTS_FOUND}
              </Text>
            }
          />
        </View>
      </ScrollView>
    </ImageBackground>
  ) : (
    <Loader loading={loading} />
  );
}
