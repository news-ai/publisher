import { GET_FEED, RECEIVE_ENTITY, REQUEST_ENTITIES, RECEIVE_ENTITIES } from '../constants/AppConstants';
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

export function receiveEntity(json) {
  return {
    type: RECEIVE_ENTITY,
    json
  };
}

export function fetchEntity(entityId) {
  return (dispatch) => {
    return fetch(CONTEXT_API_BASE + '/entities/' + entityId)
      .then((response) => {
        console.log(response);
        dispatch(receiveEntity(response));
      });
  };
}

function doneFetchingArticleEntities() {
  return {
    type: RECEIVE_ENTITIES
  };
}

export function requestArticleEntities() {
  return {
    type: REQUEST_ENTITIES
  };
}

export function fetchArticleEntities(entityIds) {
  return (dispatch, getState) => {
    console.log(entityIds);
    dispatch(requestArticleEntities());
    Promise.all(entityIds.map((id) => dispatch(fetchEntity(id))))
      .then(() => dispatch(doneFetchingArticleEntities()));
  };
}

