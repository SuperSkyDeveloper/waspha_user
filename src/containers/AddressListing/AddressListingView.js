import React from 'react';
import {View, Image as RnImage, FlatList} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  Text,
  CustomNavbar,
  AddressListItem,
  Fab,
  RemoveItemModal,
  Loader,
} from '../../components';
import styles from './AddressListingStyles';
import {Colors, Fonts, Metrics} from '../../theme';
import {strings} from '../../constants';
import {Actions} from 'react-native-router-flux';
import util from '../../util';
export default function AddressListingView(props) {
  const {
    myLocations,
    removeLocation,
    loading,
    removeAddressModal,
    openRemoveAddressModal,
    setValue,
  } = props;
  return (
    <View style={styles.container}>
      {/* <Spinner visible={loading} color={Colors.green} /> */}
      <Loader loading={loading} />
      <CustomNavbar title={strings.MY_ADDRESS} titleColor={Colors.white} />
      <View style={styles.list}>
        <FlatList
          data={myLocations}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <AddressListItem
                item={item}
                openRemoveAddressModal={openRemoveAddressModal}
              />
            );
          }}
          ListEmptyComponent={
            <View
              style={{
                height: Metrics.screenHeight / 1.6,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text size={Fonts.size.large} type="medium" textAlign="center">
                {strings.NO_SAVED_LOCATIONS_FOUND}
              </Text>
            </View>
          }
        />
      </View>
      <Fab
        onPress={() => {
          Actions.myaddress();
        }}
      />

      {removeAddressModal && (
        <RemoveItemModal
          title={`${strings.ARE_YOU_SURE_TO_DELETE_ADDRESS} ${
            util.isRTL() ? '؟' : '?'
          }`}
          btnOneText={util.renderStrings().YES}
          btnTwoText={util.renderStrings().NO}
          isModalOpen={removeAddressModal}
          btnPositiveFunc={removeLocation}
          btnNegativeFunc={() => setValue({removeAddressModal: false})}
          closeModal={setValue}
          modalType="removeAddressModal"
        />
      )}
    </View>
  );
}
