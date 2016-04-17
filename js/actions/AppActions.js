import {
  REQUEST_FEED,
  RECEIVE_FEED,
  REQUEST_ENTITY,
  RECEIVE_ENTITY,
  REQUEST_ENTITIES,
  RECEIVE_ENTITIES,
  REQUEST_ENTITY_ARTICLES,
  REQUEST_AUTHOR,
  RECEIVE_AUTHOR,
  REQUEST_PUBLISHER_ARTICLES,
  RECEIVE_PUBLISHER_ARTICLES,
  RECEIVE_ENTITY_ARTICLES,
  REQUEST_ADDITIONAL_FEED,
  RECEIVE_ADDITIONAL_FEED,
} from '../constants/AppConstants';

import * as loginActions from './loginActions';
import * as publisherActions from './publisherActions';
import * as articleActions from './articleActions';

import fetch from 'isomorphic-fetch';

const CONTEXT_API_BASE = `https://context.newsai.org/api`;
window.CONTEXT_API_BASE = CONTEXT_API_BASE;

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
    `${CONTEXT_API_BASE}/entities/${entityId}/articles${removeCache()}`;
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
    return fetch(CONTEXT_API_BASE + `/entities/` + entityId, { credentials: 'include'})
      .then( response => response.text())
      .then( body => dispatch(receiveEntity(JSON.parse(body))));
  };
}

export function fetchEntityAndArticles(entityId) {
  return dispatch => {
    dispatch(requestEntity(entityId));
    return fetch(`${CONTEXT_API_BASE}/entities/${entityId}`, { credentials: 'include'})
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

function requestAdditionalFeed() {
  return {
    type: REQUEST_ADDITIONAL_FEED
  };
}

function receiveAdditionalFeed(json, next) {
  return {
    type: RECEIVE_ADDITIONAL_FEED,
    json,
    next
  };
}

export function fetchAdditionalFeed() {
  return (dispatch, getState) => {
    if (getState().feedReducer.isReceiving) return;
    dispatch(requestAdditionalFeed());
    dispatch(requestArticles());
    return fetch(getState().feedReducer.next, { credentials: 'include'})
      .then( response => response.text())
      .catch( e => console.log(e))
      .then( body => {
        if (!isJsonString(body)) return;
        const json = JSON.parse(body);
        Promise.all([
          dispatch(receiveArticles(json.results)),
          dispatch(receiveAdditionalFeed(json.results, json.next))
        ]);
      });
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
    fetch(CONTEXT_API_BASE + `/authors/` + authorId, {credentials: 'include'})
      .then( response => response.text())
      .then( body => dispatch(receiveAuthor(JSON.parse(body))));
  };
}

export function requestPublisherArticles() {
  return {
    type: REQUEST_PUBLISHER_ARTICLES
  };
}

// publisherActions
function requestPublisher() {
  return publisherActions.requestPublisher();
}

function receivePublisher(json) {
  return publisherActions.receivePublisher(json);
}

export function fetchPublisher(publisherId) {
  return publisherActions.fetchPublisher(publisherId);
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
    `${CONTEXT_API_BASE}/publishers/${publisherId}/articles${removeCache()}`
    : getState().publisherReducer[publisherId].next;

    fetch(fetchLink, {credentials: 'include'})
      .then( response => response.text())
      .catch( e => console.log(e))
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
    fetch(`${CONTEXT_API_BASE}/publishers/${publisherId}`, {credentials: 'include'})
      .then( response => response.text())
      .then( body => dispatch(receivePublisher(JSON.parse(body))))
      .then( _ => dispatch(fetchPublisherArticles(publisherId)));
  };
}
