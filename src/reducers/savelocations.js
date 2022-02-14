// @flow
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {
  SAVE_LOCATIONS,
  GET_INITIAL_REGION,
  GET_LOCATIONS,
  ADD_LOCATION,
  REMOVE_LOCATION,
  EDIT_LOCATION,
  CLEAR_FAV_LOCATIONS,
  GET_DRIVER_CORDS,
  GET_UPDATED_TIME_AND_KM,
} from '../actions/ActionTypes';

const initialState = Immutable({
  myLocation: 'my address',
  initialRegion: {},
  favLocations: [],
  driverCords: {},
  driverTimeAndKm: {},
});
export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_LOCATIONS.SUCCESS: {
      return Immutable.merge(state, {
        myLocation: state.myLocation,
      });
    }

    case GET_LOCATIONS.SUCCESS: {
      return Immutable.merge(state, {
        favLocations: action.data,
      });
    }

    case ADD_LOCATION.SUCCESS: {
      return Immutable.merge(state, {
        favLocations: [...state.favLocations, action.data],
      });
    }

    case EDIT_LOCATION.SUCCESS: {
      let tempCart = _.cloneDeep(state.favLocations);
      var index = _.findIndex(tempCart, _.pick(action.data, 'id'));
      tempCart.splice(index, 1, action.data);
      return Immutable.merge(state, {
        favLocations: tempCart,
      });
    }

    case REMOVE_LOCATION.SUCCESS: {
      let temp = _.cloneDeep(state.favLocations);
      const findIndex = _.findIndex(temp, {
        id: action.data,
      });

      temp.splice(findIndex, 1);

      return Immutable.merge(state, {
        favLocations: temp,
      });
    }

    case GET_INITIAL_REGION.SUCCESS: {
      return Immutable.merge(state, {
        initialRegion: action.data,
      });
    }

    case CLEAR_FAV_LOCATIONS: {
      return Immutable.merge(state, {
        favLocations: [],
      });
    }

    case GET_DRIVER_CORDS: {
      return Immutable.merge(state, {
        driverCords: action.data,
      });
    }

    case GET_UPDATED_TIME_AND_KM: {
      return Immutable.merge(state, {
        driverTimeAndKm: action.data,
      });
    }

    default:
      return state;
  }
};
