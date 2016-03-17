import { RECEIVE_ENTITY, REQUEST_ENTITIES, RECEIVE_ENTITIES } from '../constants/AppConstants';
import assignToEmpty from '../utils/assign';
import { initialState } from './initialState';

function entityReducer(state = initialState.entityReducer, action) {
  Object.freeze(state);
  switch (action.type) {
  case REQUEST_ENTITIES:
    return assignToEmpty(state, {
      isReceiving: true
    });
  case RECEIVE_ENTITIES:
    return assignToEmpty(state, {
      isReceiving: false
    });
  case RECEIVE_ENTITY:
    return assignToEmpty(state, {
      entities: [
        ...state.entities,
        action.json
      ]
    });
  default:
    return state;
  }
}

export default entityReducer;