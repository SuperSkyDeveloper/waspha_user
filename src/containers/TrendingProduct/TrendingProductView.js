import React from 'react';
import {View, Image as RnImage, StatusBar, FlatList} from 'react-native';
import {Text, CustomNavbar, TrendingProductsItem} from '../../components';
import styles from './TrendingProductStyles';
import {strings} from '../../constants';
import {Colors} from '../../theme';

export default function TrendingProductView(props) {
  const {trendingProductList} = props;
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <CustomNavbar
        title={strings.TRENDING_PRODUCTS}
        titleColor={Colors.white}
        hasBottomRadius={true}
      />
      <View style={styles.wrap}>
        <FlatList
          data={trendingProductList}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return <TrendingProductsItem item={item} />;
          }}
          ListEmptyComponent={
            <Text style={styles.emptyComponent} textAlign="center">
              {strings.NO_PRODUCTS_FOUND}
            </Text>
          }
        />
      </View>
    </View>
  );
}
