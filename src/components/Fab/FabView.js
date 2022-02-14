import React from 'react';
import {
  View,
  Image as RnImage,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import styles from './FabStyles';
import {Images, Fonts, Colors} from '../../theme';
import Util from '../../util';
import {Text} from '../../components';

export default function FabView(props) {
  const {indicatorColor, loading, onPress, disabled} = props;
  return (
    <View style={{position: 'absolute', bottom: 40, right: 20}}>
      <TouchableOpacity
        onPress={() => onPress()}
        style={[styles.container]}
        disabled={disabled}>
        {!loading && <RnImage source={Images.forward} />}
        {loading && <ActivityIndicator color={indicatorColor} />}

        <RnImage source={Images.FabIcon} style={styles.plusSign} />
      </TouchableOpacity>
      {!Util.isPlatformAndroid() && <KeyboardSpacer />}
    </View>
  );
}
