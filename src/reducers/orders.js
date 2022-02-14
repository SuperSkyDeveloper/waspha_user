// @flow
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {
  REMOVE_ORDER,
  REMOVE_PROPOSAL_ITEM,
  GET_MY_ORDER_DETAILS,
  GET_REORDER_LIST,
  GET_REORDER_DETAILS,
  IS_ORDER_RATED,
  GET_ACTIVE_ORDERS,
} from '../actions/ActionTypes';
import {Images} from '../theme';

const initialState = Immutable({
  rfpOrderDetails: {},
  reOrderList: [],
  reOrderDetails: {},
  activeOrders:[],
  orderRated: false,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MY_ORDER_DETAILS.SUCCESS: {
      return Immutable.merge(state, {
        rfpOrderDetails: action.data,
      });
    }

    case REMOVE_ORDER.SUCCESS: {
      let temp = _.cloneDeep(state.orders);
      const findIndex = _.findIndex(temp, {
        id: action.data,
      });
      temp.splice(findIndex, 1);
      return Immutable.merge(state, {
        orders: temp,
      });
    }
    case REMOVE_PROPOSAL_ITEM.SUCCESS: {
      let temp = _.cloneDeep(state.orders);
      const findIndex = _.findIndex(temp.proposal, {
        id: action.data,
      });
      const data = temp.proposal;

      const test = data.filter((item, index) => {
        item == action.data;
      });

      temp.splice(findIndex, 1);
      return Immutable.merge(state, {
        orders: temp,
      });
    }

    case GET_REORDER_LIST.SUCCESS: {
      return Immutable.merge(state, {
        reOrderList: action.data,
      });
    }

    case GET_REORDER_DETAILS.SUCCESS: {
      return Immutable.merge(state, {
        reOrderDetails: action.data,
      });
    }

    case IS_ORDER_RATED.SUCCESS: {
      return Immutable.merge(state, {
        orderRated: action.data,
      });
    }

    case GET_ACTIVE_ORDERS.SUCCESS: {
      return Immutable.merge(state, {
        activeOrders: action.data,
      });
    }

    default:
      return state;
  }
};
