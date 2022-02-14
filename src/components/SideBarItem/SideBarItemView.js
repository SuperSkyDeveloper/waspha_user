import React from 'react';
import _ from 'lodash';
import {
  View,
  Image as RnImage,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import {Text} from '..';
import styles from './SideBarItemStyles';
import {Colors, Fonts, AppStyles, Metrics} from '../../theme';
import {strings} from '../../constants';
import util from '../../util';
import {HTMLView} from '../../components';
// import HTMLView from 'react-native-htmlview';
import {WebView} from 'react-native-webview';
export default function SideBarItemView(props) {
  const {item, active, togglePress, index, socialLogin} = props;

  return (
    <>
      <TouchableOpacity
        onPress={
          !_.isNil(item.subMenus) ? () => togglePress(index) : item.action
        }
        style={[
          styles.linkWrap,
          [util.isRTL() && item.title.length > 39 && {width: '86%'}],
        ]}>
        <RnImage
          source={item.icon}
          style={[
            {
              width: 28,
              height: 28,
              tintColor: Colors.white,
            },
            util.isRTL()
              ? [
                  {
                    position: 'absolute',
                    right: item.title.length > 39 ? -32 : 0,
                  },
                ]
              : {marginRight: 10},
          ]}
          resizeMode="contain"
        />

        <View style={[AppStyles.flex]}>
          <Text
            numberOfLines={3}
            style={
              util.isRTL() && {
                textAlign: 'right',
                right: item.title.length > 39 ? 10 : 45,
              }
            }
            size={Fonts.size.font14}
            color={Colors.white}
            type={'medium'}>
            {item.title}
          </Text>
        </View>
        {!_.isNil(item.dropDownIcon) && (
          <View
            style={
              util.isRTL()
                ? [AppStyles.pRight5, {position: 'absolute', left: 7}]
                : [AppStyles.pLeft5, {position: 'absolute', right: 0}]
            }>
            <RnImage
              source={item.dropDownIcon}
              style={[
                styles.iconMain,
                active && styles.activeBtn,
                {width: 11, height: 11},
              ]}
              tintColor={Colors.white}
            />
          </View>
        )}
        {/* 
      {item.notifications !== '' && (
        <View style={styles.badge}>
          <Text size={Fonts.size.font13} color={Colors.white} type={'bold'}>
            {item.notifications}
          </Text>
        </View>
      )} */}
      </TouchableOpacity>

      {active && !_.isNil(item.subMenus) && (
        <View style={[AppStyles.mLeft25, AppStyles.mBottom15, {top: -17}]}>
          <FlatList
            data={item.subMenus}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                !(socialLogin && item.title == strings.RESET_PASSWORD) && (
                  <TouchableOpacity
                    onPress={item.action}
                    style={[
                      AppStyles.flexRow,
                      {marginTop: Metrics.baseMargin},
                    ]}>
                    <RnImage
                      source={item.icon}
                      style={[
                        styles.icon,
                        {width: 22, height: 22},
                        util.isRTL() && [
                          _.isNil(item.rotateImage)
                            ? {
                                position: 'absolute',
                                right: 23,
                              }
                            : {
                                position: 'absolute',
                                right: 23,
                                transform: [
                                  {rotate: '-180deg'},
                                  {rotateX: '-180deg'},
                                ],
                              },
                        ],
                      ]}
                      resizeMode="contain"
                      tintColor={Colors.white}
                    />
                    <Text
                      style={
                        util.isRTL() && {
                          flex: 1,
                          right: _.isEmpty(item.info) ? 80 : 65,

                          textAlign: 'right',
                        }
                      }
                      size={Fonts.size.font14}
                      color={Colors.white}
                      type={'medium'}>
                      {item.title}
                    </Text>
                    {item.info !== '' && (
                      <View
                        style={
                          util.isRTL()
                            ? {position: 'absolute', left: -16}
                            : AppStyles.pLeft5
                        }>
                        <Text
                          size={Fonts.size.xxSmall}
                          color={Colors.malachite}
                          type={'bold'}>
                          {item.info}
                        </Text>
                      </View>
                    )}
                    {item.notifications !== '' && (
                      <View style={styles.badge}>
                        <Text
                          size={Fonts.size.font13}
                          color={Colors.white}
                          type={'bold'}>
                          {item.notifications}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                )
              );
            }}
          />
        </View>
      )}
    </>
  );
}

const style1 = StyleSheet.create({
  a: {
    fontWeight: '300',
    color: Colors.white, // make links coloured pink
  },
  p: {
    color: Colors.white,
  },
  font: {
    color: '#7ab900',
  },
});
