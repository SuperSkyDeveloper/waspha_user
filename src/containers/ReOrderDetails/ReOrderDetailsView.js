import React from 'react';
import _ from 'lodash';
import {
  View,
  Image as RnImage,
  ScrollView,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import {
  Text,
  CustomNavbar,
  AccordionItem,
  DeliveryLocation,
  DateItem,
  OrderItemAccordian,
  Button,
  Calendar,
  Loader,
} from '../../components';
import styles from './ReOrderDetailsStyles';
import {
  strings,
  DATE_FORMAT2,
  ORDER_ITEM_TYPE,
  DATE_TIME,
} from '../../constants';
import {Colors, Fonts, Images, AppStyles} from '../../theme';
import util from '../../util';
import {ISOToFormat} from '../../helpers/generalHelper';
import {renderNameStringAndImageRender} from '../../helpers/multilingualHelper';

export default function ReOrderDetailsView(props) {
  const {
    activeIndex,
    handleIndex,
    itemDetails,
    loading,
    itemList,
    onChangeFiled,
    openCalender,
    setSelectedDropDownValue,
    openBottomSheet,
    setValue,
    submitOrder,
    submitLoader,
    openGooglePlacesSearch,
    locationAddress,
    getLatLngAndAddress,
    isPickup,
    isDelivery,
  } = props;
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <CustomNavbar
        title={strings.ORDER_DETAILS_1}
        titleColor={Colors.white}
        hasBottomRadius={true}
        showBackgroundColor={false}
      />
      {/* <Spinner
        visible={loading || _.isEmpty(itemDetails)}
        color={Colors.green}
      /> */}
      <Loader loading={loading || _.isEmpty(itemDetails)} />
      {!loading && !_.isEmpty(itemDetails) && (
        <ScrollView style={styles.wrap} showsVerticalScrollIndicator={false}>
          {/*productRow start*/}
          <View
            style={[
              util.isRTL() ? AppStyles.rowReverse : AppStyles.flexRow,
              styles.productRow,
            ]}>
            <View style={styles.leftCol}>
              <Text
                size={Fonts.size.font20}
                color={Colors.black}
                type="semiBold">
                {strings.PRODUCT_CATEGORY}
              </Text>
              <Text
                style={
                  (AppStyles.alignItemsCenter,
                  util.isRTL() && {textAlign: 'right'})
                }
                size={Fonts.size.font15}
                color={Colors.black}
                type="medium">
                {/* {util.isRTL()
                  ? itemDetails.category.name.ar
                  : itemDetails.category.name.en} */}
                {renderNameStringAndImageRender(itemDetails.category.name)}

                {/* {'->'} {itemDetails.subcategory.name} */}
              </Text>
            </View>
            <View style={styles.rightCol}>
              <DateItem
                date={util.getFormattedDateTime(
                  itemDetails.order_date,
                  DATE_FORMAT2,
                )}
                fontSize={Fonts.size.font12}
                color={Colors.black}
              />
            </View>
          </View>
          {/* productRow end */}
          {/*  */}

          <DeliveryLocation
            category={itemDetails.category.name}
            categoryImg={itemDetails.category.image}
            locationAddress={locationAddress}
            handlePress={openGooglePlacesSearch}
            isPickup={isPickup}
            touchable={!isPickup || isDelivery}
            getLatLngAndAddress={getLatLngAndAddress}
          />

          {/*  */}
          {/*  */}

          <View style={[AppStyles.flex, AppStyles.mTop10]}>
            <FlatList
              data={itemList}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => {
                const active = index === activeIndex;
                return (
                  <OrderItemAccordian
                    active={active}
                    toggleAccordinPress={handleIndex}
                    data={item}
                    index={index}
                    onChange={onChangeFiled}
                    itemType={ORDER_ITEM_TYPE.createProposalForNewItems}
                  />
                );
              }}
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              openBottomSheet();
            }}
            style={[
              styles.dateTimeItemWrap,
              util.isRTL() ? [AppStyles.rowReverse] : [AppStyles.flexRow],
            ]}>
            <RnImage
              source={Images.CalendarIcon}
              style={styles.calendarStyle}
            />
            <Text
              style={[
                styles.dateTimeText,
                util.isRTL() && {
                  textAlign: 'right',
                  marginRight: 10,
                },
              ]}
              type="semiBold">
              {props.selectedValueOfDropdown == strings.NOW
                ? strings.NOW
                : props.selectedValueOfDropdown == strings.SCHEDULE
                ? strings.SCHEDULE
                : ISOToFormat(props.selectedValueOfDropdown, DATE_TIME)}
            </Text>
            <RnImage
              source={Images.DownArrowIcon}
              style={styles.dropDownArrowStyle}
            />
          </TouchableOpacity>

          <View style={styles.subBtnWrap}>
            <Button
              color={Colors.white}
              background={Colors.resolutionBlue}
              style={styles.loginBtn}
              size={Fonts.size.font17}
              onPress={submitOrder}
              isLoading={submitLoader}
              disabled={submitLoader}
              indicatorColor={Colors.white}
              type="semiBold">
              {strings.RE_ORDER}
            </Button>
          </View>

          {/*  */}
        </ScrollView>
      )}

      {openCalender && (
        <Calendar
          setSelectedDropDownValue={setSelectedDropDownValue}
          setValue={setValue}
        />
      )}
    </View>
  );
}
