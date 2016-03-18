import { GET_FEED, RECEIVE_ENTITY, REQUEST_ENTITIES, RECEIVE_ENTITIES, REQUEST_AUTHOR, RECEIVE_AUTHOR } from '../constants/AppConstants';
import fetch from 'isomorphic-fetch';
const CONTEXT_API_BASE = `https://context.newsai.org/api`;

export function getFeed(articles) {
  return {
    type: GET_FEED,
    articles
  };
}

export function asyncGetFeed() {
  return (dispatch) => {
    return fetch(CONTEXT_API_BASE + '/feeds' + '?' + Date.now(), {
      method: 'GET'
    }).then((response) => {
      return response.text();
    }).then((body) => {
      const jsonBody = JSON.parse(body);
      dispatch(getFeed(jsonBody.results));
    });
  };
}

export function receiveEntity(json) {
  return {
    type: RECEIVE_ENTITY,
    json
  };
}

export function fetchEntity(entityId) {
  return (dispatch) => {
    return fetch(CONTEXT_API_BASE + '/entities/' + entityId)
      .then((response) => response.text())
      .then((body) => dispatch(receiveEntity(JSON.parse(body))));
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

export function fetchArticleEntities(articleId) {
  return (dispatch, getState) => {
    const article = getState().feedReducer.articles.filter((article) => article.id === articleId)[0];
    const entityIds = article.entity_scores.map((entity) => entity.entity_id);
    dispatch(requestArticleEntities(articleId));
    Promise.all(entityIds.map((id) => dispatch(fetchEntity(id))))
      .then(() => dispatch(doneFetchingArticleEntities()));
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
    fetch(CONTEXT_API_BASE + '/authors/' + authorId)
      .then((response) => response.text())
      .then((body) => dispatch(receiveAuthor(JSON.parse(body))));
  };
}
