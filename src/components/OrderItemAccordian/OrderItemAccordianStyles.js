import {Platform, StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    ...AppStyles.mBottom10,
    marginHorizontal: Metrics.smallMargin,
  },
  cardContainer: {
    backgroundColor: Colors.white,
    borderRadius: Metrics.borderRadius,
    // shadowOffset: {
    //   width: 0,
    //   height: 0,
    // },
    // shadowOpacity: 0.05,
    // elevation: 5,

    ...Platform.select({
      android: {
        elevation: 5,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 1.6,
          height: 1.8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 6,
      },
    }),
    ...AppStyles.mBottom10,
    ...AppStyles.basePadding,
    ...AppStyles.alignItemsCenter,
  },
  titlebarContainer: {
    ...AppStyles.flexRow,
    paddingVertical: Metrics.xsmallMargin,
  },
  titleContainer: {
    flex: 1,
    // ...AppStyles.paddingHorizontalBase,
  },
  titleInput: {
    borderWidth: 0,
    color: Colors.black,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.medium,
  },
  removeItemContainer: {
    height: 24,
    width: 24,
    ...AppStyles.centerInner,
  },
  toggleIcon: {
    height: 14,
    width: 14,
  },
  bodyContainer: {
    alignItems: 'flex-start',
  },
  orderItemDescContainer: {
    flex: 1,
    paddingHorizontal: Metrics.smallMargin,
    justifyContent: 'space-between',
  },
  descriptionText: {
    color: Colors.black,
    fontSize: Fonts.size.xxSmall,
    textAlignVertical: 'top',
  },
  orderAtts: {
    justifyContent: 'space-between',
  },
  remarksContainer: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: Colors.black,
    ...AppStyles.mTop10,
  },
  remarksText: {
    flex: 1,
  },
  remarksImage: {
    height: 50,
    width: 50,
  },

  submitBtnWrap: {
    backgroundColor: Colors.black1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    paddingVertical: Metrics.smallMargin,
    borderRadius: Metrics.borderRadiusLarge,
    marginTop: Metrics.baseMargin,
    flexDirection: 'row',
    paddingHorizontal: Metrics.baseMargin,
  },

  submitBtnText: {
    fontSize: Fonts.size.xxxSmall,
    color: Colors.white,
  },
  uploadImgWrap: {
    justifyContent: 'space-between',
  },
  imageStyle: {
    // todo remove fixed values
    width: 120,
    height: 100,
  },
  activeBtn: {
    transform: [{rotate: '180deg'}],
  },
  qtyInputWrap: {paddingRight: Metrics.baseMargin},

  orderItemImageContainer: {
    marginBottom: 10,
  },

  borderError: {
    borderColor: Colors.red,
    borderWidth: 0.7,
  },

  addNotesWrap: {
    alignContent: 'flex-start',
    flex: 1,
    marginTop: Metrics.baseMargin,
  },
});
