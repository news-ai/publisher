import { RECEIVE_PUBLISHER, REQUEST_PUBLISHER, RECEIVE_PUBLISHER_ARTICLES, REQUEST_ADDITIONAL_PUBLISHER_ARTICLES, RECEIVE_ADDITIONAL_PUBLISHER_ARTICLES } from '../constants/AppConstants';
import assignToEmpty from '../utils/assign';
import { initialState } from './initialState';

function publisherReducer(state = initialState.publisherReducer, action) {
  Object.freeze(state);
  let obj = assignToEmpty(state, {});
  switch (action.type) {
  case REQUEST_PUBLISHER:
    obj.isReceiving = true;
    return obj;
  case RECEIVE_PUBLISHER:
    obj[parseInt(action.json.id)] = action.json;
    return obj;
  case RECEIVE_PUBLISHER_ARTICLES:
    obj[parseInt(action.publisherId)].publisher_articles = action.json.map((article) => article.id);
    obj[parseInt(action.publisherId)].next = (action.next === null) ? 0 : action.next;
    return obj;
  case REQUEST_ADDITIONAL_PUBLISHER_ARTICLES:
    obj.isReceiving = true;
    return obj;
  case RECEIVE_ADDITIONAL_PUBLISHER_ARTICLES:
    obj[parseInt(action.publisherId)].publisher_articles = [...state[parseInt(action.publisherId)].publisher_articles, ...action.json.map((article) => article.id)];
    obj[parseInt(action.publisherId)].next = (action.next === null) ? 0 : action.next;
    obj.isReceiving = false;
    return obj;
  default:
    return state;
  }
}

export default publisherReducer;