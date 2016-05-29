import fetch from 'isomorphic-fetch';

import {
  REQUEST_ENTITY,
  RECEIVE_ENTITY,
  REQUEST_ENTITY_ARTICLES,
  RECEIVE_ENTITY_ARTICLES,
} from '../constants/AppConstants';

import {
  requestArticles,
  receiveArticles,
} from './articleActions';

import {
  setNext,
  setFilterArticleIds,
} from './filterActions';

import {
  removeCache,
  isJsonString,
} from '../utils/assign';


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
    if (getState().entityReducer[entityId].next === null || getState().articleReducer.isReceiving) return;

    dispatch(requestArticles());

    const fetchLink = getState().entityReducer[entityId].next || `${window.CONTEXT_API_BASE}/entities/${entityId}/articles${removeCache()}`;
    return fetch(fetchLink, { credentials: 'include'})
      .then( response => response.text())
      .then( body => {
        if (!isJsonString(body)) return;
        const json = JSON.parse(body);

        return Promise.all([
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

export function fetchEntitiesArticles() {
  return (dispatch, getState) => {
    if (getState().filterReducer.entityInput.selected.length === 0) return;
    if (getState().filterReducer.entityInput.next === null) return;
    const fetchLink = getState().filterReducer.entityInput.next ||
    `${window.CONTEXT_API_BASE}/entities/${getState().filterReducer.entityInput.selected.join(',')}/articles${removeCache()}`;
    if (fetchLink === null) return;
    dispatch(requestArticles());
    return fetch(fetchLink, { credentials: 'include'})
      .then( response => response.text())
      .then( body => {
        if (!isJsonString(body)) return;
        const json = JSON.parse(body);
        return Promise.all([
          dispatch(receiveArticles(json.results)),
          dispatch(setNext(json.next, 'entityInput')),
          dispatch(setFilterArticleIds(json.results.map( article => article.id ), 'entityInput'))
          ]);
      });
  };
}


