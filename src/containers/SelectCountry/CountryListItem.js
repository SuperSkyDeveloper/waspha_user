import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styles from './SelectCountryStyles';
import {View, Image as RNImage, TouchableOpacity} from 'react-native';
import {Images, Fonts, AppStyles, Colors} from '../../theme';
import {Text} from '../../components';
import util from '../../util';
import {strings} from '../../constants';

class CountryListItem extends React.PureComponent {
  static propTypes = {
    item: PropTypes.object,
    isCountrySelected: PropTypes.bool,
    onPress: PropTypes.func,
  };
  static defaultProps = {
    item: {},
    isCountrySelected: false,
    onPress: () => {},
  };

  render() {
    const {item, isCountrySelected, onPress} = this.props;

    return (
      <TouchableOpacity
        style={styles.listingWrap}
        activeOpacity={0.7}
        onPress={() => {
          onPress(item);
        }}>
        <View
          style={[
            util.isRTL() ? AppStyles.rowReverse : AppStyles.flexRow,
            styles.singleList,
          ]}>
          <View
            style={[
              util.isRTL() ? {left: -1} : {marginRight: 20},
              styles.imageWrap,
            ]}>
            <RNImage
              source={item.icon}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          <View
            style={[
              util.isRTL() ? AppStyles.rowReverse : AppStyles.flexRow,
              styles.textWrap,
            ]}>
            <Text
              style={[
                util.isRTL() && {marginRight: 10},
                styles.category_text,
                isCountrySelected && styles.category_text_active,
              ]}>
              {util.isRTL() ? item.name.ar : item.name.en}
            </Text>
            {isCountrySelected && (
              <RNImage
                source={Images.CheckIcon}
                style={styles.checkIcon}
                resizeMode="contain"
              />
            )}
            {!isCountrySelected && (
              <RNImage
                source={Images.UncheckIcon}
                style={styles.checkIcon}
                tintColor={Colors.purple}
                resizeMode="contain"
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default CountryListItem;
