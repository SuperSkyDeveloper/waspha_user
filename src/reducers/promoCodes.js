// @flow
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {
  APPLY_PROMO_CODE,
  CLEAR_PROMO_CODE,
  GET_PROMO_CODES,
} from '../actions/ActionTypes';
import {setTimer} from '../helpers/generalHelper';
import moment from 'moment';

const initialState = Immutable({
  promos: [],

  selectedPromoCode: null,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROMO_CODES.SUCCESS: {
      let filteredData = [];
      if (_.isEmpty(state.promos)) {
        filteredData = getData(action.data);
      } else {
        let incomingData = [];

        incomingData = _.filter(action.data, item => {
          let index = _.findIndex(state.promos, {id: item.id});
          if (index < 0 && moment().isSameOrBefore(moment(item.end_time))) {
            return item;
          }
        });

        if (!_.isEmpty(incomingData)) {
          filteredData = getData(incomingData);
        }
      }

      return Immutable.merge(state, {
        promos: [...state.promos, ...filteredData],
      });
    }

    case APPLY_PROMO_CODE.SUCCESS: {
      return Immutable.merge(state, {
        selectedPromoCode: action.data,
      });
    }

    case CLEAR_PROMO_CODE: {
      return Immutable.merge(state, {
        selectedPromoCode: null,
      });
    }

    default:
      return state;
  }
};

function getData(data) {
  let temp = _.cloneDeep(data);

  let itemsAfterTimer = temp.map(({end_time, ...rest}) => ({
    end_time: setTimer(end_time),
    ...rest,
  }));
  return itemsAfterTimer;
}
