import React from 'react';
import {View, Image as RnImage, FlatList} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Text, FaqItem, CustomNavbar, Loader} from '../../components';
import styles from './FAQSStyles';
import {Colors} from '../../theme';
import {strings} from '../../constants';
import util from '../../util';

export default function FAQSView(props) {
  const {faqs, activeIndex, handleIndex, loading} = props;
  return (
    <View style={styles.container}>
      <CustomNavbar
        title={`${
          util.isRTL() ? strings.FAQ : `${strings.FAQ.toUpperCase()}s `
        }`}
        titleColor={Colors.white}
        hasBottomRadius={true}
      />
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <FlatList
          data={faqs}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            const active = activeIndex === item.id;
            return (
              <FaqItem item={item} toggler={handleIndex} active={active} />
            );
          }}
          ListEmptyComponent={
            <Text
              type="medium"
              style={styles.emptyComponent}
              textAlign="center">
              {strings.NO_FAQS_FOUND}
            </Text>
          }
        />
      )}
    </View>
  );
}
