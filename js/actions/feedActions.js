import {
  REQUEST_FEED,
  RECEIVE_FEED,
} from '../constants/AppConstants';

import {
	requestArticles,
	receiveArticles,
} from './articleActions';

const CONTEXT_API_BASE = `https://context.newsai.org/api`;

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

export function requestFeed() {
  return {
    type: REQUEST_FEED
  };
}

export function receiveFeed(json, next) {
  return {
    type: RECEIVE_FEED,
    json,
    next
  };
}


export function fetchFeed() {
  return (dispatch, getState) => {
    dispatch(requestFeed());
    dispatch(requestArticles());
    const fetchLink = getState().feedReducer.next ?
    getState().feedReducer.next :
    `${CONTEXT_API_BASE}/feeds${removeCache()}`;
    return fetch(fetchLink, { credentials: 'include'})
      .then( response => response.text())
      .catch( e => console.log(e))
      .then( body => {
        if (!isJsonString(body)) return;
        const json = JSON.parse(body);
        Promise.all([
          dispatch(receiveArticles(json.results)),
          dispatch(receiveFeed(json.results, json.next))
          ]);
      });
  };
}