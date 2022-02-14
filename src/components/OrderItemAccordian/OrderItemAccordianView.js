import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {
  ImagePicker,
  QuantityInput,
  Text,
  TextInput,
  Image,
  RichTextEditor,
  HTMLView,
} from '../../components';
import styles from './OrderItemAccordianStyles';
import {AppStyles, Colors, Fonts, Images, Metrics} from '../../theme';
import {
  MODAL_TYPE,
  ORDER_ITEM_TYPE,
  PROMO_TYPES,
  strings,
} from '../../constants';
import util from '../../util';
import {renderNameStringAndImageRender} from '../../helpers/multilingualHelper';

export default class OrderItemAccordianView extends React.PureComponent {
  render() {
    const {
      data,
      active,
      toggleAccordinPress,
      config,
      itemType,
      isAllowedtoRead,
      index,
      isAllowedtoWrite,
      isPlaceholderVisible,
      onChange,
      isImgUploadVisible,
      handleImgModal,
      addItemImage,
      itemImage,
      imgModalFor,
      handleRemovePrdItem,
      requirementsFocus,
      showRemoveImgBtn,
      reftitle,
      refDes,
      refRemark,
    } = this.props;

    // if image not availbe then show placeholder
    let prdImg = _.isEmpty(data.image)
      ? {}
      : {uri: renderNameStringAndImageRender(data.image)};

    let remarkPrdImg = _.isEmpty(data.remarksImgData)
      ? Images.ItemImagePlaceholder
      : {uri: renderNameStringAndImageRender(data.remarksImgData.image)};

    return (
      <View style={[styles.container]}>
        {/* Titlebar */}

        <View
          activeOpacity={0.9}
          style={[
            styles.cardContainer,
            styles.titlebarContainer,
            !_.isEmpty(data.nameError) && styles.borderError,
            util.isRTL() && AppStyles.rowReverse,
          ]}
          onPress={() => {
            toggleAccordinPress(index);
          }}>
          {/* REMOVE ITEM */}
          {isAllowedtoWrite(config[itemType].removeItem) && (
            <TouchableOpacity
              style={[styles.removeItemContainer]}
              onPress={() => {
                handleRemovePrdItem(index);
              }}>
              <Text
                color={Colors.red}
                type={'semiBold'}
                textAlign={'center'}
                fontSize={20}>
                X
              </Text>
            </TouchableOpacity>
          )}
          {/* Title */}

          {isAllowedtoWrite(config[itemType].title) && (
            <View
              style={[
                styles.titleContainer,
                // !util.isPlatformAndroid() && {paddingVertical: 13},
              ]}>
              {/* <TextInput
                placeholder={isPlaceholderVisible(
                  isAllowedtoWrite(config[itemType].title),
                  strings.WRITE_TITLE_HERE,
                )}
                textAlign={util.isRTL() ? 'right' : 'left'}
                onChangeText={value => {
                  onChange('name', index, value);
                }}
                style={[styles.titleInput]}
                editable={isAllowedtoWrite(config[itemType].title)}
                value={data.name}
                onSubmitEditing={requirementsFocus}
              /> */}

              <View style={[{marginLeft: 10}]}>
                <RichTextEditor
                  value={data.name}
                  onChange={text => onChange('name', index, text)}
                  textAlign={util.isRTL() ? 'right' : 'left'}
                  heightInput="50"
                  disabled={!isAllowedtoWrite(config[itemType].title)}
                  fontSize={Fonts.size.medium}
                  placeholder={isPlaceholderVisible(
                    isAllowedtoWrite(config[itemType].title),
                    strings.WRITE_TITLE_HERE,
                  )}
                  refRichText={reftitle}
                />
              </View>
            </View>
          )}

          {/* when we have to read name and title not write */}

          {isAllowedtoRead(config[itemType].title) && (
            <View style={[{padding: Metrics.smallMargin + 2}, AppStyles.flex]}>
              <HTMLView
                htmlContent={
                  renderNameStringAndImageRender(data.name) ||
                  renderNameStringAndImageRender(data.title)
                }
                size={Fonts.size.medium}
                color={Colors.black}
                type={Fonts.type.medium}
              />
              {/* <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={[
                  styles.titleInput,
                  util.isRTL() && {textAlign: 'right'},
                ]}>
                {renderNameStringAndImageRender(data.name) ||
                  renderNameStringAndImageRender(data.title)}
              </Text> */}
            </View>
          )}

          {/* Toggle Icon */}
          <TouchableOpacity
            activeOpacity={0.9}
            style={[
              styles.titlebarContainer,
              !_.isEmpty(data.nameError) && styles.borderError,
              util.isRTL() && AppStyles.rowReverse,
            ]}
            onPress={() => {
              toggleAccordinPress(index);
            }}>
            <View>
              <RnImage
                source={Images.DownArrow}
                style={[styles.toggleIcon, active && styles.activeBtn]}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        </View>

        {!_.isEmpty(data.nameError) && (
          <Text
            type="medium"
            size={Fonts.size.xxxxSmall}
            color={Colors.red}
            style={[
              AppStyles.mBottom5,
              AppStyles.mLeft15,
              {top: -5},
              util.isRTL() && {textAlign: 'right', right: 10},
            ]}>
            {data.nameError}
          </Text>
        )}
        {/* Body */}
        {active && (
          <View
            style={[
              styles.cardContainer,
              styles.bodyContainer,
              !_.isEmpty(
                data.descError || data.imageError || data.quantityError,
              ) && styles.borderError,
            ]}>
            {/* Customer Description Container */}
            <View
              style={[util.isRTL() ? AppStyles.rowReverse : AppStyles.flexRow]}>
              <View style={AppStyles.flex}>
                {/* Product Image */}
                {(isAllowedtoWrite(config[itemType].requirementsImage) ||
                  isAllowedtoRead(config[itemType].requirementsImage)) && (
                  <View style={[styles.orderItemImageContainer]}>
                    {showRemoveImgBtn && !_.isEmpty(data.image) && (
                      <TouchableOpacity
                        onPress={() => addItemImage('', index)}
                        activeOpacity={0.8}
                        style={[
                          {
                            backgroundColor: 'red',
                            zIndex: 999,
                            position: 'absolute',
                            borderRadius: 200,
                            width: 22,
                            height: 22,
                            top: -6,
                          },
                          util.isRTL() ? {right: 4} : {left: -8},
                        ]}>
                        <Text
                          color={Colors.white}
                          style={{alignSelf: 'center'}}
                          type="bold"
                          size={Fonts.size.small}>
                          X
                        </Text>
                      </TouchableOpacity>
                    )}
                    {!_.isEmpty(data.image) && (
                      <Image source={prdImg} style={styles.imageStyle} />
                    )}
                  </View>
                )}

                {/* Editable Quanity Field */}
                {isAllowedtoWrite(config[itemType].quantity) && (
                  <View style={[styles.qtyInputWrap]}>
                    <QuantityInput
                      itemIndex={index}
                      incomingQuantity={data.quantity}
                      dark={true}
                      handleChangeQuantity={quantity => {
                        onChange('quantity', index, quantity);
                      }}
                    />
                  </View>
                )}
              </View>

              <View style={[styles.orderItemDescContainer, AppStyles.flex]}>
                {/* Price */}
                {isAllowedtoRead(config[itemType].price) && (
                  <View
                    style={[
                      util.isRTL() ? AppStyles.rowReverse : AppStyles.flexRow,
                      styles.orderAtts,
                    ]}>
                    <Text>{strings.PRICE} : </Text>
                    <Text>{data.price}</Text>
                  </View>
                )}
                {/* Qty */}
                {isAllowedtoRead(config[itemType].quantityRead) && (
                  <View
                    style={[
                      util.isRTL() ? AppStyles.rowReverse : AppStyles.flexRow,
                      styles.orderAtts,
                    ]}>
                    <Text size={Fonts.size.small}>{strings.QTY} :</Text>
                    <Text size={Fonts.size.small}>{data.quantity}</Text>
                  </View>
                )}

                {/* Description */}
                {isAllowedtoWrite(config[itemType].requirements) && (
                  <View
                    style={
                      isAllowedtoRead(config[itemType].requirements) &&
                      !_.isEmpty(data.description) &&
                      itemType !== ORDER_ITEM_TYPE.onlyForRead &&
                      itemType !== ORDER_ITEM_TYPE.forProposal &&
                      itemType !== ORDER_ITEM_TYPE.deliveryDetails && {
                        top: -40,
                      }
                    }>
                    {/* {!_.isNil(data.description) &&
                      !_.isEmpty(data.description) && ( */}
                    <Text
                      style={[
                        AppStyles.mTop5,
                        util.isRTL() && {textAlign: 'right'},
                      ]}
                      size={Fonts.size.small}
                      type="bold"
                      color={Colors.black1}>
                      {`${strings.REQUIREMENTS} :`}
                    </Text>
                    {/* )} */}
                    {/* <TextInput
                      multiline
                      maxLines={3}
                      value={renderNameStringAndImageRender(data.description)}
                      textAlign={util.isRTL() ? 'right' : 'left'}
                      style={[AppStyles.mTop5, styles.descriptionText]}
                      placeholder={isPlaceholderVisible(
                        isAllowedtoWrite(config[itemType].requirements),
                        strings.WRITE_DESCRP_HERE,
                      )}
                      onChangeText={value => {
                        onChange('description', index, value);
                      }}
                      placeholderTextColor={Colors.grey1}
                      editable={isAllowedtoWrite(config[itemType].requirements)}
                      ref={ref => {
                        this.props.requirementsRef(ref);
                      }}
                    /> */}

                    <RichTextEditor
                      value={renderNameStringAndImageRender(data.description)}
                      onChange={text => onChange('description', index, text)}
                      textAlign={util.isRTL() ? 'right' : 'left'}
                      heightInput="70"
                      disabled={
                        !isAllowedtoWrite(config[itemType].requirements)
                      }
                      fontSize={Fonts.size.xxSmall}
                      placeholder={isPlaceholderVisible(
                        isAllowedtoWrite(config[itemType].requirements),
                        strings.WRITE_DESCRP_HERE,
                      )}
                      refRichText={refDes}
                    />
                  </View>
                )}
                {isAllowedtoRead(config[itemType].requirements) && (
                  <View
                    style={
                      isAllowedtoRead(config[itemType].requirements) &&
                      !_.isEmpty(data.description) &&
                      itemType !== ORDER_ITEM_TYPE.onlyForRead &&
                      itemType !== ORDER_ITEM_TYPE.forProposal &&
                      itemType !== ORDER_ITEM_TYPE.deliveryDetails && {
                        top: -40,
                      }
                    }>
                    <Text
                      style={[
                        AppStyles.mTop5,
                        util.isRTL() && {textAlign: 'right'},
                      ]}
                      size={Fonts.size.small}
                      type="bold"
                      color={Colors.black1}>
                      {`${strings.REQUIREMENTS} :`}
                    </Text>
                    <HTMLView
                      htmlContent={
                        renderNameStringAndImageRender(data.description)
                          ? renderNameStringAndImageRender(data.description)
                          : ''
                      }
                      size={Fonts.size.xxSmall}
                      color={Colors.black}
                      type={Fonts.type.medium}
                    />
                    {/* <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={[
                  styles.titleInput,
                  util.isRTL() && {textAlign: 'right'},
                ]}>
                {renderNameStringAndImageRender(data.name) ||
                  renderNameStringAndImageRender(data.title)}
              </Text> */}
                  </View>
                )}

                {isAllowedtoWrite(config[itemType].requirements) && (
                  <View>
                    <TouchableOpacity
                      onPress={() => handleImgModal(MODAL_TYPE.PRDOUCT_IMG)}
                      style={styles.submitBtnWrap}>
                      <View style={styles.uploadImageIconStyleWrap}>
                        <Image
                          source={
                            _.isEmpty(data.image)
                              ? Images.UploadImageIcon
                              : {
                                  uri: renderNameStringAndImageRender(
                                    data.image,
                                  ),
                                }
                          }
                          style={AppStyles.mRight10}
                        />
                      </View>
                      <View>
                        <Text type="semiBold" style={styles.submitBtnText}>
                          {strings.UPLOAD_IMAGE}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
            {!_.isNil(data.additional_notes) &&
              !_.isEmpty(data.additional_notes) && (
                <View style={styles.addNotesWrap}>
                  <Text size={Fonts.size.xSmall} type="semiBold">
                    {strings.ADDITIONAL_NOTES} :
                  </Text>
                  <HTMLView
                    htmlContent={
                      data.additional_notes ? data.additional_notes : ''
                    }
                    size={Fonts.size.xSmall}
                    color={Colors.black}
                    type={Fonts.type.medium}
                  />
                  {/* <Text size={Fonts.size.xSmall} type="medium">
                    {data.additional_notes}
                  </Text> */}
                </View>
              )}
            {/* Remarks */}
            {(isAllowedtoWrite(config[itemType].remarks) ||
              (isAllowedtoRead(config[itemType].remarks) &&
                !_.isNil(data.remarks) &&
                !_.isEmpty(data.remarks))) && (
              <View style={[styles.remarksContainer]}>
                <Text
                  style={[AppStyles.mTop5]}
                  size={Fonts.size.normal}
                  type="bold"
                  color={Colors.grey2}>
                  {strings.REMARK}
                </Text>
                <View
                  style={[
                    // util.isRTL() ? AppStyles.rowReverse : AppStyles.flexRow,
                    {justifyContent: 'flex-start'},
                  ]}>
                  <View>
                    {isAllowedtoWrite(config[itemType].remarks) && (
                      <RichTextEditor
                        value={!_.isUndefined(data.remarks) ? data.remarks : ''}
                        textAlign={util.isRTL() ? 'right' : 'left'}
                        heightInput="70"
                        fontSize={Fonts.size.xxSmall}
                        placeholder={isPlaceholderVisible(
                          isAllowedtoWrite(config[itemType].remarks),
                          strings.WRITE_REMARK_HERE,
                        )}
                        placeholderTextColor={Colors.grey1}
                        onChange={value => {
                          onChange('remark', index, value);
                        }}
                        refRichText={refRemark}
                      />
                    )}
                    {isAllowedtoRead(config[itemType].remarks) && (
                      <>
                        <HTMLView
                          htmlContent={data.remarks}
                          size={Fonts.size.xxSmall}
                          textAlign={util.isRTL() ? 'right' : 'left'}
                        />
                        {/* <Text size={Fonts.size.xxSmall} type="medium">
                          {data.remarks}
                        </Text> */}
                        {/* remarks uploaded image*/}
                        {!_.isNil(data.remarks_image) &&
                          !_.isEmpty(data.remarks_image) && (
                            <View>
                              <Image
                                resizeMode="contain"
                                style={[styles.remarksImage]}
                                source={{uri: data.remarks_image}}
                              />
                            </View>
                          )}
                      </>
                    )}
                  </View>
                </View>

                {isAllowedtoWrite(config[itemType].remarks) && (
                  <View
                    style={[
                      util.isRTL() ? AppStyles.rowReverse : AppStyles.flexRow,
                      styles.uploadImgWrap,
                    ]}>
                    <View>
                      {/* remarks uploaded image*/}
                      <Image
                        resizeMode="contain"
                        style={[styles.remarksImage]}
                        source={remarkPrdImg}
                      />
                    </View>
                    {/* upload image btn */}

                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          handleImgModal(MODAL_TYPE.PRDOUCT_IMG_REMARKS);
                        }}
                        style={styles.submitBtnWrap}>
                        <View style={styles.uploadImageIconStyleWrap}>
                          <RnImage
                            source={Images.UploadImageIcon}
                            style={AppStyles.mRight10}
                          />
                        </View>
                        <View>
                          <Text type="semiBold" style={styles.submitBtnText}>
                            {strings.UPLOAD_IMAGE}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            )}

            {!_.isNil(data.menu_promotion) && (
              <View>
                <Text
                  style={[
                    AppStyles.mTop5,
                    util.isRTL() && {textAlign: 'right'},
                  ]}
                  size={Fonts.size.normal}
                  type="bold"
                  color={Colors.text.penta}>
                  {strings.PROMOTIONS}
                </Text>
                {!_.isNil(data.menu_promotion.description) &&
                  !_.isEmpty(data.menu_promotion.description) && (
                    <View style={[AppStyles.mTop15]}>
                      <Text
                        size={Fonts.size.xSmall}
                        type="semiBold"
                        style={[util.isRTL() && {textAlign: 'right'}]}>
                        {strings.DESCRIPTION}
                      </Text>
                      {/* <TextInput
                        multiline
                        maxLines={3}
                        style={[
                          AppStyles.mTop5,
                          styles.descriptionText,
                          {top: -10},
                        ]}
                        placeholder={isPlaceholderVisible(
                          isAllowedtoRead(config[itemType].promotions),
                          strings.WRITE_DESCRP_HERE,
                        )}
                        value={data.menu_promotion.description}
                        placeholderTextColor={Colors.text.quaternary}
                        editable={false}
                      /> */}
                      <HTMLView
                        multiline
                        maxLines={3}
                        style={[
                          AppStyles.mTop5,
                          styles.descriptionText,
                          {top: -10},
                        ]}
                        placeholder={isPlaceholderVisible(
                          isAllowedtoRead(config[itemType].promotions),
                          strings.WRITE_DESCRP_HERE,
                        )}
                        htmlContent={data.menu_promotion.description}
                        placeholderTextColor={Colors.text.quaternary}
                        editable={false}
                      />
                    </View>
                  )}
                <View
                  style={[util.isRTL() && {alignSelf: 'flex-end'}, {top: 10}]}>
                  <Text size={Fonts.size.xSmall}>
                    {`${strings.PROMO_TYPE}: ${
                      data.menu_promotion.type === PROMO_TYPES.BUY_1_GET_1
                        ? strings.BUY_1_GET_1
                        : ''
                    }${
                      data.menu_promotion.type === PROMO_TYPES.GIFT_PRODUCT
                        ? strings.GIFT_PRODUCT
                        : ''
                    }${
                      data.menu_promotion.type === PROMO_TYPES.DISCOUNT
                        ? strings.DISCOUNT
                        : ''
                    }
                    
                    `}
                  </Text>
                </View>
              </View>
            )}
          </View>
        )}
        {!_.isEmpty(data.descError) && (
          <Text
            type="medium"
            size={Fonts.size.xxxxSmall}
            color={Colors.red}
            style={[
              AppStyles.mBottom5,
              util.isRTL() && {textAlign: 'right', right: 10},
            ]}>
            {data.descError}
          </Text>
        )}

        {!_.isEmpty(data.quantityError) && (
          <Text
            type="medium"
            size={Fonts.size.xxxxSmall}
            color={Colors.red}
            style={[
              AppStyles.mTop5,
              AppStyles.mBottom5,
              util.isRTL() && {textAlign: 'right', right: 10},
            ]}>
            {data.quantityError}
          </Text>
        )}

        {!_.isEmpty(data.imageError) && (
          <Text
            type="medium"
            size={Fonts.size.xxxxSmall}
            color={Colors.red}
            style={[
              AppStyles.mTop5,
              AppStyles.mBottom5,
              AppStyles.mLeft20,
              util.isRTL() && {textAlign: 'right', right: 10},
            ]}>
            {data.imageError}
          </Text>
        )}
        {/* image upload modal */}
        {isImgUploadVisible && (
          <ImagePicker
            addImage={addItemImage}
            showPickerModal={handleImgModal}
            closeModal={handleImgModal}
            itemIndex={index}
            imgModalFor={imgModalFor}
          />
        )}
      </View>
    );
  }
}
