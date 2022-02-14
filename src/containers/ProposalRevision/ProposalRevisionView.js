import React from 'react';
import {View, Image as RnImage, FlatList, ScrollView} from 'react-native';
import {Text, CustomNavbar, Button, OrderItemAccordian} from '../../components';
import styles from './ProposalRevisionStyles';
import {strings, ORDER_ITEM_TYPE} from '../../constants';
import {Colors, Fonts, AppStyles, Images} from '../../theme';
import {Actions} from 'react-native-router-flux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function ProposalRevisionView(props) {
  const {
    handleAccordionIndex,
    activeIndex,
    itemList,
    editable,
    onChangeFiled,
    reviseProposal,
    loading,
    proposalId,
    isRevised,
    remainingRevisions,
  } = props;

  return (
    <View style={styles.container}>
      <CustomNavbar
        title={editable ? strings.PROPOSAL_REVISION : strings.YOUR_ITEMS}
        titleColor={Colors.white}
        hasBottomRadius={true}
      />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        {editable && (
          <View style={styles.headingWrap}>
            <Text
              size={Fonts.size.font23}
              color={Colors.masala}
              type="semiBold">
              {strings.PROPOSAL_REVISION}
            </Text>
            <View style={styles.dashBorder}>
              <Text
                size={Fonts.size.font16}
                color={Colors.grey2}
                type="semiBold">
                {strings.REVISION_REMAINING} {remainingRevisions}
              </Text>
            </View>
          </View>
        )}
        <View style={styles.accordionSec}>
          <FlatList
            data={itemList}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              const active = index === activeIndex;

              return (
                <OrderItemAccordian
                  active={active}
                  toggleAccordinPress={handleAccordionIndex}
                  data={item}
                  index={index}
                  onChange={editable ? onChangeFiled : () => {}}
                  itemType={
                    editable
                      ? ORDER_ITEM_TYPE.createProposalForNewItems
                      : ORDER_ITEM_TYPE.forProposal
                  }
                />
              );
            }}
            ListEmptyComponent={
              <Text style={styles.emptyComponent} textAlign="center">
                {strings.NO_PRODUCTS_FOUND}
              </Text>
            }
          />
        </View>
        <View style={styles.subBtnWrap}>
          <Button
            color={Colors.white}
            background={Colors.resolutionBlue}
            style={[styles.subBtn, AppStyles.shadow5]}
            size={Fonts.size.font17}
            type="bold"
            onPress={
              editable
                ? reviseProposal
                : () => Actions.paymentDetail({proposalId: proposalId})
            }
            isLoading={loading}
            disabled={loading || !isRevised}
            indicatorColor={Colors.white}>
            {editable ? strings.SUBMIT : strings.MAKE_PAYMENT}
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
