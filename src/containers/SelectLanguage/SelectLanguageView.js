import React from 'react';
import {View, Image as RnImage, ImageBackground} from 'react-native';
import {Text, Button} from '../../components';
import styles from './SelectLanguageStyles';
import {Images, Fonts, Colors, AppStyles} from '../../theme';
import {strings} from '../../constants';
export default function SelectLanguageView(props) {
  return (
    <ImageBackground source={Images.LanguageBg} style={styles.container}>
      <View style={styles.contentWrap}>
        <View style={AppStyles.mBottom35}>
          <Text color={Colors.white} size={Fonts.size.font21}>
            {strings.SELECT}
          </Text>
          <Text color={Colors.white} size={Fonts.size.font41} type="semiBold">
            {strings.LANGUAGE}
          </Text>
        </View>
        <Button
          color={Colors.white}
          size={Fonts.size.font12}
          style={styles.button}>
          {strings.ENGLISH}
        </Button>
        <Button
          color={Colors.white}
          size={Fonts.size.font12}
          style={styles.button}>
          {strings.ARBIC}
        </Button>
      </View>
    </ImageBackground>
  );
}
