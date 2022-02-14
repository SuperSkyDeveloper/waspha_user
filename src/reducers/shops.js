import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {
  GET_NEARBY_SHOPS,
  GET_SHOP_DETAILS,
  GET_SHOP_REVIEWS,
  GET_QUEUE,
  CLEAR_QUEUE_VENDORS,
  NO_QUEUE_VENDORS_FOUND,
  FAKE_ORDER_FOUND,
  STORE_SELECTED_SHOP_ID,
  CLEAR_SELECTED_SHOP_ID,
} from '../actions/ActionTypes';

const initialState = Immutable({
  nearByShops: [],
  shopDetails: {},
  shopReviews: [],
  queueVendors: [],
  noQueueVendorsFound: false,
  fakeOrderFound: false,
  selectedShopId:null
});
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_NEARBY_SHOPS.SUCCESS: {
      if (_.isEmpty(action.data)) {
        return Immutable.merge(state, {
          nearByShops: [],
        });
      } else {
        return Immutable.merge(state, {
          nearByShops: [...action.data],
        });
      }
    }

    case GET_SHOP_DETAILS.SUCCESS: {
      return Immutable.merge(state, {
        shopDetails: action.data,
      });
    }

    case GET_SHOP_REVIEWS.SUCCESS: {
      return Immutable.merge(state, {
        shopReviews: action.data,
      });
    }

    case GET_QUEUE.SUCCESS: {
      return Immutable.merge(state, {
        queueVendors: action.data,
      });
    }

    case CLEAR_QUEUE_VENDORS: {
      return Immutable.merge(state, {
        queueVendors: [],
      });
    }

    case NO_QUEUE_VENDORS_FOUND: {
      return Immutable.merge(state, {
        noQueueVendorsFound: action.data,
      });
    }

    case FAKE_ORDER_FOUND: {
      return Immutable.merge(state, {
        fakeOrderFound: action.data,
      });
    }

    case STORE_SELECTED_SHOP_ID:
      
      return Immutable.merge(state, {
        selectedShopId: action.data,
      });


      case CLEAR_SELECTED_SHOP_ID:
      
        return Immutable.merge(state, {
          selectedShopId: null
        });

    default:
      return state;
  }
};
