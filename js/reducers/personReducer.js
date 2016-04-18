import {
  REQUEST_LOGIN,
  RECEIVE_LOGIN,
  LOGIN_FAIL,
  POST_DISCOVERY_ARTICLE,
  DONE_POST_DISCOVERY_ARTICLE,
  UPDATE_DISCOVERY_INPUT,
} from '../constants/AppConstants';

import { assignToEmpty } from '../utils/assign';
import { initialState } from './initialState';

function personReducer(state = initialState.personReducer, action) {
  Object.freeze(state);
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
      return obj;
    default:
      return state;
  }
}

export default personReducer;
