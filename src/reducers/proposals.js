// @flow
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {
  GET_MY_ORDER_PROPOSALS,
  GET_MY_PROPOSAL_DETAILS,
  RESPOND_TO_PROPOSAL,
  CLEAR_PROPOSAL_DETAILS,
} from '../actions/ActionTypes';

const initialState = Immutable({
  proposals: [],
  proposalDetails: {},
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MY_ORDER_PROPOSALS.SUCCESS: {
      return Immutable.merge(state, {
        proposals: action.data,
      });
    }

    case GET_MY_PROPOSAL_DETAILS.SUCCESS: {
      return Immutable.merge(state, {
        proposalDetails: action.data,
      });
    }

    case RESPOND_TO_PROPOSAL.SUCCESS: {
      let proposals = _.cloneDeep(state.proposals);
      let proposalDetails = _.cloneDeep(state.proposalDetails);
      if (action.data.accept) {
      } else {
        const findIndex = _.findIndex(state.proposals, {
          id: action.data.proposal_id,
        });
        proposals.splice(findIndex, 1);
        proposalDetails = {};
      }
      return Immutable.merge(state, {
        proposals,
        proposalDetails,
      });
    }

    case CLEAR_PROPOSAL_DETAILS: {
      return Immutable.merge(state, {
        proposalDetails: [],
      });
    }

    default:
      return state;
  }
};
