import {
  REQUEST_LOGIN,
  RECEIVE_LOGIN,
  LOGIN_FAIL,
} from '../constants/AppConstants';
import assignToEmpty from '../utils/assign';
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
    default:
      return state;
  }
}

export default personReducer;
