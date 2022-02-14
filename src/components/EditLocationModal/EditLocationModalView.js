import React from 'react';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {Text, Button} from '../../components';
import styles from './EditLocationModalStyles';
import {Colors, Fonts, AppStyles, Images} from '../../theme';
import {Actions} from 'react-native-router-flux';
import {strings} from '../../constants';

export default function EditLocationModalView(props) {
  const {showEditModal} = props;

  return (
    <View style={styles.container}>
      <Modal
        isVisible={showEditModal}
        style={{
          alignItems: 'center',
          margin: 20,
        }}
        onBackButtonPress={() => {
          props.closeModal();
        }}
        onBackdropPress={() => {
          props.closeModal();
        }}
        backdropOpacity={0.8}
        backdropColor={Colors.white}>
        <View style={styles.editLocation}>
          <View style={styles.editTextWrap}>
            <TouchableOpacity
              style={AppStyles.flex}
              onPress={() => {
                props.closeModal();
                Actions.myaddress();
              }}>
              <Text style={styles.editText}>{strings.EDIT_LOCATION}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props.closeModal();
              }}>
              <Text style={styles.editText}>x</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.editLocation}>
          <View style={styles.editDetails}>
            <View style={styles.editSubDetails}>
              <View style={styles.icons}>
                <RnImage source={Images.Pin3} style={styles.iconStyle} />
              </View>
              <View style={styles.editDetailsSec}>
                <Text style={styles.editSubDetailsHeading}>
                  {strings.YOUR_LOCATION}
                </Text>
                <Text style={styles.editSubDetailsText}>
                  sdfsdkjf sdfjkhsdjkfsd fjksd fsd f sd fjsdf sd f sdf sdm fsd
                  fsdf sd fdsfkhsdkf sdf sdkfhkds fuksd
                </Text>
              </View>
            </View>
            <View style={[styles.editSubDetails, {paddingLeft: 19}]}>
              <View style={styles.editDetailsSec}>
                <Text style={styles.editSubDetailsHeading}>
                  {strings.COMPLETE_LOCATION}
                </Text>
                <Text style={styles.editSubDetailsText}>
                  sdfsdkjf sdfjkhsdjkfsd fjksd fsd f sd fjsdf sd f sdf sdm fsd
                  fsdf sd fdsfkhsdkf sdf sdkfhkds fuksd fsldkasd sa dskd
                  ksadjkjds
                </Text>
              </View>
            </View>
            <View style={styles.editSubDetails}>
              <View style={styles.icons}>
                <RnImage source={Images.PhoneIcon1} style={styles.iconStyle} />
              </View>
              <View style={styles.editDetailsSec}>
                <Text style={styles.editSubDetailsHeading}>
                  {strings.MOBILE_NUM}
                </Text>
                <Text style={styles.editSubDetailsText}>+2012345676</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
