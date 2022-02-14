import {StyleSheet} from 'react-native';
import {Colors, AppStyles, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingTop: 13,
    paddingBottom: 22,
    paddingLeft: 30,
    paddingRight: 90,
    marginLeft: 23,
    marginRight: 23,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },


backBtnWrap:

{height:40,width:40,backgroundColor:Colors.black,borderRadius:100,top:50},


backBtnStyle:
  {height:25,width:25,top:7,left:6},


  cardOneSec: {},
  cardTwoSec: {marginLeft: 26, marginTop: 10},

  cardTwoSecChildOne: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  driverImageParentStyle: {
    width: 65,
    height: 65,
    overflow: 'hidden',
    borderRadius: 60,
  },
  riderImageWrap: {
    width: 65,
    height: 65,
  },

  riderImage: {
    width: 65,
    height: 65,
  },

  riderNameWrap: {
    marginTop: 3,
    marginBottom: 3,
    alignItems: 'center',
  },

  riderNameText: {
    opacity: 0.6,
    fontWeight: 'bold',
  },
  bikeWrap: {
    position: 'absolute',
    right: 4,
    top: 43,

    bottom: 0,
  },
  bikeImage: {
    height: 25,
    width: 25,
  },
  riderRatingWrap: {
    flexDirection: 'row',
  },

  driverCircularWrap: {
    position: 'absolute',
    bottom: 0,
  },

  starIconStyle: {
    width: 15,
    height: 15,
  },

  etaWrap: {
    marginRight: 9,
  },
  etaText: {
    fontSize: 12,
    fontWeight: 'bold',
    opacity: 0.6,
    color: Colors.black,
  },
  contentSec: {
    marginTop: 200,
  },
  statusOptionText: {
    marginTop: Metrics.xsmallMargin,
    fontWeight: 'bold',
    color: Colors.black1,
  },
  timeCard: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 8,
    paddingLeft: 12,
    flexDirection: 'row',
    backgroundColor: Colors.white,

    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  timeWrap: {
    marginRight: 4,
  },
  tickImage: {
    marginTop: 3,
    marginLeft: 4,
    height: 14,
    width: 15,
  },

  time: {
    fontWeight: 'bold',
    opacity: 0.6,

    color: Colors.black,
  },
  ampmWrap: {},
  ampm: {
    fontSize: 11,
    fontWeight: 'bold',
    opacity: 0.6,

    color: Colors.black,
  },

  envelopeImageWrap: {
    marginLeft: 12,

    backgroundColor: Colors.white,
    width: 30,
    height: 30,
    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    borderRadius: 100,
    elevation: 9,
  },

  envelopeImage: {
    marginTop: 10,
    marginLeft: 8,
  },

  itemCollectWrap: {
    marginTop: 8,
  },

  itemCollect: {
    fontWeight: 'bold',
    color: Colors.black,
    opacity: 0.6,
  },
  itemsCollectWraps: {marginTop: 1, marginRight: 38},
  itemsCollect: { color: Colors.gray12, fontWeight: 'bold'},

  orderstatusWrap: {
    alignItems: 'center',
  },

  orderstatusText: {
    color: Colors.black,
  },
  dateWrap: {
    backgroundColor: Colors.white,
    borderRadius: Metrics.borderRadius,

    marginTop: -12,

    marginBottom: Metrics.baseMargin,
  },

  dateImage: {
    marginLeft: 18,
    width: 10,
    height: 10,
  },

  statusOptionIconWrap: {
    borderRadius: Metrics.borderRadiusXXLarge,
    borderColor: Colors.purple,
    height: 28,
    width: 28,

    borderWidth: 3,
    backgroundColor: Colors.white,
  },
  statusOptionWrap: {
    flex: 1,
    paddingHorizontal: Metrics.doubleMediumBaseMargin,

    marginTop: Metrics.doubleBaseMargin,
    justifyContent: 'space-between',
  },

  statusWrap: {
    paddingBottom: Metrics.baseMargin,

    justifyContent: 'space-between',
  },

  borderStyle: {
    borderLeftColor: Colors.purple,
    borderLeftWidth: 3,
  },

  borderStyleRTL: {
    borderRightColor: Colors.purple,
    borderRightWidth: 3,
  },

  noBorder: {
    borderLeftWidth: 0,
    marginLeft: 3.7,
  },

  noBorderRTL: {
    borderRightWidth: 0,
    marginRight: 3.7,
  },
  submitBtnWrap: {
    paddingVertical: 10,

    paddingHorizontal: 50,
  },
  submitBtn: {
    height: 50,
    borderRadius: 10,
    backgroundColor: Colors.catalinaBlue,
  },

  submitBtnText: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  //chat

  userContactWrap: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },

  contactImage: {
    height: 22,
    width: 22,
    borderRadius: Metrics.borderRadius,
    backgroundColor: Colors.contactEnable,
  },

  disableContactImage: {
    height: 35,
    width: 60,
    borderRadius: Metrics.borderRadius,
    backgroundColor: Colors.contactDisable,
  },

  image: {
marginTop:3,
    alignSelf: 'center',
    height: 15,
    width: 15,
  },

  mapNavIconStyle: {
    position: 'absolute',

    top: -75,
    right: 25,
    zIndex: 999,
  },
});
