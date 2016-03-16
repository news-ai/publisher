import { GET_FEED } from '../constants/AppConstants';
const CONTEXT_API_BASE = `https://context.newsai.org/api`;

export function getFeed(articles) {
  return {
    type: GET_FEED,
    articles
  };
}

export function asyncGetFeed() {
  return (dispatch) => {
    return fetch(CONTEXT_API_BASE + '/feeds/', {
      method: 'GET'
    }).then((response) => {
      return response.text();
    }).then((body) => {
      const jsonBody = JSON.parse(body);
      dispatch(getFeed(jsonBody.results));
    });
  };
}

export const RECEIVE_ENTITY = 'RECEIVE_ENTITY';
export function receiveEntity(json) {
  return {
    type: RECEIVE_ENTITY,
    json
  };
}

export function fetchEntity(entityId) {
  return (dispatch) => {
    return fetch(CONTEXT_API_BASE + '/entities/' + entityId)
      .done((response) => dispatch(receiveEntity(response)))
      .fail((e) => console.log(e));
  };
}

export const RECEIVE_ENTITIES = 'RECEIVE_ENTITIES';
function doneFetchingArticleEntities() {
  return {
    type: RECEIVE_ENTITIES
  };
}

export const REQUEST_ENTITIES = 'REQUEST_ENTITIES';
export function fetchArticleEntities(entityIds) {
  return (dispatch) => Promise.all(entityIds.map((id) => fetchEntity(id)))
    .then(() => dispatch(doneFetchingArticleEntities()))
    .fail((e) => console.log(e));
}

