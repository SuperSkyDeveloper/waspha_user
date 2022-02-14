import React from 'react';
import {View, FlatList} from 'react-native';
import _ from 'lodash';
import {Text, CustomNavbar, Button, TextInput} from '../../components';
import styles from './SelectCountryStyles';
import {strings, COUNTRY_ITEM_HEIGHT} from '../../constants';
import {AppStyles, Fonts, Colors} from '../../theme';
import CountryListItem from './CountryListItem';
import util from '../../util';

export default class SelectCountryView extends React.PureComponent {
  render() {
    const {
      handleCountrySelect,
      countryList,
      searchCountries,
      selectedCountry,
      onProceed,
    } = this.props;
    return (
      <View style={styles.container}>
        <CustomNavbar
          title={strings.COUNTRY_LIST}
          hasBottomRadius={true}
          titleColor={Colors.white}
        />
        <View style={styles.contentSec}>
          <View style={[AppStyles.mTop20, AppStyles.mBottom35]}>
            <View style={styles.fieldWrapper}>
              <TextInput
                textAlign={util.isRTL() ? 'right' : 'left'}
                containerStyle={AppStyles.flex}
                style={[styles.textFiled]}
                placeholderTextColor={styles.placeholder}
                placeholder={strings.SEARCH}
                onChangeText={data => searchCountries(data)}
              />
            </View>
          </View>
          <View style={[AppStyles.mLeft10, AppStyles.mRight10]}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={countryList}
              getItemLayout={(data, index) => ({
                length: COUNTRY_ITEM_HEIGHT,
                offset: COUNTRY_ITEM_HEIGHT * index,
                index,
              })}
              renderItem={({item}) => {
                const isCountrySelected =
                  !_.isEmpty(selectedCountry) &&
                  selectedCountry.countryCode.includes(item.countryCode);

                return (
                  <CountryListItem
                    item={item}
                    key={item.countryCode}
                    isCountrySelected={isCountrySelected}
                    onPress={handleCountrySelect}
                  />
                );
              }}
              ListEmptyComponent={
                <Text style={styles.emptyComponent}>
                  {strings.NO_ITEMS_FOUND}
                </Text>
              }
            />
          </View>
        </View>
        <View style={styles.loginBtnWrap}>
          <Button
            color={Colors.white}
            background={Colors.resolutionBlue}
            style={[AppStyles.pTop25, AppStyles.pBottom25]}
            size={Fonts.size.medium}
            textStyle={AppStyles.fontBold}
            onPress={onProceed}>
            {strings.PROCEED.toUpperCase()}
          </Button>
        </View>
      </View>
    );
  }
}
