import {StyleSheet} from 'react-native';
import {Metrics, Colors} from '../../theme';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  textInputWrap: {
    backgroundColor: Colors.white,
    height: 48,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 15,
    marginTop: 30,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  rowWrap: {
    backgroundColor: Colors.white,
    padding: 13,
    flexDirection: 'row',
    width: Metrics.screenWidth - 20,
  },

  rowItemWrap: {
    flexDirection: 'row',
    width: Metrics.screenWidth - 90,
  },

  favIcon: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
