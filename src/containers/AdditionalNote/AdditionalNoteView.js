import React from 'react';
import {View, Image as RnImage, ScrollView} from 'react-native';
import {
  Text,
  CustomNavbar,
  RichTextEditor,
  TextInput,
  Button,
} from '../../components';
import styles from './AdditionalNoteStyles';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import {strings} from '../../constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import util from '../../util';

export default function AdditionalNoteView(props) {
  const {
    setValue,
    handleSubmit,
    additionalNote,
    additionalNoteError,
    refNote,
  } = props;
  return (
    <View style={styles.container}>
      <CustomNavbar
        title={strings.MY_CART}
        titleColor={Colors.white}
        hasBottomRadius={true}
      />
      <KeyboardAwareScrollView
        //keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        style={styles.wrap}>
        <Text
          size={Fonts.size.font16}
          type="medium"
          color={Colors.codGray1}
          style={[
            AppStyles.mLeft10,
            util.isRTL() && {textAlign: 'right', right: 9},
          ]}>
          {strings.ADDITIONAL_NOTES}
        </Text>
        <View>
          {/* <TextInput
            textAlign={util.isRTL() ? 'right' : 'left'}
            inputStyle={styles.inputStyle}
            multiline={true}
            type="medium"
            value={additionalNote}
            error={additionalNoteError}
            onChangeText={val => {
              setValue({additionalNote: val});
            }}
            ref={ref => {
              props.additionalNoteRef(ref);
            }}
            onSubmitEditing={handleSubmit}
          /> */}
          <View style={styles.richInputStyle}>
            <RichTextEditor
              value={additionalNote}
              onChange={text => setValue({additionalNote: text})}
              textAlign={util.isRTL() ? 'right' : 'left'}
              label={strings.SUBJECT}
              labelType={'semiBold'}
              fontSize={Fonts.size.xxSmall}
              error={additionalNoteError}
              heightInput="147"
              refRichText={refNote}
              showLateToolbar={true}
            />
          </View>
        </View>
        <View style={styles.btnWrap}>
          <Button
            color={Colors.white}
            background={Colors.resolutionBlue}
            style={styles.btn}
            size={Fonts.size.font16}
            onPress={handleSubmit}
            isLoading={false}
            indicatorColor={Colors.white}
            disabled={false}
            type="medium">
            {strings.SUBMIT}
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
