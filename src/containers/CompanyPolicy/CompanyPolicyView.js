import React from 'react';
import _ from 'lodash';
import {
  View,
  Image as RnImage,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {Text, CustomNavbar, Loader} from '../../components';
import HTML from 'react-native-render-html';
import styles from './CompanyPolicyStyles';
import {strings} from '../../constants';
import {Colors, Fonts, AppStyles, Images, Metrics} from '../../theme';
import util from '../../util';
export default function CompanyPolicyView(props) {
  const {policy, loading} = props;

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <CustomNavbar
        title={strings.COMPANY_POLICY}
        titleColor={Colors.white}
        hasBottomRadius={true}
        isNavWithHeader={true}
      />
      <ScrollView
        style={styles.policySec}
        contentContainerStyle={_.isEmpty(policy) && styles.noPolicyFoundStyle}
        showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={styles.loaderWrap}>
            <Loader loading={loading} />
          </View>
        ) : (
          [
            !_.isEmpty(policy) ? (
              [
                util.isRTL() ? (
                  <Text
                    color={Colors.emperor}
                    size={Fonts.size.font13}
                    style={[util.isRTL() && {textAlign: 'right', right: 10}]}>
                    {policy.ar}
                  </Text>
                ) : (
                  <View style={AppStyles.mBottom30}>
                    <HTML
                      source={{html: policy.en}}
                      tagsStyles={{
                        p: util.isRTL() && {textAlign: 'right', marginTop: 5},
                        h1: util.isRTL() && {textAlign: 'right', marginTop: 5},
                        h2: util.isRTL() && {textAlign: 'right', marginTop: 5},
                        h3: util.isRTL() && {textAlign: 'right', marginTop: 5},
                        h4: util.isRTL() && {textAlign: 'right', marginTop: 5},
                        h5: util.isRTL() && {textAlign: 'right', marginTop: 5},
                      }}
                    />
                  </View>
                ),
              ]
            ) : (
              <View
                style={{
                  marginTop: Metrics.doubleBaseMargin,
                }}>
                <Text
                  color={Colors.emperor}
                  type="semiBold"
                  size={Fonts.size.xxxLarge}>
                  {strings.NO_POLICY_FOUND}
                </Text>
              </View>
            ),
          ]
        )}
      </ScrollView>
    </View>
  );
}
