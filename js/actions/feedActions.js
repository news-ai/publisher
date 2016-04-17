import {
  REQUEST_FEED,
  RECEIVE_FEED,
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
  return dispatch => {
    dispatch(requestFeed());
    dispatch(requestArticles());
    return fetch(`${CONTEXT_API_BASE}/feeds${removeCache()}`, { credentials: 'include'})
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