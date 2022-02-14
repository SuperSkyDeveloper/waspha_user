import React from 'react';
import _ from 'lodash';
import {
  View,
  Image as RnImage,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  Text,
  CustomNavbar,
  ProposalDetailCard,
  AccordionItem,
  Button,
  DateItem,
  Maps,
  ShareModal,
  RemoveItemModal,
  OrderItemAccordian,
  Loader,
} from '../../components';
import styles from './ProposalDetailStyles';
import {Fonts, Colors, AppStyles, Metrics} from '../../theme';
import {
  strings,
  DATE_FORMAT2,
  TIME_FORMAT2,
  ORDER_ITEM_TYPE,
  TIME_FORMAT1,
} from '../../constants';
import util from '../../util';

export default function ProposalDetailView(props) {
  const {
    handleIndex,
    activeIndex,
    proposalDetails,
    handleRemoveProposalItem,
    handleRemoveProposal,
    handleShareBtn,
    isShareModelShow,
    isAccordionItemRemoveable,
    removeItemModal,
    setValue,
    removeProposal,
    handleCloseRemoveProposal,
    loading,
    isMoreProposalsModal,
    hanldleMoreProposalsModal,
    checkOtherProposals,
    disableButtons,
    fromPastRFP,
    proposalId,
    rejectProposal,
    isDisabled,
  } = props;

  return (
    <View style={styles.container}>
      <CustomNavbar
        hasBottomRadius={true}
        title={strings.PROPOSAL_DETAIL}
        titleColor={Colors.white}
      />
      {loading || _.isEmpty(proposalDetails) ? (
        <Loader loading={loading || _.isEmpty(proposalDetails)} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.wrapper}>
          {/*  */}
          <View
            style={[
              util.isRTL() ? AppStyles.rowReverse : AppStyles.flexRow,
              styles.infoSec,
            ]}>
            <View style={[styles.mtop, styles.center]}>
              <Text
                style={AppStyles.mBottom5}
                size={Fonts.size.font10}
                color={Colors.jumbo}>
                {strings.EXPIRY_DATE}
              </Text>
              <DateItem
                date={util.getFormattedDateTime(
                  proposalDetails.expiry_time,
                  DATE_FORMAT2,
                )}
                fontSize={Fonts.size.font10}
                color={Colors.shark}
              />
            </View>
            <View style={{top: -44, right: 10}}>
              {/* todo */}
              {/* <Text
                size={Fonts.size.font23}
                color={Colors.black}
                type="semiBold">
                Category A
              </Text> */}
              <Text
                size={Fonts.size.xLarge}
                color={Colors.doveGray}
                type="medium"
                textAlign="center">
                {strings.PROPOSAL}
              </Text>
            </View>
            <View style={[styles.mtop, styles.center]}>
              <Text size={Fonts.size.font10} color={Colors.jumbo}>
                {strings.EXPIRY_TIME}
              </Text>
              <View style={styles.borderStyle}>
                <Text size={Fonts.size.font10} color={Colors.jumbo}>
                  {util.getFormattedDateTime(
                    proposalDetails.expiry_time,
                    TIME_FORMAT1,
                  )}
                </Text>
              </View>
            </View>
          </View>
          {/*  */}
          <View style={[AppStyles.mTop5]}>
            <ProposalDetailCard proposalDetails={proposalDetails} />
          </View>
          {/*  */}

          <View>
            <View style={styles.accordinWrap}>
              <FlatList
                data={proposalDetails.items}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) => {
                  const active = index === activeIndex;
                  return (
                    <OrderItemAccordian
                      active={active}
                      toggleAccordinPress={handleIndex}
                      data={item}
                      index={index}
                      itemType={ORDER_ITEM_TYPE.forProposal}
                    />
                  );
                }}
              />
            </View>

            {/*  */}
            <View style={styles.btnWrap}>
              <TouchableOpacity
                disabled={disableButtons || isDisabled}
                activeOpacity={0.7}
                style={[styles.btn, styles.redBg]}
                onPress={() => {
                  // setValue({removeProposal: true});
                  rejectProposal();
                }}>
                <Text
                  style={(disableButtons || isDisabled) && {opacity: 0.5}}
                  size={Fonts.size.font14}
                  color={Colors.white}
                  type="bold">
                  {strings.REJECT}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={
                  disableButtons ||
                  isDisabled ||
                  proposalDetails.allowed_number_of_revisions ==
                    proposalDetails.revision_number
                }
                activeOpacity={0.7}
                style={[styles.btn, styles.greenBg]}
                onPress={() => {
                  Actions.proposalRevision({
                    proposalId: proposalId,
                    remainingRevisions:
                      proposalDetails.allowed_number_of_revisions -
                      proposalDetails.revision_number,
                  });
                }}>
                <Text
                  style={
                    (disableButtons ||
                      isDisabled ||
                      proposalDetails.allowed_number_of_revisions ==
                        proposalDetails.revision_number) && {opacity: 0.5}
                  }
                  size={Fonts.size.font14}
                  color={Colors.white}
                  type="bold">
                  {strings.REVISE}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={[styles.btn, styles.greyBg]}
                onPress={handleShareBtn}>
                <Text size={Fonts.size.font14} color={Colors.white} type="bold">
                  {strings.SHARE}
                </Text>
              </TouchableOpacity>
            </View>
            {/*  */}

            {!isDisabled ? (
              <View style={styles.subBtnWrap}>
                <Button
                  color={Colors.white}
                  background={Colors.resolutionBlue}
                  style={[AppStyles.btnStyle1, AppStyles.shadow5]}
                  onPress={checkOtherProposals}
                  isLoading={false}
                  indicatorColor={Colors.white}
                  type="bold">
                  {
                    // disableButtons
                    //   ? strings.MAKE_PAYMENT
                    //   :
                    strings.ACCEPT_PROPOSAL
                  }
                </Button>
              </View>
            ) : (
              <View style={AppStyles.mTop40} />
            )}
          </View>

          {/*  */}
        </ScrollView>
      )}

      {isShareModelShow && (
        <ShareModal open={isShareModelShow} onPress={handleShareBtn} />
      )}

      {removeProposal && (
        <RemoveItemModal
          title={`${strings.ARE_YOU_SURE_TO_REJECT} ${
            util.isRTL() ? '؟' : '?'
          }`}
          btnOneText={util.renderStrings().YES}
          btnTwoText={util.renderStrings().NO}
          isModalOpen={removeProposal}
          btnPositiveFunc={handleRemoveProposal}
          btnNegativeFunc={handleCloseRemoveProposal}
          closeModal={setValue}
          modalType="removeProposal"
        />
      )}
    </View>
  );
}
