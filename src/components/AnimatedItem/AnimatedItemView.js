import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, Animated, TouchableOpacity} from 'react-native';
import {Text} from '..';
import styles from './AnimatedItemStyles';
import {Colors, Images} from '../../theme';
import util from '../../util';

export default function AnimatedItemView(props) {
  const {
    animated,
    index,
    item,
    itemOutputRange,
    onItemPress,
    collapseList,
    iconWrapStyle,
    itemWrapStyle,
    totalItems,
    selectedItem,
    scrollToStart,
  } = props;

  return (
    <View>
      <Animated.View
        style={[
          {
            transform: [
              {
                translateX: animated.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -(index * itemOutputRange)],
                }),
              },
            ],
          },
        ]}>
        <TouchableOpacity
          style={[itemWrapStyle]}
          onPress={() => {
            scrollToStart();

            setTimeout(() => {
              onItemPress(item);
            }, 1);
          }}>
          <View style={iconWrapStyle}>
            {!_.isEmpty(selectedItem) &&
            index === totalItems - 1 &&
            collapseList ? (
              <RnImage
                style={[{height: 40, width: 40}]}
                resizeMode="contain"
                source={{uri: selectedItem.image}}
              />
            ) : (
              <RnImage
                style={[{height: 40, width: 40}]}
                resizeMode="contain"
                source={
                  _.isNil(item.image) ? Images.ShopIcon : {uri: item.image}
                }
              />
            )}
          </View>
          {!collapseList && (
            <Text style={styles.categoryName}>
              {util.isRTL() ? item.name.ar : item.name.en}
            </Text>
          )}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
