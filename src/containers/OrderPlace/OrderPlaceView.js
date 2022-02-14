import React from 'react';
import _ from 'lodash';
import {
  View,
  Image as RnImage,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Picker,
} from 'react-native';
import {
  Text,
  CustomNavbar,
  DeliveryLocation,
  CategoryItem,
  AddItem,
  AccordionItem,
  Button,
  SavelocationModal,
  Calendar,
  ProposalDetailCard,
  RemoveItemModal,
  OrderItemAccordian,
} from '../../components';
import styles from './OrderPlaceStyles';
import {strings, DATE_TIME, ORDER_ITEM_TYPE} from '../../constants';
import {Colors, Fonts, Images, AppStyles} from '../../theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ISOToFormat} from '../../helpers/generalHelper';
import util from '../../util';

export default function OrderPlaceView(props) {
  const {
    category,
    subCategory,
    setValue,
    openGooglePlacesSearch,
    activeIndex,
    handleIndex,
    itemList,
    hanldeNewItemPress,
    onChangeFiled,
    openCalender,
    openBottomSheet,
    setSelectedDropDownValue,

    removeItemModal,
    getLatLngAndAddress,
    locationAddress,
    handleRemoveItem,
    loading,
    submitOrder,
    isPickup,
    isDelivery,
    loginModal,
    loginToProceed,
    showRemoveImgBtn,
  } = props;

  return (
    <View style={styles.container}>
      <CustomNavbar
        title={strings.ORDER_PLACE}
        titleColor={Colors.white}
        hasBottomRadius={true}
        showBackgroundColor={false}
      />
      {/* <ScrollView style={styles.wrap} showsVerticalScrollIndicator={false}> */}
      <KeyboardAwareScrollView
        // //keyboardShouldPersistTaps="always"
        // style={styles.container}
        style={styles.wrap}
        showsVerticalScrollIndicator={false}>
        <View style={util.isRTL() ? {alignSelf: 'flex-end'} : AppStyles.mTop20}>
          <Text
            size={Fonts.size.font18}
            color={Colors.black}
            type="semiBold"
            style={util.isRTL() && {textAlign: 'right'}}>
            {strings.PRODUCT_CATEGORY}
          </Text>

          {!util.isRTL() && (
            <Text
              style={AppStyles.alignItemsCenter}
              size={Fonts.size.font13}
              color={Colors.black}
              type="semiBold">
              {!_.isEmpty(category) &&
                !_.isEmpty(subCategory) &&
                `${category.name.en} ->  ${subCategory.name.en}`}

              {!_.isEmpty(category) &&
                _.isEmpty(subCategory) &&
                `${category.name.en} `}
            </Text>
          )}

          {util.isRTL() && (
            <Text
              style={{alignSelf: 'flex-end', marginRight: 3}}
              size={Fonts.size.font13}
              color={Colors.black}
              type="semiBold">
              {!_.isEmpty(category) &&
                !_.isEmpty(subCategory) &&
                `${category.name.ar} -> ${subCategory.name.ar} `}

              {!_.isEmpty(category) &&
                _.isEmpty(subCategory) &&
                `${category.name.ar} `}
            </Text>
          )}
        </View>

        <DeliveryLocation
          handlePress={openGooglePlacesSearch}
          isPickup={isPickup}
          touchable={!isPickup || isDelivery}
          category={category.name}
          categoryImg={category.image}
          locationAddress={locationAddress}
          getLatLngAndAddress={getLatLngAndAddress}
        />

        <View style={styles.accordinWrap}>
          <FlatList
            data={itemList}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
              const active = index === activeIndex;
              return (
                <OrderItemAccordian
                  active={active}
                  toggleAccordinPress={handleIndex}
                  data={item}
                  onChange={onChangeFiled}
                  handleRemovePrdItem={handleRemoveItem}
                  index={index}
                  itemType={ORDER_ITEM_TYPE.orderPlaceItems}
                  showRemoveImgBtn={showRemoveImgBtn}
                />
              );
            }}
          />
        </View>
        <TouchableOpacity
          onPress={hanldeNewItemPress}
          style={[
            styles.newItemWrap,
            util.isRTL() ? [AppStyles.rowReverse] : [AppStyles.flexRow],
            {alignItems: 'baseline'},
          ]}>
          <Text style={styles.newItemText} type="semiBold">
            {strings.NEW_ITEM}
          </Text>
          <View style={[styles.circularPlusStyleWrap]}>
            <RnImage
              source={Images.CircularPlusIcon}
              style={styles.circularPlusStyle}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            openBottomSheet();
          }}
          style={[
            styles.dateTimeItemWrap,
            {alignItems: 'baseline'},
            util.isRTL() ? [AppStyles.rowReverse] : [AppStyles.flexRow],
          ]}>
          <RnImage source={Images.CalendarIcon} style={styles.calendarStyle} />
          <View
            style={[
              AppStyles.flex,
              util.isRTL() ? [AppStyles.rowReverse] : [AppStyles.flexRow],
              {alignItems: 'baseline'},
            ]}>
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
          </View>
        </TouchableOpacity>

        <View style={styles.btnSec}>
          <View style={styles.submitBtnWrap}>
            <Button
              isLoading={loading}
              disabled={loading}
              color={Colors.white}
              style={[styles.submitBtn, AppStyles.shadow5]}
              textStyle={styles.submitBtnText}
              onPress={submitOrder}>
              {strings.SUBMIT}
            </Button>
          </View>
          {/* <View style={styles.submitBtnWrap}>
            <Button
              color={Colors.white}
              style={[styles.submitBtn, AppStyles.shadow5]}
              textStyle={styles.submitBtnText}
              onPress={() => setValue({openCalender: true})}>
              {strings.SCHEDULE}
            </Button>
          </View> */}
        </View>

        {openCalender && (
          <Calendar
            setSelectedDropDownValue={setSelectedDropDownValue}
            setValue={setValue}
          />
        )}

        {removeItemModal && (
          <RemoveItemModal
            isModalOpen={removeItemModal}
            closeModal={setValue}
            modalType="removeItemModal"
          />
        )}

        {loginModal && (
          <RemoveItemModal
            title={`${strings.YOU_NEED_TO_LOGIN_PROCEED} `}
            isModalOpen={loginModal}
            btnOneText={strings.OK}
            btnTwoText={strings.CANCEL}
            btnPositiveFunc={loginToProceed}
            btnNegativeFunc={() => setValue({loginModal: false})}
            closeModal={setValue}
            modalType="loginModal"
          />
        )}
      </KeyboardAwareScrollView>
    </View>
  );
}
