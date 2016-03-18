import { RECEIVE_ENTITY, REQUEST_ENTITIES, RECEIVE_ENTITIES } from '../constants/AppConstants';
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
    return assignToEmpty(state, {
      isReceiving: false
    });
  case RECEIVE_ENTITY:
    obj[parseInt(action.json.id)] = action.json;
    return obj;
  default:
    return state;
  }
}

export default entityReducer;