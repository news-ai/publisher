import {
  POST_DISCOVERY_ARTICLE,
  DONE_POST_DISCOVERY_ARTICLE,
  UPDATE_DISCOVERY_INPUT,
  FAIL_POST_DISCOVERY_ARTICLE,
  RECEIVE_DISCOVERY_ARTICLES,
} from '../constants/AppConstants';

import {
  requestArticles,
  receiveArticles,
} from './articleActions';

import {
  removeCache,
  isJsonString,
} from '../utils/assign';

export function fetchReadLaterFeed() {
  return articleActions.fetchReadLaterFeed();
}

export function postArticle() {
  return {
    type: POST_DISCOVERY_ARTICLE,
  };
}

export function receivePostedArticle(body) {
  return {
    type: DONE_POST_DISCOVERY_ARTICLE,
    body
  };
}

export function failPostedArticle() {
  return {
    type: FAIL_POST_DISCOVERY_ARTICLE
  };
}

export function receiveDiscoveryFeed(articles, next) {
  return {
    type: RECEIVE_DISCOVERY_ARTICLES,
    articles,
    next
  };
}

export function fetchDiscoveryFeed() {
  return (dispatch, getState) => {
    if (getState().articleReducer.isReceiving) return;
    dispatch(requestArticles());

    const fetchLink = getState().personReducer.discovery.next ?
    getState().personReducer.discovery.next :
    `${window.CONTEXT_API_BASE}/articles/added_by${removeCache()}`;

    fetch(fetchLink, {credentials: 'include'})
      .then( response => response.text())
      .then( body => {
        if (!isJsonString(body)) return;
        const json = JSON.parse(body);
        Promise.all([
          dispatch(receiveArticles(json.results)),
          dispatch(receiveDiscoveryFeed(json.results, json.next)),
        ]);
      });
  };
}


export function addDiscoveryArticle() {
  return (dispatch, getState) => {
    if (getState().personReducer.discovery.url.length === 0) return;
    dispatch(postArticle());
    fetch(`https://news-discovery1.newsai.org/discovery`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'url': getState().personReducer.discovery.url,
        'added_by': getState().personReducer.person.id,
      })
    })
    .then( response => {
      return response.status === 200 ?
      response.text() : false; }
      )
    .then( body => body ?
      Promise.all([
        dispatch(receivePostedArticle(JSON.parse(body))),
        dispatch(fetchDiscoveryFeed()),
        ]) : dispatch(failPostedArticle()));
  };
}

export function updateDiscoveryInput(url) {
  return {
    type: UPDATE_DISCOVERY_INPUT,
    url
  };
}

