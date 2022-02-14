import React from 'react';
import {
  View,
  Image as RnImage,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Text, CustomNavbar, PromoCodeItem, Loader} from '../../components';
import styles from './PromoCodeStyles';
import {AppStyles, Colors} from '../../theme';
import {strings} from '../../constants';
export default function PromoCodeView(props) {
  const {loading, promos, setValue, initial} = props;
  return (
    <View style={styles.container}>
      <CustomNavbar
        title={strings.PROMO_CODES}
        titleColor={Colors.white}
        hasBottomRadius={true}
      />
      <View style={[AppStyles.flex]}>
        {loading && <Loader loading={loading} />}
        {!loading && (
          <FlatList
            data={promos}
            showsVerticalScrollIndicator={false}
            onRefresh={() => {
              setValue({loading: true});
              initial();
            }}
            refreshing={loading}
            renderItem={({item}) => {
              return <PromoCodeItem item={item} />;
            }}
            ListEmptyComponent={
              <Text style={AppStyles.mTop30} textAlign="center">
                {strings.NO_PROMO_CODES_FOUND}
              </Text>
            }
          />
        )}
      </View>
    </View>
  );
}
