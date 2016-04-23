import {
  // REQUEST_ENTITY,
  // RECEIVE_ENTITY,
  // REQUEST_ENTITIES,
  // RECEIVE_ENTITIES,
  // REQUEST_ENTITY_ARTICLES,
  // RECEIVE_ENTITY_ARTICLES,
  REQUEST_AUTHOR,
  RECEIVE_AUTHOR,
  POST_DISCOVERY_ARTICLE,
  DONE_POST_DISCOVERY_ARTICLE,
  UPDATE_DISCOVERY_INPUT,
  FAIL_POST_DISCOVERY_ARTICLE,
  RECEIVE_DISCOVERY_ARTICLES,
} from '../constants/AppConstants';

import {
  removeCache,
  isJsonString,
} from '../utils/assign';

import * as loginActions from './loginActions';
import * as publisherActions from './publisherActions';
import * as articleActions from './articleActions';
import * as feedActions from './feedActions';
import * as entityActions from './entityActions';

// loginActions
export function loginWithGoogle() {
  return loginActions.loginWithGoogle();
}

export function fetchPerson() {
  return loginActions.fetchPerson();
}

// articleActions
export function requestArticles() {
  return articleActions.requestArticles();
}

export function receiveArticles(json) {
  return articleActions.receiveArticles(json);
}

export function fetchArticle(articleId) {
  return articleActions.fetchArticle(articleId);
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

export function addDiscoveryArticle() {
  return (dispatch, getState) => {
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
    .then( response => response.status === 200 ?
      response.text() : false)
    .then( body => body ?
      dispatch(receivePostedArticle(JSON.parse(body))) : dispatch(failPostedArticle()));
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

export function updateDiscoveryInput(url) {
  return {
    type: UPDATE_DISCOVERY_INPUT,
    url
  };
}


function doneFetchingArticleEntities() {
  return entityActions.doneFetchingArticleEntities();
}

export function requestArticleEntities(articleId) {
  return entityActions.requestArticleEntities(articleId);
}

export function requestEntity(entityId) {
  return entityActions.requestEntity(entityId);
}

export function receiveEntity(json) {
  return entityActions.receiveEntity(json);
}

export function requestEntityArticles() {
  return entityActions.requestEntityArticles();
}

export function receiveEntityArticles(json, entityId, next) {
  return entityActions.receiveEntityArticles(json, entityId, next);
}

export function fetchEntityArticles(entityId) {
  return entityActions.fetchEntityArticles(entityId);
}

export function fetchEntity(entityId) {
  return entityActions.fetchEntity(entityId);
}

export function fetchEntityAndArticles(entityId) {
  return entityActions.fetchEntityAndArticles(entityId);
}

export function fetchArticleEntities(articleId) {
  return entityActions.fetchArticleEntities(articleId);
}

export function requestFeed() {
  return feedActions.requestFeed();
}

export function receiveFeed(json, next) {
  return feedActions.receiveFeed(json, next);
}


export function fetchFeed() {
  return feedActions.fetchFeed();
}

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

export function requestPublisherArticles() {
  return publisherActions.requestPublisherArticles();
}

// publisherActions
export function requestPublisher() {
  return publisherActions.requestPublisher();
}

export function receivePublisher(json) {
  return publisherActions.receivePublisher(json);
}

export function fetchPublisher(publisherId) {
  return publisherActions.fetchPublisher(publisherId);
}

export function receivePublisherArticles(json, publisherId, next) {
  return publisherActions.receivePublisherArticles(json, publisherId, next);
}

export function fetchPublisherArticles(publisherId) {
  return publisherActions.fetchPublisherArticles(publisherId);
}

export function fetchPublisherAndArticles(publisherId) {
  return publisherActions.fetchPublisherAndArticles(publisherId);
}
