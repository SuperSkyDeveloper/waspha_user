import React from 'react';
import {
  View,
  Image as RnImage,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Text} from '../../components';
import styles from './SignHeaderStyles';
import {Images, Fonts, Colors, AppStyles, Metrics} from '../../theme';
import {strings} from '../../constants';
import util from '../../util';
import {Actions} from 'react-native-router-flux';

export default function SignHeaderView(props) {
  const {title, subTitle, mainHeading, subHeading} = props;

  return (
    <View>
      <ImageBackground
        source={Images.SignBg}
        style={styles.bgImage}
        imageStyle={{
          resizeMode: 'stretch',
          alignSelf: 'flex-end',
        }}>
        {!util.isPlatformAndroid() && (
          <TouchableOpacity
            onPress={() => Actions.pop()}
            style={[
              AppStyles.flex,
              {
                alignItems: util.isRTL() ? 'flex-end' : 'flex-start',
                width: '35%',
                height: 120,
              },
            ]}>
            <View
              style={[
                styles.backBtnWrap,
                util.isRTL()
                  ? {position: 'absolute', right: -Metrics.screenWidth / 1.7}
                  : {marginLeft: 17},
              ]}>
              <RnImage
                source={Images.BackBtn}
                style={[
                  styles.backBtnStyle,
                  util.isRTL() && {transform: [{rotate: '-180deg'}]},
                ]}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        )}

        <View style={[util.isRTL() && {alignSelf: 'flex-end'}, styles.content]}>
          {title !== '' && (
            <Text size={Fonts.size.font18} color={Colors.white} type="medium">
              {title}
            </Text>
          )}
          {subTitle !== '' && (
            <Text size={Fonts.size.font27} color={Colors.white} type="semiBold">
              {subTitle}
            </Text>
          )}
        </View>
      </ImageBackground>
      <View style={styles.headingSec}>
        {mainHeading !== '' && (
          <Text
            color={Colors.catalinaBlue}
            size={Fonts.size.font27}
            type="semiBold"
            textAlign="center">
            {mainHeading}
          </Text>
        )}
        {subHeading !== '' && (
          <Text
            style={AppStyles.mTop5}
            color={Colors.grey}
            size={Fonts.size.font11}
            textAlign="center">
            {subHeading}
          </Text>
        )}
        <RnImage source={Images.Mask3} style={styles.mask1} />
      </View>
    </View>
  );
}
