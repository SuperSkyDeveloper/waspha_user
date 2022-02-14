import React from 'react';
import {View, Image as RnImage, TouchableOpacity, Platform} from 'react-native';
import {Text} from '../../components';
import styles from './QuantityInputStyles';
import {Fonts, AppStyles, Colors, Images} from '../../theme';
import util from '../../util';

export default function QuantityInputView(props) {
  const {handleIncrement, handleDecrement, dark,fromStore} = props;
  return (
    <View style={[styles.incrementWrap, dark && styles.darkStyle,!util.isPlatformAndroid()&&!fromStore&&{width:"87%"}]}>
      <TouchableOpacity style={[styles.minusWrapper,{alignItems:'center',justifyContent:'center'}]} onPress={handleDecrement}>
        <View style={[styles.roundBtn, dark && styles.darkRoundBtn]}>
          <Text
            style={{lineHeight: !util.isPlatformAndroid()?21:22}}
            size={Fonts.size.medium}
            color={Colors.white}
            type="bold"
            textAlign="center">
            -
          </Text>
          {/* <RnImage source={Images.MinusIcon1} /> */}
        </View>
      </TouchableOpacity>
      <View>    
          <Text
        size={dark ? Fonts.size.font13 : Fonts.size.font8}
        color={dark ? Colors.white : Colors.raven}
        style={{width: dark ? 26 : 15, textAlign: 'center'}}
        type="medium">
        {props.quantity}
      </Text>
      </View>

      <TouchableOpacity
        style={[styles.plusWrapper,!util.isPlatformAndroid()&&{marginLeft:10}]}
        onPress={handleIncrement}
        activeOpacity={0.5}>
        <View style={[styles.roundBtn, dark && styles.darkRoundBtn]}>
          {/* <RnImage source={Images.PlusIcon} /> */}
          <Text
            style={{lineHeight: !util.isPlatformAndroid()?21:26}}
            size={Fonts.size.small}
            color={Colors.white}
            type="bold"
            textAlign="center">
            +
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
