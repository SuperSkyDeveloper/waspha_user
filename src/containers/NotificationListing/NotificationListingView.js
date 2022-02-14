import React from 'react';
import {View, Image as RnImage, FlatList} from 'react-native';
import {
  Text,
  CustomNavbar,
  Loader,
  NotificationListItem,
} from '../../components';
import styles from './NotificationListingStyles';
import {strings} from '../../constants';
import {Colors, AppStyles, Metrics, Fonts} from '../../theme';
import Spinner from 'react-native-loading-spinner-overlay';
export default function NotificationListingView(props) {
  const {loading, notifications} = props;
  return (
    <View style={styles.container}>
      <CustomNavbar
        title={strings.NOTIFICATIONS}
        titleColor={Colors.white}
        hasBottomRadius={true}
        showBackgroundColor={false}
      />

      <Loader loading={loading} />

      {!loading && (
        <View style={[AppStyles.mBottom50, AppStyles.mTop20]}>
          <FlatList
            data={notifications}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return <NotificationListItem item={item} />;
            }}
            ListEmptyComponent={
              <View
                style={{
                  flex: 1,
                  marginTop: Metrics.screenHeight / 3,
                  alignItems: 'center',
                }}>
                <Text
                  color={Colors.emperor}
                  type="semiBold"
                  size={Fonts.size.xLarge}>
                  {strings.NO_NOTIFICATIONS_FOUND}
                </Text>
              </View>
            }
          />
        </View>
      )}
    </View>
  );
}
