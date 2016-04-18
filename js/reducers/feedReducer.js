import {
  REQUEST_FEED,
  RECEIVE_FEED,
} from '../constants/AppConstants';
import { assignToEmpty } from '../utils/assign';
import { initialState } from './initialState';

function feedReducer(state = initialState.feedReducer, action) {
  Object.freeze(state);
  let obj = assignToEmpty(state, {});
  switch (action.type) {
    case REQUEST_FEED:
      obj.isReceiving = true;
      return obj;
    case RECEIVE_FEED:
      obj.isReceiving = false;
      obj.feedArticleIds = [
        ...state.feedArticleIds,
        ...action.json.map( article => article.id)
      ];
      obj.next = action.next === null ? 0 : action.next;
      return obj;
    default:
      return state;
  }
}

export default feedReducer;
