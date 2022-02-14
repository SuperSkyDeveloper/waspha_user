import React from 'react';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {Text, TextInput} from '../../components';
import styles from './StoreDashboardSearchStyles';
import {Images, Colors, Metrics} from '../../theme';
import {strings} from '../../constants';
import util from '../../util';
export default function StoreDashboardSearchView(props) {
  const {onSearchBarPress} = props;
  return (
    <TouchableOpacity
      onPress={onSearchBarPress}
      activeOpacity={0.8}
      style={[styles.searchWrap]}>
      <View style={[util.isRTL() && {position: 'absolute', left: 20}]}>
        <RnImage source={Images.SearchIcon} />
      </View>
      <View
        style={[
          util.isRTL() && {left: Metrics.screenWidth / 2},
          styles.searchFieldWrap,
        ]}>
        <TextInput
          textAlign={util.isRTL() ? 'right' : 'left'}
          editable={false}
          style={styles.searchField}
          labelStyle={styles.labelStyle}
          placeholder={strings.FIND_PRODUCTS}
        />
      </View>
      {/* <TouchableOpacity>
        <RnImage source={Images.FilterIcon} />
      </TouchableOpacity> */}
    </TouchableOpacity>
  );
}
