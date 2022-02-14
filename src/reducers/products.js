// @flow
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {
  GET_STORE_PRODUCTS,
  GET_TRENDING_PRODUCTS,
  CLEAR_STORE_PRODUCTS,
} from '../actions/ActionTypes';
import {Images} from '../theme';

const initialState = Immutable({
  products: [],
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_STORE_PRODUCTS.SUCCESS: {
      return Immutable.merge(state, {
        products: _.unionBy(state.products, action.data, 'id'),
      });
    }

    case CLEAR_STORE_PRODUCTS.SUCCESS: {
      return Immutable.merge(state, {
        products: [],
      });
    }

    default:
      return state;
  }
};
