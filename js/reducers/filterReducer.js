import {
	FILTER,
	ROLLOVER,
	SELECT,
	DELETE
} from '../constants/AppConstants';
import { assignToEmpty } from '../utils/assign';
import { initialState } from './initialState';

function filterReducer(state = initialState.filterReducer, action) {
  if (window.isDev) Object.freeze(state);
  let obj = assignToEmpty(state, {});
  switch (action.type) {
    default:
      return state;
  }
}

export default filterReducer;
