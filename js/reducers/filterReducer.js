import {
} from '../constants/AppConstants';
import { assignToEmpty } from '../utils/assign';
import { initialState } from './initialState';

function filterReducer(state = initialState.filterReducer, action) {
  if (window.isDev) Object.freeze(state);
  let accessing = false;
  if (
    action.type === undefined
    ) accessing = true;
  else return state;

  let obj = assignToEmpty(state, {});
  switch (action.type) {
    default:
      return state;
  }
}

export default filterReducer;
