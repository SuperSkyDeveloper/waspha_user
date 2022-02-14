import React from 'react';
import styles from './TourScreensStyles';
import {Images, Colors, AppStyles, Metrics, Fonts} from '../../theme';
import SwiperRN from 'react-native-swiper';
import {
  View,
  StatusBar,
  Image,
  ImageBackground,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Button, Text, Loader} from '../../components';
import {strings} from '../../constants';

function _renderPage1(buttonClick) {
  return (
    <View style={styles.page1Wrapper}>
      <Text style={styles.narration}>
        {strings.SEARCH_TRAVELER_OF_REQ_DEST}
      </Text>
      <Image
        source={Images.SignBg}
        style={styles.centerImage}
        resizeMode="contain"
      />
      <Button
        style={styles.button}
        color={Colors.white}
        onPress={buttonClick}
        textStyle={{fontWeight: 'bold'}}>
        {strings.NEXT}
      </Button>
    </View>
  );
}

function _renderPage2(buttonClick) {
  return (
    <View style={styles.page1Wrapper}>
      <Text style={styles.narration}>
        {strings.REQ_ITEMS_FROM_OTHER_COUNTRIES}
      </Text>
      <Image
        source={Images.SignBg}
        style={styles.centerImage}
        resizeMode="contain"
      />
      <Button
        style={styles.button}
        color={Colors.white}
        onPress={buttonClick}
        textStyle={{fontWeight: 'bold'}}>
        {strings.NEXT}
      </Button>
    </View>
  );
}
function _renderPage3(buttonClick) {
  return (
    <View style={styles.page1Wrapper}>
      <Text style={styles.narration}>{strings.GET_DELIVERED_TO_HOME}</Text>
      <Image
        source={Images.SignBg}
        style={styles.centerImage}
        resizeMode="contain"
      />
      <Button
        style={styles.button}
        color={Colors.white}
        onPress={buttonClick}
        textStyle={{fontWeight: 'bold'}}>
        {strings.FINISH}
      </Button>
    </View>
  );
}
function dot() {
  return (
    <View
      style={{
        backgroundColor: Colors.silverChalice,
        width: 14,
        height: 14,
        borderRadius: 8,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
      }}
    />
  );
}
function activeDot() {
  return (
    <View
      style={[
        {
          backgroundColor: Colors.black,
          width: 20,
          height: 20,
          borderRadius: 10,
          marginLeft: 3,
          marginRight: 3,
          marginTop: 3,
          marginBottom: 3,
        },
        AppStyles.centerInner,
      ]}>
      <View
        style={{
          backgroundColor: Colors.blue,
          width: 15,
          height: 15,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: Colors.white,
        }}
      />
    </View>
  );
}
export default function TourScreensView(props) {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.skipParent}>
        <TouchableOpacity onPress={props.skip}>
          <Text
            style={{textDecorationLine: 'underline'}}
            color={Colors.appAccent}
            type="semiBold">
            {strings.SKIP}
          </Text>
        </TouchableOpacity>
      </View>
      <SwiperRN
        loop={false}
        onMomentumScrollEnd={(e, {index, total}) => {
          props.scrollEnd(index, total - 1);
        }}
        scrollEnabled={true}
        dot={dot()}
        activeDot={activeDot()}
        ref={swiper => {
          props.swiperRef(swiper);
        }}>
        {_renderPage1(props.buttonClick)}
        {_renderPage2(props.buttonClick)}
        {_renderPage3(props.buttonClick)}
      </SwiperRN>
    </View>
  );
}
