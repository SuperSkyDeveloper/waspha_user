import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  downArrowImageWrap: {
    marginTop: 25,
    marginBottom: 20,
  },
  downArrowImage: {
    width: 30,
    height: 30,
    opacity: 0.5,
  },
  contentSection: {
    marginLeft: 12,
    marginRight: 10,
  },
  cardOne: {
    marginTop: 13,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingLeft: 38,
    paddingRight: 10,
    marginHorizontal: 3,
    borderRadius: 12,
    marginBottom: 8,

    // shadow
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardTwo: {
    backgroundColor: 'white',
    marginHorizontal: 3,
    paddingBottom: 10,
    borderRadius: 12,

    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  dateWrapStyle: {
    marginBottom: 10,
    marginLeft: 12,
    marginTop: 10,
    width: '60%',
  },
  dateStyle: {
    fontSize: 9,
    fontWeight: '600',
    color: '#1d2126',
  },

  dateImage: {
    marginLeft: 5,
    width: 12,
    height: 12,
  },
  proposalWrap: {
    marginTop: 22,
    marginBottom: 11,
    marginLeft: 37,
    marginRight: 20,
  },
  proposalText: {
    fontSize: 22,
    color: Colors.grey4,
    fontWeight: 'bold',
  },
  orderCodeText: {
    fontSize: 13,
    color: Colors.black1,
    fontWeight: 'bold',
    opacity: 0.4,
  },
  cardTwoChildOne: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 14,
    paddingTop: 19,
    paddingLeft: 19,
    paddingRight: 28,
    flexDirection: 'row',
    borderBottomWidth: 0.2,
    marginBottom: 9,
  },
  cardTwoChildTwo: {
    flexDirection: 'row',
  },
  cardTwoMargin: {
    marginLeft: 10,
    marginTop: 10,
  },

  storeName: {},

  timeAgo: {},

  totalAmountWrap: {marginTop: 44, right: 27},
  totalAmountText: {
    left: 33,
    fontWeight: 'bold',
    color: Colors.purple,
    opacity: 0.74,
  },

  storeNameTextTwo: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  timeAgoText: {
    color: Colors.grey4,
    fontWeight: 'bold',
    fontSize: 8,
  },
  creditCardStyle: {
    width: 36,
    height: 36,
  },

  lightColorTextStyle: {
    left: 4,
    fontSize: 10,
    fontWeight: 'bold',
    opacity: 0.7,
    color: Colors.gray12,
  },
  riderRatingWrap: {
    flexDirection: 'row',
  },

  starIconStyle: {
    width: 22,
    height: 21,
  },
  beautyImageWrap: {
    marginLeft: 5,
  },
  beautyImageStyle: {
    height: 165,
    width: 170,
    borderRadius: 10,
  },
  billWrap: {
    height: 100,
    width: '100%',
    flex: 1,
  },
  estimatedCardWrap: {
    backgroundColor: 'red',
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
  },
  estBillWrap: {
    alignItems: 'center',
    marginRight: 40,
  },
  amountWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  estBillText: {
    fontSize: 18,
    color: Colors.white,
    fontWeight: 'bold',
    opacity: 0.9,
  },
  espText: {
    fontSize: 12,
    color: Colors.white,
    paddingBottom: 25,
    fontWeight: 'bold',
    opacity: 0.7,
  },
  amtText: {
    fontSize: 33,
    color: Colors.white,
    fontWeight: 'bold',
    opacity: 0.7,
  },
  submitBtnWrap: {
    paddingTop: 36,
    paddingBottom: 15,
    paddingRight: 40,
    paddingLeft: 40,
  },
  submitBtn: {
    height: 50,
    borderRadius: 10,
    backgroundColor: '#002286',
  },

  submitBtnText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  estimatedTextWrap: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 20,
  },
  espTextStyle: {
    flex: 1,
    marginTop: 23,
    flexDirection: 'row',
    marginRight: 40,
  },
  estimatedBillWrap: {marginHorizontal: 40},
});
