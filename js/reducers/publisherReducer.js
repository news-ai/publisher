import { RECEIVE_PUBLISHER, REQUEST_PUBLISHER } from '../constants/AppConstants';
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
  default:
    return state;
  }
}

export default publisherReducer;