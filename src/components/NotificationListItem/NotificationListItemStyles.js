import {StyleSheet} from 'react-native';
import {Colors, Metrics} from './../../theme';

export default StyleSheet.create({
  list: {
    paddingVertical: Metrics.mediumBaseMargin,
    borderBottomColor: '#dadce0',
    borderBottomWidth: 1,
    marginHorizontal: Metrics.mediumBaseMargin,
    justifyContent: 'space-between',
  },
  spaceBetween: {
    alignItems: 'center',
  },
  imgWrap: {
    width: 62,
    height: 62,
    borderRadius: 30,
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
  },
  touchSize: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    position: 'absolute',
    right: 0,
    top: 40,
  },
  status: {
    width: 10,
    height: 10,
    backgroundColor: 'red',
    borderRadius: 30,
    marginRight: Metrics.xsmallMargin,
  },
  touchArea: {
    width: 35,
    height: 22,
    paddingRight: 3,
    alignItems: 'flex-end',
  },
});
