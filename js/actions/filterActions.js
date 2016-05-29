// import fuzzy from 'fuzzy';
import fetch from 'isomorphic-fetch';
import {
  FILTER,
  ROLLOVER,
  SELECT,
  DELETE,
  SET_NEXT,
  RECEIVE_ARTICLE_IDS,
  SET_VALUE
} from '../constants/AppConstants';

import {
  requestArticles,
  receiveArticles,
} from './articleActions';

import {
  receiveEntity,
  fetchEntitiesArticles,
} from './entityActions';

import {
  removeCache,
  isJsonString,
} from '../utils/assign';


export function setNext(next, inputType) {
  return {
    type: SET_NEXT,
    next,
    inputType
  };
}

export function setFilterArticleIds(articleIds, inputType) {
  return {
    type: RECEIVE_ARTICLE_IDS,
    articleIds,
    inputType
  };
}

export function moveTypeaheadPointer(move, inputType) {
  return {
    type: ROLLOVER,
    move,
    inputType
  };
}

export function onHoverTypeahead(index, inputType) {
  return (dispatch, getState) => {
    dispatch(moveTypeaheadPointer(index - getState().filterReducer[inputType].currentIdx, inputType));
  };
}

export function updateFiltered(results, value, inputType) {
  return {
    type: FILTER,
    results,
    value,
    inputType
  };
}

export function fetchFilterArticles() {
  return (dispatch, getState) => {
    if (getState().articleReducer.isReceiving) return;
    if (getState().filterReducer.current === 'entityInput') {
      return dispatch(fetchEntitiesArticles());
    }
  };
}

export function deleteTypeaheadSelection(index, inputType) {
  return dispatch => {
    dispatch({
      type: DELETE,
      index,
      inputType
    });
    return dispatch(fetchFilterArticles());
  };
}

export function selectEntities() {
  return dispatch => {
    return dispatch(fetchFilterArticles());
  };
}

export function select(inputType) {
  return {
    type: SELECT,
    inputType
  };
}

export function selectTypeaheadField(inputType) {
  return dispatch => {
    dispatch(select(inputType));
    if (inputType === 'entityInput') return dispatch(selectEntities());
  };
}

export function updateActiveTypeaheadField(keyCode, inputType) {
  // up 38, down 40, left 37, right 39, enter 13
  return (dispatch, getState) => {
    if (keyCode === 38) dispatch(moveTypeaheadPointer(-1, inputType));
    if (keyCode === 40) dispatch(moveTypeaheadPointer(1, inputType));
    if (keyCode === 13 && getState().filterReducer[inputType].value.length > 0) dispatch(selectTypeaheadField(inputType));
  };
}

export function setValue(value, inputType) {
  return {
    type: SET_VALUE,
    value,
    inputType
  };
}

export function fetchEntitySearch(value) {
  return dispatch => {
    dispatch(setValue(value, 'entityInput'));
    return fetch(`https://search.newsai.org/entity/entity/_search?q=data.name:${value}&size=10`, { credentials: 'include' })
    .then( response => response.text())
    .then( body => {
      const json = JSON.parse(body).hits;
      const entities = json.hits.map( obj => obj._source.data);
      return Promise.all([
        ...entities,
        dispatch(updateFiltered(entities.map(entity => entity.id), value, 'entityInput'))
        ]);
    });
  };
}


