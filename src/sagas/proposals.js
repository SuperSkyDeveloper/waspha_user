import {take, put, call, fork} from 'redux-saga/effects';
import {
  GET_MY_ORDER_PROPOSALS,
  GET_MY_PROPOSAL_DETAILS,
  RESPOND_TO_PROPOSAL,
  REVISE_PROPOSAL,
} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT, strings} from '../constants';

import {
  GET_MY_ORDER_PROPOSALS as GET_MY_ORDER_PROPOSALS_URL,
  GET_MY_PROPOSAL_DETAILS as GET_MY_PROPOSAL_DETAILS_URL,
  RESPOND_TO_PROPOSAL as RESPOND_TO_PROPOSAL_URL,
  REVISE_PROPOSAL as REVISE_PROPOSAL_URL,
  callRequest,
} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';
import util from '../util';
import {
  getMyOrderProposalsSuccess,
  getMyProposalDetailsSuccess,
  respondToProposalSuccess,
} from '../actions/ProposalsActions';
import {Actions} from 'react-native-router-flux';
import {alertMessage} from '../actions/GeneralActions';

function alert(message, type = 'error') {
  setTimeout(() => {
    util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* getMyOrderProposals() {
  while (true) {
    const {payload, responseCallback} = yield take(
      GET_MY_ORDER_PROPOSALS.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        GET_MY_ORDER_PROPOSALS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getMyOrderProposalsSuccess(response.data));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
        //util.topAlert(strings.SOMETHING_WENT_WRONG)
        yield put(alertMessage(strings.SOMETHING_WENT_WRONG));
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      Actions.pop();
    }
  }
}

function* getMyProposalDetails() {
  while (true) {
    const {payload, responseCallback} = yield take(
      GET_MY_PROPOSAL_DETAILS.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        GET_MY_PROPOSAL_DETAILS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getMyProposalDetailsSuccess(response.data));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
        //util.topAlert(strings.SOMETHING_WENT_WRONG)
        yield put(alertMessage(strings.SOMETHING_WENT_WRONG));
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      Actions.pop();
    }
  }
}

function* respondToProposal() {
  while (true) {
    const {payload, responseCallback} = yield take(RESPOND_TO_PROPOSAL.REQUEST);
    try {
      const response = yield call(
        callRequest,
        RESPOND_TO_PROPOSAL_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(respondToProposalSuccess(payload));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
        //util.topAlert(strings.SOMETHING_WENT_WRONG)
        yield put(alertMessage(strings.SOMETHING_WENT_WRONG));
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* reviseProposal() {
  while (true) {
    const {payload, responseCallback} = yield take(REVISE_PROPOSAL.REQUEST);
    try {
      const response = yield call(
        callRequest,
        REVISE_PROPOSAL_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        //util.topAlert(response.message);
        yield put(alertMessage(response.message));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
        util.topAlert(response.message || strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

export default function* root() {
  yield fork(getMyOrderProposals);
  yield fork(getMyProposalDetails);
  yield fork(respondToProposal);
  yield fork(reviseProposal);
}
