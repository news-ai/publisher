import {
  REQUEST_ENTITY,
  RECEIVE_ENTITY,
  REQUEST_ENTITIES,
  RECEIVE_ENTITIES,
  REQUEST_ENTITY_ARTICLES,
  REQUEST_AUTHOR,
  RECEIVE_AUTHOR,
  RECEIVE_ENTITY_ARTICLES,
  POST_DISCOVERY_ARTICLE,
  DONE_POST_DISCOVERY_ARTICLE,
  UPDATE_DISCOVERY_INPUT,
  FAIL_POST_DISCOVERY_ARTICLE,
} from '../constants/AppConstants';

import {
  removeCache,
  isJsonString,
} from '../utils/assign';

import * as loginActions from './loginActions';
import * as publisherActions from './publisherActions';
import * as articleActions from './articleActions';
import * as feedActions from './feedActions';

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

export function receivePostedArticle() {
  return {
    type: DONE_POST_DISCOVERY_ARTICLE,
  };
}

export function failPostedArticle() {
  return {
    type: FAIL_POST_DISCOVERY_ARTICLE
  };
}

export function addDiscoveryArticle() {
  return (dispatch, getState) => {
    const body = JSON.stringify({
      'url': getState().personReducer.discovery.url,
      'added_by': getState().personReducer.person.id,
    });
    dispatch(postArticle);
    fetch(`http://news-discovery1.newsai.org/discovery`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
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
      dispatch(receivePostedArticle()) : dispatch(failPostedArticle()));
  };
}

export function updateDiscoveryInput(url) {
  return {
    type: UPDATE_DISCOVERY_INPUT,
    url
  };
}


function doneFetchingArticleEntities() {
  return {
    type: RECEIVE_ENTITIES
  };
}

export function requestArticleEntities(articleId) {
  return {
    type: REQUEST_ENTITIES,
    articleId
  };
}

export function requestEntity(entityId) {
  return {
    type: REQUEST_ENTITY,
    entityId
  };
}

export function receiveEntity(json) {
  return {
    type: RECEIVE_ENTITY,
    json
  };
}

export function requestEntityArticles() {
  return {
    type: REQUEST_ENTITY_ARTICLES
  };
}

export function receiveEntityArticles(json, entityId, next) {
  return {
    type: RECEIVE_ENTITY_ARTICLES,
    json,
    entityId,
    next
  };
}

export function fetchEntityArticles(entityId) {
  return (dispatch, getState) => {
    if (getState().entityReducer[entityId] === undefined) return;

    dispatch(requestArticles());

    const fetchLink = getState().entityReducer[entityId].next ?
    getState().entityReducer[entityId].next :
    `${window.CONTEXT_API_BASE}/entities/${entityId}/articles${removeCache()}`;
    fetch(fetchLink, { credentials: 'include'})
      .then( response => response.text())
      .catch( e => console.log(e))
      .then( body => {
        if (!isJsonString(body)) return;
        const json = JSON.parse(body);

        Promise.all([
          dispatch(receiveArticles(json.results)),
          dispatch(receiveEntityArticles(json.results, entityId, json.next))
        ]);
      });
  };
}

export function fetchEntity(entityId) {
  return dispatch => {
    dispatch(requestEntity(entityId));
    return fetch(`${window.CONTEXT_API_BASE}/entities/${entityId}/`, { credentials: 'include'})
      .then( response => response.text())
      .then( body => dispatch(receiveEntity(JSON.parse(body))));
  };
}

export function fetchEntityAndArticles(entityId) {
  return dispatch => {
    dispatch(requestEntity(entityId));
    return fetch(`${window.CONTEXT_API_BASE}/entities/${entityId}/`, { credentials: 'include'})
      .then( response => response.text())
      .then( body => dispatch(receiveEntity(JSON.parse(body))))
      .then( _ => dispatch(fetchEntityArticles(entityId)));
  };
}

export function fetchArticleEntities(articleId) {
  return (dispatch, getState) => {
    const article = getState().articleReducer[articleId];
    const entityIds = article.entity_scores.map( entity => entity.entity_id);
    dispatch(requestArticleEntities(articleId));
    Promise.all(entityIds.map( id => dispatch(fetchEntity(id))))
      .then( _ => dispatch(doneFetchingArticleEntities()));
  };
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
