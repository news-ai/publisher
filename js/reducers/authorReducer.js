import {
  REQUEST_AUTHOR,
  RECEIVE_AUTHOR
} from '../constants/AppConstants';
import { assignToEmpty } from '../utils/assign';
import { initialState } from './initialState';

function authorReducer(state = initialState.authorReducer, action) {
  if (window.isDev) Object.freeze(state);
  let accessing = false;
  if (
    action.type === REQUEST_AUTHOR ||
    action.type === RECEIVE_AUTHOR
    ) accessing = true;
  else return state;

  let obj = assignToEmpty(state, {});
  switch (action.type) {
    case REQUEST_AUTHOR:
      obj.isReceiving = true;
      return obj;
    case RECEIVE_AUTHOR:
      obj[parseInt(action.json.id)] = action.json;
      return obj;
    default:
      return state;
  }
}

export default authorReducer;
