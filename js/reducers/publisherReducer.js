import {
  RECEIVE_PUBLISHER,
  REQUEST_PUBLISHER,
  REQUEST_PUBLISHER_ARTICLES,
  RECEIVE_PUBLISHER_ARTICLES,
  SET_NEXT,
  FILTER_PUBLISHERS,
  ROLLOVER_PUBLISHERS,
  SELECT_PUBLISHER,
  DELETE_PUBLISHER,
  TOGGLE_FOLLOW,
  FETCH_FOLLOW
} from '../constants/AppConstants';

import { assignToEmpty } from '../utils/assign';
import { initialState } from './initialState';

function publisherReducer(state = initialState.publisherReducer, action) {
  if (window.isDev) Object.freeze(state);
  let accessing = false;
  if (
    action.type === RECEIVE_PUBLISHER ||
    action.type === REQUEST_PUBLISHER ||
    action.type === REQUEST_PUBLISHER_ARTICLES ||
    action.type === RECEIVE_PUBLISHER_ARTICLES ||
    action.type === SET_NEXT ||
    action.type === FILTER_PUBLISHERS ||
    action.type === ROLLOVER_PUBLISHERS |
    action.type === SELECT_PUBLISHER ||
    action.type === DELETE_PUBLISHER ||
    action.type === TOGGLE_FOLLOW ||
    action.type === FETCH_FOLLOW
    ) accessing = true;
  else return state;

  let obj = assignToEmpty(state, {});
  obj.searchInput = assignToEmpty(state.searchInput, {});
  switch (action.type) {
    case TOGGLE_FOLLOW:
      if (action.followType !== 'publishers') return state;
      obj.following = assignToEmpty(state.following, {});
      if (state.following[action.id]) {
        obj.following[action.id] = !state.following[action.id];
      } else {
        obj.following[action.id] = true;
      }
      return obj;
    case FETCH_FOLLOW:
      if (action.followType !== 'publishers') return state;
      obj.following = {};
      action.body.results.map( e => {
        obj.following[e.publisher.id] = true;
        obj[e.publisher.id] = assignToEmpty(e.publisher, {
          publisher_articles: []
        });
      });
      obj.next = action.body.next;
      return obj;
    case REQUEST_PUBLISHER:
      obj.isReceiving = true;
      return obj;
    case RECEIVE_PUBLISHER:
      if (!obj[parseInt(action.json.id, 10)]) {
        obj.publishers = [...state.publishers, action.json];
      }
      obj[parseInt(action.json.id, 10)] = action.json;
      obj[parseInt(action.json.id, 10)].publisher_articles = [];
      return obj;
    case REQUEST_PUBLISHER_ARTICLES:
      obj.isReceiving = true;
      return obj;
    case RECEIVE_PUBLISHER_ARTICLES:
      obj[parseInt(action.publisherId, 10)].publisher_articles = [
        ...state[parseInt(action.publisherId, 10)].publisher_articles,
        ...action.json.map( article => article.id)
      ];
      obj[parseInt(action.publisherId, 10)].next = action.next;
      obj.isReceiving = false;
      return obj;
    case SET_NEXT:
      obj.next = action.next;
      return obj;
    case FILTER_PUBLISHERS:
      obj.searchInput.currentIdx = -1;
      obj.searchInput.filtered = action.filtered.filter( fid => !state.searchInput.selected.some( selected => selected === fid));
      obj.searchInput.value = action.value;
      return obj;
    case SELECT_PUBLISHER:
      obj.searchInput.currentIdx = -1;
      obj.searchInput.selected = [
        ...state.searchInput.selected,
        state.searchInput.filtered[state.searchInput.currentIdx]
      ];
      obj.searchInput.filtered = [];
      obj.searchInput.value = '';
      return obj;
    case ROLLOVER_PUBLISHERS:
      const futureIdx = state.searchInput.currentIdx + action.move;
      obj.searchInput.currentIdx = futureIdx < -1 ? -1 : futureIdx;
      return obj;
    case DELETE_PUBLISHER:
      obj.searchInput.currentIdx = -1;
      obj.searchInput.selected = state.searchInput.selected.filter( (el, i) => i !== action.index);
      obj.searchInput.filtered = [];
      obj.searchInput.value = '';
      return obj;
    default:
      return state;
  }
}

export default publisherReducer;
