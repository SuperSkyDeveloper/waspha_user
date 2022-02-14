// @flow
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {
  TextInput as RNTextInput,
  ViewPropTypes,
  View,
  Image as RnImage,
} from 'react-native';
import {Text, ButtonView} from '../';
import {Colors, AppStyles, Images, Fonts} from '../../theme';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import util from '../../util';

export default class TextInput extends React.PureComponent {
  static propTypes = {
    label: PropTypes.style,
    labelImg: PropTypes.object,
    error: PropTypes.string,
    containerStyle: PropTypes.style,
    inputStyle: PropTypes.style,
    onPress: PropTypes.func,
    multiline: PropTypes.bool,
    labelImgStyle: PropTypes.object,
    labelStyle: PropTypes.object,
    labelType: PropTypes.string,
  };

  static defaultProps = {
    error: '',
    label: '',
    labelImg: '',
    containerStyle: {},
    inputStyle: {},
    onPress: null,
    multiline: false,
    labelImgStyle: {},
    labelStyle: {},
    labelType: 'medium',
  };

  focus() {
    this.myRef.focus();
  }

  blur() {
    this.myRef.blur();
  }

  render() {
    const {
      label,
      error,
      containerStyle,
      inputStyle,
      onPress,
      multiline,
      labelImgStyle,
      labelImg,
      labelStyle,
      labelType,
      ...rest
    } = this.props;
    return (
      <View style={containerStyle}>
        <View style={styles.labelWrap}>
          {labelImg !== '' && (
            <RnImage
              source={labelImg}
              style={[labelImgStyle, AppStyles.mRight5]}
              resizeMode={'contain'}
            />
          )}
          {label !== '' && (
            <Text
              color={Colors.grey2}
              style={[
                util.isRTL() && {position: 'absolute', right: -3, top: -20},
                labelStyle,
              ]}
              type={labelType}>
              {label}
            </Text>
          )}
        </View>

        <View>
          <RNTextInput
          allowFontScaling={false}
            ref={ref => {
              this.myRef = ref;
            }}
            style={[
              styles.input,
              inputStyle,
              multiline ? styles.multilineInput : {},
            ]}
            blurOnSubmit={false}
            selectionColor={Colors.blue}
            multiline={multiline}
            {...rest}
          />
          {!_.isNull(onPress) && (
            <ButtonView onPress={onPress} style={styles.buttonOverlay}>
              <RnImage
                source={Images.arrow_right_grey}
                style={styles.arrowIcon}
              />
            </ButtonView>
          )}
        </View>

        {!_.isEmpty(error) && !_.isUndefined(error) && !_.isNull(error) && (
          <Text
            type="medium"
            size={Fonts.size.font12}
            color={Colors.red}
            style={[
              AppStyles.mTop5,
              AppStyles.mBottom5,
              util.isRTL() && {textAlign: 'right'},
            ]}>
            {error}
          </Text>
        )}
      </View>
    );
  }
}
