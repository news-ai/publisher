import {
  REQUEST_LOGIN,
  RECEIVE_LOGIN,
  LOGIN_FAIL,
  POST_DISCOVERY_ARTICLE,
  DONE_POST_DISCOVERY_ARTICLE,
  UPDATE_DISCOVERY_INPUT,
  RECEIVE_DISCOVERY_ARTICLES,
  FAIL_POST_DISCOVERY_ARTICLE,
} from '../constants/AppConstants';

import { assignToEmpty } from '../utils/assign';
import { initialState } from './initialState';

function personReducer(state = initialState.personReducer, action) {
  if (window.isDev) Object.freeze(state);
  let accessing = false;
  if (
    action.type === REQUEST_LOGIN ||
    action.type === RECEIVE_LOGIN ||
    action.type === LOGIN_FAIL ||
    action.type === POST_DISCOVERY_ARTICLE ||
    action.type === DONE_POST_DISCOVERY_ARTICLE ||
    action.type === UPDATE_DISCOVERY_INPUT ||
    action.type === RECEIVE_DISCOVERY_ARTICLES ||
    action.type === FAIL_POST_DISCOVERY_ARTICLE
    ) accessing = true;
  else return state;

  let obj = assignToEmpty(state, {});
  switch (action.type) {
    case REQUEST_LOGIN:
      obj.isReceiving = true;
      return obj;
    case RECEIVE_LOGIN:
      obj.isReceiving = false;
      obj.person = action.person;
      return obj;
    case LOGIN_FAIL:
      obj.isReceiving = false;
      obj.didInvalidate = true;
      return obj;
    case UPDATE_DISCOVERY_INPUT:
      obj.discovery.url = action.url;
      return obj;
    case POST_DISCOVERY_ARTICLE:
      obj.discovery.isReceiving = true;
      return obj;
    case DONE_POST_DISCOVERY_ARTICLE:
      obj.discovery.isReceiving = false;
      obj.discovery.url = '';
      obj.discovery.discoveredArticleIds = [];
      obj.discovery.next = undefined;
      return obj;
    case RECEIVE_DISCOVERY_ARTICLES:
      obj.discovery.discoveredArticleIds = [
        ...state.discovery.discoveredArticleIds,
        ...action.articles.map( article => article.id)
      ];
      obj.discovery.next = action.next;
      return obj;
    case FAIL_POST_DISCOVERY_ARTICLE:
      obj.discovery.didInvalidate = true;
      return obj;
    default:
      return state;
  }
}

export default personReducer;
