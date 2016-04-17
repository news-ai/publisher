import {
  REQUEST_PUBLISHER,
  RECEIVE_PUBLISHER,
} from '../constants/AppConstants';

const CONTEXT_API_BASE = window.CONTEXT_API_BASE;

export function requestPublisher() {
  return {
    type: REQUEST_PUBLISHER
  };
}

export function receivePublisher(json) {
  return {
    type: RECEIVE_PUBLISHER,
    json
  };
}

export function fetchPublisher(publisherId) {
  return dispatch => {
    dispatch(requestPublisher());
    fetch(`${CONTEXT_API_BASE}/publishers/${publisherId}`, {credentials: 'include'})
      .then( response => response.text())
      .then( body => dispatch(receivePublisher(JSON.parse(body))));
  };
}
