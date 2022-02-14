// @flow

import {
  GET_MY_ORDER_PROPOSALS,
  GET_MY_PROPOSAL_DETAILS,
  RESPOND_TO_PROPOSAL,
  REVISE_PROPOSAL,
  CLEAR_PROPOSAL_DETAILS,
} from './ActionTypes';

export function getMyOrderProposalsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_MY_ORDER_PROPOSALS.REQUEST,
  };
}

export function getMyOrderProposalsSuccess(data) {
  return {
    data,
    type: GET_MY_ORDER_PROPOSALS.SUCCESS,
  };
}

export function getMyProposalDetailsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_MY_PROPOSAL_DETAILS.REQUEST,
  };
}

export function getMyProposalDetailsSuccess(data) {
  return {
    data,
    type: GET_MY_PROPOSAL_DETAILS.SUCCESS,
  };
}

export function respondToProposalRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: RESPOND_TO_PROPOSAL.REQUEST,
  };
}

export function respondToProposalSuccess(data) {
  return {
    data,
    type: RESPOND_TO_PROPOSAL.SUCCESS,
  };
}

export function reviseProposalRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: REVISE_PROPOSAL.REQUEST,
  };
}

export function reviseProposalSuccess(data) {
  return {
    data,
    type: REVISE_PROPOSAL.SUCCESS,
  };
}

export function clearProposalDetails() {
  return {
    type: CLEAR_PROPOSAL_DETAILS,
  };
}
