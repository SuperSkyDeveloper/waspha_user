import React from 'react';
import _ from 'lodash';
import {
  View,
  Image as RnImage,
  ImageBackground,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Actions} from 'react-native-router-flux';

import {Text, NearByStoreItem} from '../../components';
import styles from './NearByStyles';
import {Images, Fonts, Colors, AppStyles, Metrics} from '../../theme';
import {strings} from '../../constants';
import util from '../../util';

export default function NearByView(props) {
  const {items, category, subCategory} = props;
  return (
    <View style={AppStyles.flex}>
      <StatusBar hidden={true} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={
            _.isNil(subCategory.secondary_image)
              ? Images.NearByHeader
              : {uri: subCategory.secondary_image}
          }
          style={styles.bgImage}>
          <TouchableOpacity
            onPress={() => {
              Actions.pop();
            }}
            style={[util.isRTL() && styles.backBtnWrapRTL]}>
            <RnImage source={Images.BackBtn} style={[styles.backBtn]} />
          </TouchableOpacity>
          <Text
            size={Fonts.size.font20}
            color={Colors.white}
            type="bold"
            style={
              util.isRTL()
                ? [
                    styles.nearByText,
                    {alignSelf: 'flex-end', right: 30, marginTop: 200},
                  ]
                : styles.nearByText
            }>
            {strings.NEARBY}
          </Text>
        </ImageBackground>
        <View style={styles.listingSec}>
          <FlatList
            data={items}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <View style={[AppStyles.pRight10, AppStyles.pLeft10]}>
                  <NearByStoreItem
                    category={category}
                    subCategory={subCategory}
                    item={item}
                    badge={item.has_menu}
                    badgeText={strings.MENU_OFFER}
                  />
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
