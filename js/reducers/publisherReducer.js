import {
  RECEIVE_PUBLISHER,
  REQUEST_PUBLISHER,
  REQUEST_PUBLISHER_ARTICLES,
  RECEIVE_PUBLISHER_ARTICLES,
} from '../constants/AppConstants';
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
      obj[parseInt(action.json.id, 10)] = action.json;
      obj[parseInt(action.json.id, 10)].publisher_articles = [];
      return obj;
    case REQUEST_PUBLISHER_ARTICLES:
      obj.isReceiving = true;
      return obj;
    case RECEIVE_PUBLISHER_ARTICLES:
      obj[parseInt(action.publisherId, 10)].publisher_articles = [...state[parseInt(action.publisherId, 10)].publisher_articles, ...action.json.map((article) => article.id)];
      obj[parseInt(action.publisherId, 10)].next = (action.next === null) ? 0 : action.next;
      obj.isReceiving = false;
      return obj;
    default:
      return state;
  }
}

export default publisherReducer;
