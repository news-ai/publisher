import fetch from 'isomorphic-fetch';

import {
  REQUEST_AUTHOR,
  RECEIVE_AUTHOR,
} from '../constants/AppConstants';

export function requestAuthor() {
  return {
    type: REQUEST_AUTHOR
  };
}

export function receiveAuthor(json) {
  return {
    type: RECEIVE_AUTHOR,
    json
  };
}

export function fetchAuthor(authorId) {
  return dispatch => {
    dispatch(requestAuthor);
    fetch(`${window.CONTEXT_API_BASE}/authors/${authorId}/`, { credentials: 'include' })
      .then( response => response.text())
      .then( body => dispatch(receiveAuthor(JSON.parse(body))));
  };
}
