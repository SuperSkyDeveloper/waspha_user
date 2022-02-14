import React from 'react';
import {View, Image as RnImage, FlatList, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  Text,
  CustomNavbar,
  DeliveryCenterCardItem,
  ChangeModeModal,
  Loader,
} from '../../components';
import styles from './DeliveryCenterStyles';
import {Colors} from '../../theme';
import {strings} from '../../constants';

export default function DeliveryCenterView(props) {
  const {
    loading,
    deliveryList,
    onRefresh,
    showChangeModeModal,
    setValue,
    itemSelected,
    isShowOneBtn,
    showOneBtn,
  } = props;
  return (
    <View style={styles.container}>
      <CustomNavbar
        title={strings.DELIVERY_AND_PICKUP}
        titleColor={Colors.white}
        hasBottomRadius={true}
      />

      {loading ? (
        <Loader loading={loading} />
      ) : (
        <View style={styles.deliveryListWrap}>
          <FlatList
            data={deliveryList}
            showsVerticalScrollIndicator={false}
            onRefresh={() => onRefresh()}
            refreshing={loading}
            renderItem={({item}) => (
              <TouchableOpacity
                activeOpacity={0.96}
                onPress={() => {
                  if (item.is_delivery_mode_changed) {
                    setValue({showChangeModeModal: true, itemSelected: item});
                    isShowOneBtn(item);
                  }
                  (item.status !== 'accepted' &&
                    item.status !== 'user_approval_pending' &&
                    item.type === 'delivery') ||
                  item.type === 'pickup'
                    ? Actions.orderstatus({deliveryId: item.id})
                    : () => {};
                }}>
                <DeliveryCenterCardItem item={item} />
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <Text style={styles.emptyComponent} textAlign="center">
                {strings.NO_ORDER_FOUNDS}
              </Text>
            }
          />
        </View>
      )}

      {showChangeModeModal && (
        <ChangeModeModal
          data={itemSelected}
          id={itemSelected.id}
          isModalOpen={showChangeModeModal}
          closeModal={setValue}
          modalType="showChangeModeModal"
          showOneBtn={showOneBtn}
          fromDeliveryCenter={true}
        />
      )}
    </View>
  );
}
