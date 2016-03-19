import { RECEIVE_ENTITY, REQUEST_ENTITIES, RECEIVE_ENTITIES, RECEIVE_ENTITY_ARTICLES } from '../constants/AppConstants';
import assignToEmpty from '../utils/assign';
import { initialState } from './initialState';

function entityReducer(state = initialState.entityReducer, action) {
  Object.freeze(state);
  let obj = assignToEmpty(state, {});
  switch (action.type) {
  case REQUEST_ENTITIES:
    obj.isReceiving = true;
    return obj;
  case RECEIVE_ENTITIES:
    obj.isReceiving = false;
    return obj;
  case RECEIVE_ENTITY:
    obj[parseInt(action.json.id)] = action.json;
    obj[parseInt(action.json.id)].entity_articles = undefined;
    return obj;
  case RECEIVE_ENTITY_ARTICLES:
    obj[parseInt(action.entityId)].entity_articles = action.json.map((article) => article.id);
    return obj;
  default:
    return state;
  }
}

export default entityReducer;