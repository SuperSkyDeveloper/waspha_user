import React from 'react';
import {View, Image as RnImage, ScrollView} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {Text} from '../../components';
import styles from './CardSectionStyles';
import {strings} from '../../constants';
import {Fonts, Images, Metrics} from '../../theme';

export default function CardSectionView(props) {
  // todo
  const IMAGES_LIST = [
    {
      image: Images.CardIcon,
    },
    {
      image: Images.CardIcon,
    },
    {
      image: Images.CardIcon,
    },
  ];

  const _renderItem = ({item, index}) => {
    return (
      <View style={styles.slide}>
        <RnImage source={item.image} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingSec}>
        <Text size={Fonts.size.font14} type="medium">
          {strings.SELECT_PAYMENT_METHOD}
        </Text>
      </View>

      <Carousel
        data={IMAGES_LIST}
        renderItem={_renderItem}
        sliderWidth={Metrics.screenWidth}
        itemWidth={Metrics.screenWidth - 110}
        loop={true}
      />
    </View>
  );
}
