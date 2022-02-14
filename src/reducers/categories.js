import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {
  GET_AVAILABLE_CATEGORIES,
  GET_STORE_CATEGORIES,
  CLEAR_STORE_CATEGORIES,
  UPDATE_DELIVERY_METHOD,
} from '../actions/ActionTypes';

const initialState = Immutable({
  availableCategories: [],
  storeCategories: [],
  isDelivery: true,
  isPickup: false,
});
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_AVAILABLE_CATEGORIES.SUCCESS: {
      if (_.isEmpty(action.data)) {
        return Immutable.merge(state, {
          availableCategories: [],
        });
      } else {
        return Immutable.merge(state, {
          availableCategories: [...action.data],
        });
      }
    }

    case GET_STORE_CATEGORIES.SUCCESS: {
      return Immutable.merge(state, {
        storeCategories: _.unionBy(state.storeCategories, action.data, 'id'),
      });
    }

    case CLEAR_STORE_CATEGORIES.SUCCESS: {
      return Immutable.merge(state, {
        storeCategories: [],
      });
    }

    case UPDATE_DELIVERY_METHOD.SUCCESS: {
      return Immutable.merge(state, {
        isDelivery: action.data.isDelivery,
        isPickup: action.data.isPickup,
      });
    }

    default:
      return state;
  }
};
