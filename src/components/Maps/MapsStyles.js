import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  loaderWrap: {flex: 1, justifyContent: 'center', alignItems: 'center'},

  userPinWrap: {
    position: 'absolute',
    marginTop: -42,
    marginLeft: -11,
    height: 27,
    width: 16,
    left: '51%',
    top: '52%',
    zIndex: 999,
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    width: Metrics.screenWidth,
  },

  currentLocationDetailsWrap: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    minHeight: 35,
    paddingTop: 8,
    paddingRight: 30,
    paddingLeft: 20,
    marginBottom: 17,
  },

  myaddress: {
    color: '#0055ff',
    fontSize: 12,
    fontWeight: '600',
    alignItems: 'center',
  },

  editLocationIcon: {
    position: 'absolute',
    bottom: 0,
    right: 5,
    paddingLeft: 7,
    color: '#0055ff',
  },

  currentPin: {height: 30, width: 30},

  currentLocationWrap: {
    flex: 1,
    width: '100%',
    height: 50,
    // alignItems: 'center',
  },
  callOutStyle: {
    width: 120,
    height: 40,
    zIndex: 10,
    borderRadius: 10,
  },

  callOutStyleVendor: {
    justifyContent: 'center',
  },

  vendorDetailWrap: {
    paddingLeft: Metrics.smallMargin,
    paddingRight: Metrics.xsmallMargin,
    paddingVertical: Metrics.smallMargin,
    backgroundColor: Colors.white,
    minWidth: 90,
    minHeight: 10,
    borderRadius: 10,
    flexDirection: 'row',
  },

  vendorDetailInner: {
    alignItems: 'flex-start',
  },
  vendorIconBtnWrap: {
    alignItems: 'center',
    borderRadius: Metrics.borderRadiusLarge,
    marginTop: Metrics.xsmallMargin,
    borderWidth: 1,
    borderColor: Colors.iceblue,
    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    marginBottom: Metrics.xsmallMargin,
  },

  categoryImageWrapStyle: {
    width: 16,
    height: 16,
    top: 22,
    zIndex: 999,
    left: 11,
    backgroundColor: Colors.white,
    borderRadius: 100,
    overflow: 'hidden',
    alignItems: 'center',
  },
  ratingWrap: {
    marginTop: 7,
    ...AppStyles.flexRow,
  },
});
