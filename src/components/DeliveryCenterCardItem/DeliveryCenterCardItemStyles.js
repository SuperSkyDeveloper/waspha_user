import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 20,
    marginLeft: 20,
    marginRight: 13,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 10,
    marginTop: 3,
  },

  deliveryImageWrap: {
    padding: 4,
    borderRadius: 100,
    alignSelf: 'center',
  },
  deliveryImage: {
    height: 80,
    width: 80,
    borderRadius: 100,
  },
  deliveryNameWrap: {
    paddingTop: 10,
    alignSelf: 'center',
  },

  deliveryItemSecondSec: {
    flex: 1.1,
    alignItems: 'flex-start',
  },

  orderCodeWrap: {
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: Colors.white,
    marginLeft: Metrics.doubleBaseMargin + 30,
    marginRight: Metrics.doubleBaseMargin + 30,
    marginTop: Metrics.smallMargin,
    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    flex: 1,
    flexDirection: 'row',
  },
  orderCodeHeadTextWrap: {
    marginLeft: 15,
    marginRight: 14,
  },
  orderCodeHeadText: {
    fontWeight: 'bold',
    color: Colors.black,
    alignSelf: 'center',
  },
  orderCodeContentTextWrap: {
    marginTop: 3,
    marginLeft: 24,
    marginRight: 24,
  },
  orderCodeContentText: {
    fontWeight: 'bold',
    color: Colors.grey2,
  },

  detailsWrap: {
    marginTop: 10,
    alignSelf: 'center',
  },

  detailsText: {
    fontSize: 10,
    opacity: 0.6,
    color: Colors.grey5,
    fontWeight: 'bold',
  },

  dateWrap: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 13,
    paddingBottom: 13,
    paddingHorizontal: 12,

    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    marginTop: 10,
    borderRadius: 6,
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
  dateStyle: {
    fontSize: 8,
    fontWeight: '600',
    color: Colors.black,
  },
  dateImage: {
    width: 18,
    height: 18,
  },
  deliverySec: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },

  deliveryWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deliveryIcon: {
    marginTop: 15,
    marginLeft: 5,
    height: 25,
    width: 30,
  },
  orderCodeSec: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  orderTypeStyle: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: Metrics.baseMargin,
    top: Metrics.baseMargin,
  },
});
