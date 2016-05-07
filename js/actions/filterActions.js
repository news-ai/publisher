import fuzzy from 'fuzzy';
import fetch from 'isomorphic-fetch';
import {
  FILTER,
  ROLLOVER,
  SELECT,
  DELETE,
  SET_NEXT,
} from '../constants/AppConstants';

import {
  requestArticles,
  receiveArticles,
} from './articleActions';

import {
  receiveEntity,
} from './entityActions';

import {
  removeCache,
  isJsonString,
} from '../utils/assign';

export function moveTypeaheadPointer(move, inputType) {
  return {
    type: ROLLOVER,
    move,
    inputType
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

export function deleteTypeaheadSelection(index, inputType) {
  return {
    type: DELETE,
    index,
    inputType
  };
}

export function selectEntity() {
  return (dispatch, getState) => {
    // dispatch(selectPublisher());
    // const publisherId = getState().publisherReducer.searchInput.selected[0];
    // return dispatch(fetchPublisherAndArticles(publisherId));
  };
}

export function selectTypeaheadField(inputType) {
  return dispatch => {
    if (inputType === 'entityInput') return dispatch(selectEntity());
  };
}

export function fetchEntitySearch(value) {
  return dispatch => {
    // if (getState().filterReducer.entityInput.value.length === 0) return;
    // const value = getState().filterReducer.entityInput.value;
    return fetch(`${window.CONTEXT_API_BASE}/entities?name=${value}`, { credentials: 'include' })
    .then( response => response.text())
    .then( body => {
      const json = JSON.parse(body);
      return Promise.all([
        ...json.results.map( entity => dispatch(receiveEntity(entity))),
        dispatch(updateFiltered(json.results.map(entity => entity.id), value, 'entityInput'))
        ]);
    });
  };
}

