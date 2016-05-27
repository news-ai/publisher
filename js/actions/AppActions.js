import * as loginActions from './loginActions';
import * as publisherActions from './publisherActions';
import * as articleActions from './articleActions';
import * as feedActions from './feedActions';
import * as entityActions from './entityActions';
import * as discoveryActions from './discoveryActions';
import * as authorActions from './authorActions';

import {
	TOGGLE_FOLLOW,
  FETCH_FOLLOW,
  FLUSH_FOLLOW
} from '../constants/AppConstants';

export const flushFollow = followType => {
  return {
    type: FLUSH_FOLLOW,
    followType
  };
};

export const fetchFollow = followType => {
  return (dispatch, getState) => {
    let fetchLink = window.CONTEXT_API_BASE + '/' + followType + '/following/';
    let next;
    if (followType === 'entities') {
      next = getState().entityReducer.next;
    } else if (followType === 'publishers') {
      next = getState().publisherReducer.next;
    }
    if (next === null) return;
    if (next !== undefined) fetchLink = next;
    return fetch(fetchLink, { credentials: 'include' })
    .then( response => response.text())
    .then( body => {
      const json = JSON.parse(body);
      dispatch({ type: FETCH_FOLLOW, body: json, followType});
    });
  };
};

export const flipFollow = (id, followType) => {
  return {
    type: TOGGLE_FOLLOW,
    followType,
    id
  };
};

export const toggleFollow = (id, followType) => {
  return dispatch => {
    dispatch(flipFollow(id, followType));
    return fetch(`${window.CONTEXT_API_BASE}/${followType}/${id}/follow/`, { credentials: 'include' });
  };
};

export const loginWithGoogle = _ => loginActions.loginWithGoogle();
export const fetchPerson = _ => loginActions.fetchPerson();

export const requestArticles = _ => articleActions.requestArticles();
export const receiveArticles = json => articleActions.receiveArticles(json);
export const fetchArticle = articleId => articleActions.fetchArticle(articleId);

export const flipReadLater = articleId => articleActions.flipReadLater(articleId);
export const toggleReadLater = articleId => articleActions.toggleReadLater(articleId);

export const flipStar = articleId => articleActions.flipStar(articleId);
export const toggleStar = articleId => articleActions.toggleStar(articleId);
export const fetchStarredFeed = _ => articleActions.fetchStarredFeed();
export const fetchReadLaterFeed = _ => articleActions.fetchReadLaterFeed();

export const postArticle = _ => discoveryActions.postArticle();
export const receivePostedArticle = body => discoveryActions.receivePostedArticle(body);
export const failPostedArticle = _ => discoveryActions.failPostedArticle();

export const receiveDiscoveryFeed = (articles, next) => discoveryActions.receiveDiscoveryFeed(articles, next);
export const fetchDiscoveryFeed = _ => discoveryActions.fetchDiscoveryFeed();
export const addDiscoveryArticle = _ => discoveryActions.addDiscoveryArticle();
export const updateDiscoveryInput = url => discoveryActions.updateDiscoveryInput(url);

export const doneFetchingArticleEntities = _ => entityActions.doneFetchingArticleEntities();
export const requestArticleEntities = articleId => entityActions.requestArticleEntities(articleId);
export const requestEntity = entityId => entityActions.requestEntity(entityId);
export const receiveEntity = json => entityActions.receiveEntity(json);
export const requestEntityArticles = _ => entityActions.requestEntityArticles();
export const receiveEntityArticles = (json, entityId, next) => entityActions.receiveEntityArticles(json, entityId, next);
export const fetchEntityArticles = entityId => entityActions.fetchEntityArticles(entityId);
export const fetchEntity = entityId => entityActions.fetchEntity(entityId);
export const fetchEntityAndArticles = entityId => entityActions.fetchEntityAndArticles(entityId);
export const fetchArticleEntities = articleId => entityActions.fetchArticleEntities(articleId);

export const requestFeed = _ => feedActions.requestFeed();
export const receiveFeed = (json, next) => feedActions.receiveFeed(json, next);
export const fetchFeed = _ => feedActions.fetchFeed();

export const requestAuthor = _ => authorActions.requestAuthor();
export const receiveAuthor = json => authorActions.receiveAuthor(json);
export const fetchAuthor = authorId => authorActions.fetchAuthor(authorId);

export const requestPublisherArticles = _ => publisherActions.requestPublisherArticles();
export const requestPublisher = _ => publisherActions.requestPublisher();
export const receivePublisher = json => publisherActions.receivePublisher(json);
export const fetchPublisher = publisherId => publisherActions.fetchPublisher(publisherId);
export const receivePublisherArticles = (json, publisherId, next) => publisherActions.receivePublisherArticles(json, publisherId, next);
export const fetchPublisherArticles = publisherId => publisherActions.fetchPublisherArticles(publisherId);
export const fetchPublisherAndArticles = publisherId => publisherActions.fetchPublisherAndArticles(publisherId);

export const fetchAllPublishers = _ => publisherActions.fetchAllPublishers();
export const filterPublishers = word => publisherActions.filterPublishers(word);











