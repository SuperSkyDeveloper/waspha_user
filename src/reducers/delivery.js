import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {
  GET_DELIVERY_LIST,
  GET_DELIVERY_DETAILS,
  GET_DELIVERY_STATUS_DETAILS,
} from '../actions/ActionTypes';

const initialState = Immutable({
  deliveryList: [],

  deliveryDetails: {},
  deliveryStatusDetails: {},
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DELIVERY_LIST.SUCCESS: {
      return Immutable.merge(state, {
        deliveryList: action.data,
      });
    }

    case GET_DELIVERY_DETAILS.SUCCESS: {
      return Immutable.merge(state, {
        deliveryDetails: action.data,
      });
    }

    case GET_DELIVERY_STATUS_DETAILS.SUCCESS: {
      return Immutable.merge(state, {
        deliveryStatusDetails: action.data,
      });
    }
    default:
      return state;
  }
};
