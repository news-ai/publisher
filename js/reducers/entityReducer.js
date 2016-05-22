import {
  REQUEST_ENTITY,
  RECEIVE_ENTITY,
  REQUEST_ENTITIES,
  RECEIVE_ENTITIES,
  REQUEST_ENTITY_ARTICLES,
  RECEIVE_ENTITY_ARTICLES,
} from '../constants/AppConstants';
import { assignToEmpty } from '../utils/assign';
import { initialState } from './initialState';

function entityReducer(state = initialState.entityReducer, action) {
  if (window.isDev) Object.freeze(state);
  let accessing = false;
  if (
    action.type === REQUEST_ENTITY ||
    action.type === RECEIVE_ENTITY ||
    action.type === REQUEST_ENTITIES ||
    action.type === RECEIVE_ENTITIES ||
    action.type === REQUEST_ENTITY_ARTICLES ||
    action.type === RECEIVE_ENTITY_ARTICLES
    ) accessing = true;
  else return state;

  let obj = assignToEmpty(state, {});
  switch (action.type) {
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
      obj[parseInt(action.entityId, 10)].next = action.next === null ? undefined : action.next;
      obj.isReceiving = false;
      return obj;
    default:
      return state;
  }
}

export default entityReducer;
