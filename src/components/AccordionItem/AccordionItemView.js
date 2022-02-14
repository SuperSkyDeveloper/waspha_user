import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {Text, QuantityInput, TextInput, ImagePicker} from '../../components';
import styles from './AccordionItemStyles';
import {Fonts, Colors, Images, AppStyles, Metrics} from '../../theme';
import {strings, inputFieldsLimit} from '../../constants';

export default function AccordionItemView(props) {
  const {
    item,
    active,
    togglePress,
    index,
    isProposalDetail,
    itemRemovePress,
    comment,
    handleImagePress,
    editAble,
    onChangeFiled,
    openImagePickerModal,
    closeImagePickerModal,
    addItemImage,
    uploadImagePicker,
    itemImage,
    fromOrderPlace,
    isAccordionItemRemoveable,
    btnOneFunc,
    modalType,
    user,
  } = props;

  const isOpenImg = active ? Images.DownArrow : Images.DownArrow;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={() => {
          togglePress(index);
        }}>
        <View
          style={[
            styles.titleWrap,
            !fromOrderPlace && {marginHorizontal: 5},
            editAble && styles.editTitleWrap,
            !_.isEmpty(item.nameError) && styles.errorBorder,
          ]}>
          {isAccordionItemRemoveable && (
            <TouchableOpacity
              onPress={() => {
                btnOneFunc({[modalType]: true});
              }}>
              <View style={styles.crossBtnWrap}>
                <View style={styles.removeItemButton}>
                  <Text
                    type={'semiBold'}
                    textAlign={'center'}
                    style={styles.crossTextStyle}>
                    X
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          {!editAble && (
            <Text size={Fonts.size.font18} color={Colors.trout} type="semiBold">
              {item.name}
            </Text>
          )}
          {editAble && (
            <View style={{flex: 4}}>
              <TextInput
                style={styles.inputFiled}
                labelStyle={styles.labelStyle}
                placeholder={`${strings.WRITE_TITLE_HERE} ...`}
                placeholderTextColor={Colors.hurricane}
                value={item.name}
                placeholderTextColor={Colors.grey}
                onChangeText={value => {
                  onChangeFiled('name', value, index);
                }}
              />
            </View>
          )}
          <View style={styles.optionWrap}>
            <View style={styles.option}>
              <RnImage source={isOpenImg} style={active && styles.rotateImg} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {editAble && !_.isEmpty(item.nameError) && (
        <View>
          <Text type="bold" color={Colors.red} style={styles.errorText}>
            {item.nameError}
          </Text>
        </View>
      )}

      {active && (
        <View>
          <View
            style={[
              styles.accordionSec,
              !fromOrderPlace && {marginHorizontal: 5},

              styles.editSec,
              !_.isEmpty(item.descError) && styles.errorBorder,
            ]}>
            <View style={styles.bodyWrap}>
              <View style={styles.leftSec}>
                {!editAble && (
                  <View style={AppStyles.alignItemsCenter}>
                    <RnImage source={item.image} />
                  </View>
                )}
                {editAble && (
                  <View style={AppStyles.alignItemsCenter}>
                    <RnImage
                      source={
                        !_.isEmpty(itemImage)
                          ? {uri: itemImage}
                          : Images.ItemImagePlaceholder
                      }
                      style={styles.proposalRevisionImageStyle}
                    />
                  </View>
                )}

                {editAble && (
                  <TouchableOpacity
                    onPress={() => openImagePickerModal()}
                    style={styles.submitBtnWrap}>
                    <View style={styles.uploadImageIconStyleWrap}>
                      <RnImage
                        source={Images.UploadImageIcon}
                        style={AppStyles.mRight5}
                      />
                    </View>
                    <View>
                      <Text type="bold" style={styles.submitBtnText}>
                        {strings.UPLOAD_IMAGE}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
                {isProposalDetail && !editAble && (
                  <View style={styles.remarkSec}>
                    <Text
                      style={AppStyles.flex}
                      color={Colors.trout}
                      size={Fonts.size.font14}
                      type="semiBold">
                      {strings.REMARKS}
                    </Text>
                    <Text
                      style={AppStyles.flex}
                      color={Colors.hurricane}
                      size={Fonts.size.font10}
                      type="semiBold">
                      lorem ipsum kore
                    </Text>
                  </View>
                )}
              </View>
              <View
                style={[AppStyles.flex2, AppStyles.mLeft15, styles.rightCol]}>
                {isProposalDetail && !editAble && (
                  <View style={AppStyles.mBottom10}>
                    <View style={styles.row}>
                      <Text
                        textAlign="center"
                        color={Colors.mountainMist}
                        size={Fonts.size.font14}
                        type="semiBold">
                        {strings.PRICE}
                      </Text>
                      <Text
                        style={[AppStyles.mLeft5, AppStyles.flex]}
                        size={Fonts.size.font15}
                        textAlign="center"
                        type="semiBold">
                        {`${
                          _.isNil(user.currency_code)
                            ? 'ESP'
                            : user.currency_code
                        } ${item.price}`}
                      </Text>
                    </View>
                    <View style={styles.row}>
                      <Text
                        color={Colors.mountainMist}
                        size={Fonts.size.font14}
                        type="semiBold">
                        {strings.QTY}
                      </Text>
                      <Text
                        style={[AppStyles.mLeft5, AppStyles.flex]}
                        size={Fonts.size.font15}
                        type="semiBold"
                        textAlign="center">
                        {item.quantity}
                      </Text>
                    </View>
                  </View>
                )}
                {!editAble && (
                  <>
                    <Text
                      size={Fonts.size.font22}
                      type="semiBold"
                      color={Colors.trout}>
                      {strings.REQUIRMENTS}
                    </Text>

                    <Text
                      style={AppStyles.mTop5}
                      size={Fonts.size.font10}
                      color={Colors.trout}>
                      {item.description}
                    </Text>
                  </>
                )}
                {editAble && (
                  <TextInput
                    multiline
                    // maxLines={3}
                    style={[styles.searchField, styles.inputStyle]}
                    label={strings.REQUIREMENTS}
                    labelStyle={styles.labelStyle}
                    labelType="semiBold"
                    placeholder={`${strings.WRITE_DESCRP_HERE} ...`}
                    placeholderTextColor={Colors.hurricane}
                    value={item.description}
                    multiline={true}
                    onChangeText={value => {
                      onChangeFiled('description', value, index);
                    }}
                  />
                )}
                {false && (
                  <View style={styles.acceptSec}>
                    <TouchableOpacity
                      style={AppStyles.mRight15}
                      // onPress={() => {
                      //   itemRemovePress(item.id);
                      // }}
                    >
                      <RnImage source={Images.CrossIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <RnImage source={Images.RiteIcon} />
                    </TouchableOpacity>
                  </View>
                )}
                {!isProposalDetail && (
                  <View style={styles.quantityWrap}>
                    <QuantityInput dark={true} />
                  </View>
                )}
              </View>
            </View>
            {comment && (
              <View style={styles.commentArea}>
                <Text
                  size={Fonts.size.font18}
                  color={Colors.trout}
                  type="semiBold">
                  {strings.COMMENTS}
                </Text>
                <View style={styles.comtWrap}>
                  <View style={[AppStyles.flexRow, AppStyles.mBottom5]}>
                    {!_.isEmpty(itemImage) && (
                      <View style={AppStyles.alignItemsCenter}>
                        <RnImage
                          source={{uri: itemImage}}
                          style={styles.commentImageStyle}
                        />
                      </View>
                    )}
                    <TextInput
                      maxLength={inputFieldsLimit.mLimit1000}
                      // labelStyle={styles.labelStyle}
                      placeholder={strings.ADD_TEXT_HERE}
                      placeholderTextColor={Colors.hurricane}
                      inputStyle={[
                        !_.isEmpty(itemImage)
                          ? {
                              width: 140,
                            }
                          : {minWidth: '100%'},
                        styles.commentInput,
                      ]}
                      multiline={true}
                    />
                  </View>

                  <TouchableOpacity
                    style={styles.uploadWrap}
                    onPress={openImagePickerModal}>
                    <Text
                      size={Fonts.size.font11}
                      color={Colors.grey2}
                      type="bold">
                      {strings.ADD_IMAGE}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
          {!_.isEmpty(item.descError) && (
            <View style={AppStyles.mBottom15}>
              <Text type="bold" color={Colors.red} style={styles.errorText}>
                {item.descError}
              </Text>
            </View>
          )}
        </View>
      )}

      {uploadImagePicker && (
        <ImagePicker
          addImage={addItemImage}
          showPickerModal={uploadImagePicker}
          closeModal={closeImagePickerModal}
        />
      )}
    </View>
  );
}
