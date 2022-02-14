import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.athensGraya,
  },
  wrap: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 18,
  },
  productRow: {
    justifyContent: 'space-between',
    marginTop: 12,
  },

  dateTimeItemWrap: {
    borderRadius: 10,
    borderColor: Colors.resolutionBlue,
    paddingLeft: 32,
    borderWidth: 1,
    paddingRight: 33,
    paddingTop: 18,
    paddingBottom: 18,
    marginBottom: 20,
    flex: 1,
  },

  dateTimeText: {
    fontSize: Fonts.size.font16,
    color: Colors.bluishPurple,
    flex: 3,
    marginTop: -4,
    marginLeft: 10,
  },

  calendarStyle: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    tintColor: Colors.bluishPurple,
  },
  dropDownArrowStyle: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    marginTop: 3,
    tintColor: Colors.bluishPurple,
  },

  subBtnWrap: {
    marginTop: 30,
    marginBottom: 90,
    paddingHorizontal: 10,
  },

  subBtn: {
    paddingVertical: 25,
    borderRadius: 10,
  },
});
