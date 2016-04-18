import {
  REQUEST_PUBLISHER,
  RECEIVE_PUBLISHER,
  REQUEST_PUBLISHER_ARTICLES,
  RECEIVE_PUBLISHER_ARTICLES,
} from '../constants/AppConstants';

import {
  requestArticles,
  receiveArticles,
} from './articleActions';

function removeCache() {
  return window.isDev ? `?${Date.now()}` : ``;
}

function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch ( e ) {
    return false;
  }
  return true;
}

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

export function requestPublisherArticles() {
  return {
    type: REQUEST_PUBLISHER_ARTICLES
  };
}

export function fetchPublisher(publisherId) {
  return dispatch => {
    dispatch(requestPublisher());
    fetch(`${window.CONTEXT_API_BASE}/publishers/${publisherId}/`, {credentials: 'include'})
      .then( response => response.text())
      .then( body => dispatch(receivePublisher(JSON.parse(body))));
  };
}

export function receivePublisherArticles(json, publisherId, next) {
  return {
    type: RECEIVE_PUBLISHER_ARTICLES,
    json,
    publisherId,
    next
  };
}

export function fetchPublisherArticles(publisherId) {
  return (dispatch, getState) => {
    if (getState().publisherReducer[publisherId] === undefined) return;

    dispatch(requestArticles());

    const fetchLink = getState().publisherReducer[publisherId].next === undefined ?
    `${window.CONTEXT_API_BASE}/publishers/${publisherId}/articles${removeCache()}`
    : getState().publisherReducer[publisherId].next;

    fetch(fetchLink, {credentials: 'include'})
      .then( response => response.text())
      .then( body => {
        if (!isJsonString(body)) return;
        const json = JSON.parse(body);
        Promise.all([
          dispatch(receiveArticles(json.results)),
          dispatch(receivePublisherArticles(json.results, publisherId, json.next)),
        ]);
      });
  };
}

export function fetchPublisherAndArticles(publisherId) {
  return dispatch => {
    dispatch(requestPublisher());
    fetch(`${window.CONTEXT_API_BASE}/publishers/${publisherId}/`, {credentials: 'include'})
      .then( response => response.text())
      .then( body => dispatch(receivePublisher(JSON.parse(body))))
      .then( _ => dispatch(fetchPublisherArticles(publisherId)));
  };
}

