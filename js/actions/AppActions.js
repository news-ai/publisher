import { REQUEST_FEED, RECEIVE_FEED, RECEIVE_ENTITY, REQUEST_ENTITIES, RECEIVE_ENTITIES, REQUEST_AUTHOR, RECEIVE_AUTHOR, REQUEST_PUBLISHER, RECEIVE_PUBLISHER, RECEIVE_ENTITY_ARTICLES, REQUEST_ARTICLES, RECEIVE_ARTICLES, REQUEST_ADDITIONAL_FEED, RECEIVE_ADDITIONAL_FEED } from '../constants/AppConstants';
import fetch from 'isomorphic-fetch';

const CONTEXT_API_BASE = `https://context.newsai.org/api`;
const FEED_LIMIT = 20;

function removeCache() {
  return '?' + Date.now();
}

export function requestArticles() {
  return {
    type: REQUEST_ARTICLES
  };
}

export function receiveArticles(json) {
  return {
    type: RECEIVE_ARTICLES,
    json
  };
}

export function fetchArticle(articleId) {
  return (dispatch) => {
    dispatch(requestArticles());
    return fetch(CONTEXT_API_BASE + '/articles/' + articleId)
      .then((response) => response.text())
      .then((body) => dispatch(receiveArticles(JSON.parse(body))));
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

export function receiveEntity(json) {
  return {
    type: RECEIVE_ENTITY,
    json
  };
}

export function receiveEntityArticles(json, entityId) {
  return {
    type: RECEIVE_ENTITY_ARTICLES,
    json,
    entityId
  };
}

export function fetchEntityArticles(entityId) {
  return (dispatch) => {
    dispatch(requestArticles());
    fetch(CONTEXT_API_BASE + '/entities/' + entityId + '/articles' + removeCache())
      .then((response) => response.text())
      .catch((e) => console.log(e))
      .then((body) => {
        Promise.all([
          dispatch(receiveEntityArticles(JSON.parse(body).results, entityId)),
          dispatch(receiveArticles(JSON.parse(body).results))
        ]);
      });
  };
}

export function fetchEntity(entityId) {
  return (dispatch) => {
    return fetch(CONTEXT_API_BASE + '/entities/' + entityId)
      .then((response) => response.text())
      .then((body) => dispatch(receiveEntity(JSON.parse(body))));
  };
}

export function fetchArticleEntities(articleId) {
  return (dispatch, getState) => {
    const article = getState().articleReducer[articleId];
    const entityIds = article.entity_scores.map((entity) => entity.entity_id);
    dispatch(requestArticleEntities(articleId));
    Promise.all(entityIds.map((id) => dispatch(fetchEntity(id))))
      .then(() => dispatch(doneFetchingArticleEntities()));
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
    dispatch(requestAdditionalFeed());
    dispatch(requestArticles());
    return fetch(getState().feedReducer.next)
      .then((response) => response.text())
      .catch((e) => console.log(e))
      .then((body) => {
        const json = JSON.parse(body);
        Promise.all([dispatch(receiveArticles(json.results)), dispatch(receiveAdditionalFeed(json.results, json.next))]);
      });
  };
}

export function fetchFeed() {
  return (dispatch) => {
    dispatch(requestFeed());
    dispatch(requestArticles());
    return fetch(CONTEXT_API_BASE + '/feeds/?limit=' + FEED_LIMIT.toString)
      .then((response) => response.text())
      .catch((e) => console.log(e))
      .then((body) => {
        const json = JSON.parse(body);
        Promise.all([dispatch(receiveArticles(json.results)), dispatch(receiveFeed(json.results, json.next))]);
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
  return (dispatch) => {
    dispatch(requestAuthor);
    fetch(CONTEXT_API_BASE + '/authors/' + authorId)
      .then((response) => response.text())
      .then((body) => dispatch(receiveAuthor(JSON.parse(body))));
  };
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

export function fetchPublisher(publisherId) {
  return (dispatch) => {
    dispatch(requestPublisher());
    fetch(CONTEXT_API_BASE + '/publishers/' + publisherId)
      .then((response) => response.text())
      .then((body) => dispatch(receivePublisher(JSON.parse(body))));
  };
}


