import React from 'react';
import {
  View,
  Image as RnImage,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  Text,
  OrderListingItem,
  RemoveItemModal,
  Loader,
} from '../../components';
import styles from './OrderAndProposalStyles';
import {Fonts, Colors, Images, AppStyles} from '../../theme';
import {strings, ORDER_STATUS} from '../../constants';
import util from '../../util';

export default function OrderAndProposalView(props) {
  const {
    activeTabIndex,
    handleTabIndex,
    currentRFPs,
    upcomingRFPs,
    pastRFPs,
    loading,
    getTabData,
    removeRFPModal,
    handleRemoveItem,
    setValue,
    rejectRFP,
  } = props;

  return (
    <View style={AppStyles.flex}>
      <StatusBar hidden={true} />
      <View style={styles.container}>
        {/* header start */}
        <LinearGradient
          start={{x: 0, y: 2.1}}
          end={{x: 3, y: 0}}
          colors={[Colors.resolutionBlue, Colors.violetRed]}
          style={styles.header}>
          <TouchableOpacity
            style={util.isRTL() ? styles.backWrapRTL : styles.backWrap}
            onPress={() => {
              Actions.pop();
            }}>
            <RnImage source={Images.BackBtn} />
          </TouchableOpacity>
          <Text
            size={Fonts.size.font21}
            color={Colors.white}
            type="bold"
            textAlign="center">
            {strings.ORDER_AND_PROPOSAL}
          </Text>
          <View style={styles.tabSec}>
            {util.TAB_LIST().map((item, index) => {
              const active = index === activeTabIndex;
              return (
                <TouchableOpacity
                  style={[styles.tabWrap, active && styles.active]}
                  onPress={() => {
                    handleTabIndex(index);
                  }}>
                  <Text
                    size={Fonts.size.font14}
                    color={Colors.white}
                    type="medium"
                    style={active && styles.opacity}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </LinearGradient>

        <Loader loading={loading} />

        {!loading && (
          <View style={styles.content}>
            {activeTabIndex === 0 && (
              <FlatList
                data={currentRFPs}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                onRefresh={() => getTabData(ORDER_STATUS.CURRENT)}
                refreshing={loading}
                renderItem={({item}) => {
                  return (
                    <OrderListingItem
                      item={item}
                      handleRemoveItem={handleRemoveItem}
                    />
                  );
                }}
                ListEmptyComponent={
                  <Text style={AppStyles.mTop30} textAlign="center">
                    {strings.NO_ORDER_FOUNDS}
                  </Text>
                }
              />
            )}
            {activeTabIndex === 1 && (
              <FlatList
                data={upcomingRFPs}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                onRefresh={() => getTabData(ORDER_STATUS.UPCOMING)}
                refreshing={loading}
                renderItem={({item}) => {
                  return (
                    <OrderListingItem
                      item={item}
                      handleRemoveItem={handleRemoveItem}
                      showTimer={true}
                    />
                  );
                }}
                ListEmptyComponent={
                  <Text style={AppStyles.mTop30} textAlign="center">
                    {strings.NO_ORDER_FOUNDS}
                  </Text>
                }
              />
            )}
            {activeTabIndex === 2 && (
              <FlatList
                data={pastRFPs}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                onRefresh={() => getTabData(ORDER_STATUS.PAST)}
                refreshing={loading}
                renderItem={({item}) => {
                  return (
                    <OrderListingItem
                      item={item}
                      handleRemoveItem={handleRemoveItem}
                    />
                  );
                }}
                ListEmptyComponent={
                  <Text style={AppStyles.mTop30} textAlign="center">
                    {strings.NO_ORDER_FOUNDS}
                  </Text>
                }
              />
            )}
          </View>
        )}
        {/* header end */}
      </View>

      {removeRFPModal && (
        <RemoveItemModal
          title={`${strings.ARE_YOU_SURE_TO_DELETE_ORDER} ${
            util.isRTL() ? '؟' : '?'
          }`}
          btnOneText={util.renderStrings().YES}
          btnTwoText={util.renderStrings().NO}
          isModalOpen={removeRFPModal}
          btnPositiveFunc={rejectRFP}
          btnNegativeFunc={() => setValue({removeRFPModal: false})}
          closeModal={setValue}
          modalType="removeRFPModal"
        />
      )}
    </View>
  );
}
