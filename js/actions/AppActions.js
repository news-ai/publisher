import {
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
import * as discoveryActions from './discoveryActions';

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

export function flipReadLater(articleId) {
  return articleActions.flipReadLater(articleId);
}

export function toggleReadLater(articleId) {
  return articleActions.toggleReadLater(articleId);
}

export function flipStar(articleId) {
  return articleActions.flipStar(articleId);
}

export function toggleStar(articleId) {
  return articleActions.toggleStar(articleId);
}

export function fetchStarredFeed() {
  return articleActions.fetchStarredFeed();
}

export function fetchReadLaterFeed() {
  return articleActions.fetchReadLaterFeed();
}

export function postArticle() {
  return {
    type: POST_DISCOVERY_ARTICLE,
  };
}

export function receivePostedArticle(body) {
  return discoveryActions.receivePostedArticle(body);
}

export function failPostedArticle() {
  return discoveryActions.failPostedArticle();
}

export function receiveDiscoveryFeed(articles, next) {
  return discoveryActions.receiveDiscoveryFeed(articles, next);
}

export function fetchDiscoveryFeed() {
  return discoveryActions.fetchDiscoveryFeed();
}


export function addDiscoveryArticle() {
  return discoveryActions.addDiscoveryArticle();
}

export function updateDiscoveryInput(url) {
  return discoveryActions.updateDiscoveryInput(url);
}


export function doneFetchingArticleEntities() {
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
