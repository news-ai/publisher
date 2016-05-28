import {
  REQUEST_ENTITY,
  RECEIVE_ENTITY,
  REQUEST_ENTITIES,
  RECEIVE_ENTITIES,
  REQUEST_ENTITY_ARTICLES,
  RECEIVE_ENTITY_ARTICLES,
  TOGGLE_FOLLOW,
  FETCH_FOLLOW,
  FLUSH_FOLLOW,
  UPDATE_FOLLOW_PAGE
} from '../constants/AppConstants';
import { assignToEmpty } from '../utils/assign';
import { initialState } from './initialState';
import _ from 'lodash';

function entityReducer(state = initialState.entityReducer, action) {
  if (window.isDev) Object.freeze(state);
  let accessing = false;
  if (
    action.type === REQUEST_ENTITY ||
    action.type === RECEIVE_ENTITY ||
    action.type === REQUEST_ENTITIES ||
    action.type === RECEIVE_ENTITIES ||
    action.type === REQUEST_ENTITY_ARTICLES ||
    action.type === RECEIVE_ENTITY_ARTICLES ||
    action.type === TOGGLE_FOLLOW ||
    action.type === FETCH_FOLLOW ||
    action.type === FLUSH_FOLLOW ||
    action.type === UPDATE_FOLLOW_PAGE
    ) accessing = true;
  else return state;

  let obj = assignToEmpty(state, {});
  switch (action.type) {
    case UPDATE_FOLLOW_PAGE:
      if (action.followType !== 'entities') return state;
      obj.followIdx = state.followIdx + action.move;
      return obj;
    case TOGGLE_FOLLOW:
      if (action.followType !== 'entities') return state;
      obj.following = assignToEmpty(state.following, {});
      if (state.following[action.id]) {
        obj.following[action.id] = !state.following[action.id];
      } else {
        obj.following[action.id] = true;
      }
      return obj;
    case FETCH_FOLLOW:
      if (action.followType !== 'entities') return state;
      const isDuplicate = !state.follows.every( list => !_.isEqual(list, action.body.results.map(e => e.entity.id )));
      if (isDuplicate) return state;
      obj.following = assignToEmpty(state.following, {});
      obj.follows = [...state.follows];
      obj.follows.push(action.body.results.map( e => e.entity.id ));
      action.body.results.map( e => {
        obj.following[e.entity.id] = true;
        obj[e.entity.id] = assignToEmpty(e.entity, {
          entity_articles: []
        });
      });
      obj.followPageCount = Math.floor(action.body.count / 20) + 1;
      obj.next = action.body.next;
      return obj;
    case FLUSH_FOLLOW:
      if (action.followType !== 'entities') return state;
      obj.following = {};
      obj.follows = [];
      obj.followIdx = 0;
      obj.next = undefined;
      return obj;
    case REQUEST_ENTITIES:
      obj.isReceiving = true;
      return obj;
    case RECEIVE_ENTITIES:
      obj.isReceiving = false;
      return obj;
    case REQUEST_ENTITY:
      obj.isReceiving = true;
      return obj;
    case RECEIVE_ENTITY:
      obj[parseInt(action.json.id, 10)] = action.json;
      obj[parseInt(action.json.id, 10)].entity_articles = [];
      return obj;
    case REQUEST_ENTITY_ARTICLES:
      obj.isReceiving = true;
      return obj;
    case RECEIVE_ENTITY_ARTICLES:
      obj[parseInt(action.entityId, 10)].entity_articles = [...state[parseInt(action.entityId, 10)].entity_articles, ...action.json.map((article) => article.id)];
      obj[parseInt(action.entityId, 10)].next = action.next;
      obj.isReceiving = false;
      return obj;
    default:
      return state;
  }
}

export default entityReducer;
