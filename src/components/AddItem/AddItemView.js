import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {Text, TextInput, ImagePicker} from '..';
import styles from './AddItemStyles';
import {Fonts, Colors, Images} from '../../theme';
import {strings} from '../../constants';

export default function AddItemView(props) {
  const {
    openImagePickerModal,
    closeImagePickerModal,
    uploadImagePicker,
    itemRequirements,
    itemImage,
    setValue,
    addItemImage,
    itemTitle,
  } = props;
  return (
    <View style={styles.container}>
      <View style={styles.titleWrap}>
        <View style={styles.inputWrap}>
          <TextInput
            multiline={true}
            inputStyle={styles.inputStyle}
            style={styles.addressInputWrap}
            value={itemTitle}
            onChangeText={val => {
              setValue({itemTitle: val});
            }}
            ref={ref => {
              props.itemTitleRef(ref);
            }}
          />
        </View>
        <View style={styles.optionWrap}>
          <TouchableOpacity style={styles.option}>
            <RnImage source={Images.DownArrow} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bodyWrap}>
        <View>
          <Text>{strings.REQUIREMENT}</Text>
        </View>
        <View>
          <TextInput
            multiline={true}
            inputStyle={styles.inputStyle}
            style={styles.addressInputWrap}
            value={itemRequirements}
            onChangeText={val => {
              setValue({itemRequirements: val});
            }}
            ref={ref => {
              props.itemRequirementsRef(ref);
            }}
          />
        </View>
        <View style={styles.imageSec}>
          <View>
            {!_.isEmpty(itemImage) && (
              <RnImage
                source={{uri: itemImage}}
                style={styles.itemImageStyle}
              />
            )}
          </View>

          <TouchableOpacity
            onPress={() => openImagePickerModal()}
            style={styles.submitBtnWrap}>
            <View style={styles.uploadImageIconStyleWrap}>
              <RnImage
                source={Images.UploadImageIcon}
                style={styles.uploadImageIconStyle}
              />
            </View>
            <View>
              <Text style={styles.submitBtnText}>{strings.UPLOAD_IMAGE}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

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
