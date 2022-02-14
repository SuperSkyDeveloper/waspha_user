import React from 'react';
import {View, Image as RnImage, StatusBar, FlatList} from 'react-native';
import {Text, CustomNavbar, ReOrderItem, Loader} from '../../components';
import styles from './ReOrderStyles';
import {strings} from '../../constants';
import {Colors, AppStyles} from '../../theme';
import Spinner from 'react-native-loading-spinner-overlay';
export default function ReOrderView(props) {
  const {reOrderList, rfpVendors, loading} = props;
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <CustomNavbar
        title={strings.RE_ORDER_LIST}
        titleColor={Colors.white}
        hasBottomRadius={true}
      />

      {/* <Spinner visible={loading} color={Colors.green} /> */}
      <Loader loading={loading} />
      <View style={AppStyles.mTop25}>
        <FlatList
          data={reOrderList}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return <ReOrderItem item={item} rfpVendors={rfpVendors} />;
          }}
        />
      </View>
    </View>
  );
}
