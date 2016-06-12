// import fuzzy from 'fuzzy';
import fetch from 'isomorphic-fetch';
import {
} from '../constants/AppConstants';

import {
  requestArticles,
  receiveArticles,
} from './articleActions';

import {
  receiveEntity,
  fetchEntitiesArticles,
} from './entityActions';

export function fetchFilterArticles() {
  return (dispatch, getState) => {
    if (getState().articleReducer.isReceiving) return;
    if (getState().filterReducer.current === 'entityInput') {
      return dispatch(fetchEntitiesArticles());
    }
  };
}


export function selectEntities() {
  return dispatch => {
    return dispatch(fetchFilterArticles());
  };
}

export function fetchEntitySearch(value) {
  return dispatch => {
    dispatch(setValue(value, 'entityInput'));
    return fetch(`https://search.newsai.org/entity/entity/_search?q=data.name:${value}&size=10`)
    .then( response => response.text())
    .then( body => {
      const json = JSON.parse(body).hits;
      const entities = json.hits.map( obj => obj._source.data);
      return Promise.all([
        ...entities.map( entity => dispatch(receiveEntity(entity))),
        dispatch(updateFiltered(entities.map(entity => entity.id), value, 'entityInput'))
        ]);
    });
  };
}


