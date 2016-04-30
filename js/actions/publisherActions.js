import fuzzy from 'fuzzy';
import fetch from 'isomorphic-fetch';
import {
  REQUEST_PUBLISHER,
  RECEIVE_PUBLISHER,
  REQUEST_PUBLISHER_ARTICLES,
  RECEIVE_PUBLISHER_ARTICLES,
  FILTER_PUBLISHERS,
  ROLLOVER_PUBLISHERS,
  SELECT_PUBLISHER,
  DELETE_PUBLISHER,
  SET_NEXT,
} from '../constants/AppConstants';

import {
  requestArticles,
  receiveArticles,
} from './articleActions';

import {
  removeCache,
  isJsonString,
} from '../utils/assign';

export function updateFilteredPublishers(filtered) {
  return {
    type: FILTER_PUBLISHERS,
    filtered
  };
}

/*
Using `fuzzy` wordfilter to do fuzzy string matching on PublisherSerachBar typeahead.
returns filtered publishers only
*/
export function filterPublishers(word) {
  return (dispatch, getState) => {

  }
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

export function setNext(next) {
  return {
    type: SET_NEXT,
    next
  };
}

export function fetchAllPublishers() {
  return (dispatch, getState) => {
    if (getState().publisherReducer.next === null) return;
    requestPublisher();
    const fetchLink = getState().publisherReducer.next || `${window.CONTEXT_API_BASE}/publishers/`;
    fetch(fetchLink, {credentials: 'include'})
      .then( response => response.text())
      .then( body => {
        const json = JSON.parse(body);
        dispatch(setNext(json.next));
        Promise.all([
          ...json.results.map( publisher => dispatch(receivePublisher(publisher))),
          dispatch(fetchAllPublishers())
          ]);
      });
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

    const fetchLink = getState().publisherReducer[publisherId].next ?
    getState().publisherReducer[publisherId].next :
    `${window.CONTEXT_API_BASE}/publishers/${publisherId}/articles`;

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

