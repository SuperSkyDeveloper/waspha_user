// @flow
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {GET_RFP_LISTING, CANCEL_RFP} from '../actions/ActionTypes';

const initialState = Immutable({
  rfpListing: [],
});
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_RFP_LISTING.SUCCESS: {
      let rfpListing = _.cloneDeep(
        state.rfpListing.filter(item => {
          return item.status !== action.data.status;
        }),
      );

      rfpListing.push(...action.data.items);
      return Immutable.merge(state, {
        rfpListing,
      });
    }

    case CANCEL_RFP.SUCCESS: {
      let rfpListing = _.cloneDeep(state.rfpListing);
      const findIndex = _.findIndex(state.rfpListing, {
        id: action.data,
      });
      rfpListing.splice(findIndex, 1);
      return Immutable.merge(state, {
        rfpListing,
      });
    }

    default:
      return state;
  }
};
