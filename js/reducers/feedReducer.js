/*
 * The reducer takes care of our data
 * Using actions, we can change our application state
 * To add a new action, add it to the switch statement in the feedReducer function
 */

import { REQUEST_FEED, RECEIVE_FEED } from '../constants/AppConstants';
import assignToEmpty from '../utils/assign';
import { initialState } from './initialState';

function extractSummary(summary) {
  return summary.split('.').map((sentence) => sentence.concat('.'));
}

function feedReducer(state = initialState.feedReducer, action) {
  Object.freeze(state);
  let obj = assignToEmpty(state, {});
  switch (action.type) {
  case REQUEST_FEED:
    obj.isReceiving = true;
    return obj;
  case RECEIVE_FEED:
    obj.isReceiving = false;
    obj.feedArticleIds = action.json.map((article) => article.id);
    return obj;
  default:
    return state;
  }
}

export default feedReducer;
