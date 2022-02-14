import React from 'react';
import {View, Image as RnImage, FlatList} from 'react-native';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import {Text} from '..';
import styles from './VendorProfileInfoStyles';
import {ISOToFormat} from '../../helpers/generalHelper';
import {Fonts, AppStyles, Colors} from '../../theme';
import {TIME_FORMAT1} from '../../constants';
import util from '../../util';

export default function VendorProfileInfoView(props) {
  const {items, modalType, closeModal, isModalOpen} = props;
  return (
    <View style={styles.container}>
      <Modal
        isVisible={isModalOpen}
        style={styles.modal}
        onBackButtonPress={() => {
          closeModal({[modalType]: false});
        }}
        onBackdropPress={() => {
          closeModal({[modalType]: false});
        }}
        backdropOpacity={0.8}
        backdropColor={Colors.white}
        style={styles.imageSelectorWrapper}>
        <LinearGradient
          start={{x: 0.0, y: 1.0}}
          end={{x: 0.0, y: 0.09}}
          colors={[Colors.resolutionBlue, Colors.violetRed]}
          style={
            util.isRTL()
              ? [styles.modalStyle, AppStyles.rowReverse]
              : styles.modalStyle
          }>
          <View style={util.isRTL() && AppStyles.flex}>
            <FlatList
              nestedScrollEnabled
              data={items}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <View style={[AppStyles.mBottom10]}>
                    <Text
                      style={util.isRTL() && [{alignSelf: 'flex-end'}]}
                      type="semiBold"
                      size={Fonts.size.xxSmall}
                      color={Colors.white}>
                      {item[0]}
                    </Text>
                    {item[1].map(time => {
                      return (
                        <View
                          style={
                            util.isRTL()
                              ? [AppStyles.rowReverse, {right: 8}]
                              : [AppStyles.mLeft10, AppStyles.flexRow]
                          }>
                          <Text color={Colors.white} size={Fonts.size.xxSmall}>
                            {ISOToFormat(time.from, TIME_FORMAT1)}
                          </Text>
                          <Text
                            color={Colors.white}
                            size={Fonts.size.xxSmall}>{` - `}</Text>
                          <Text color={Colors.white} size={Fonts.size.xxSmall}>
                            {ISOToFormat(time.to, TIME_FORMAT1)}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                );
              }}
            />
          </View>
        </LinearGradient>
      </Modal>
    </View>
  );
}
