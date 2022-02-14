import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Images, AppStyles, Colors, Metrics} from '../../theme';
import {Text} from '..';
import styles from './RateMyServiceHeaderStyles';
import {Actions} from 'react-native-router-flux';
export default function RateMyServiceHeaderView(props) {
  const {user} = props;
  return (
    <LinearGradient
      start={{x: -1.1, y: 1.8}}
      end={{x: 3.1, y: -2.5}}
      colors={[Colors.resolutionBlue, Colors.violetRed]}
      style={styles.mainSec}>
      <TouchableOpacity
        style={styles.backWrap}
        onPress={() => {
          Actions.pop();
        }}>
        <RnImage source={Images.BackBtn} />
      </TouchableOpacity>
      <View>
        <View style={{alignItems: 'center'}}>
          <RnImage
            source={
              _.isNil(user.avatar)
                ? Images.ProfilePlaceholder
                : {uri: user.avatar}
            }
            style={[styles.profilePic, {borderRadius: 100}]}
          />
        </View>
      </View>
    </LinearGradient>
  );
}
