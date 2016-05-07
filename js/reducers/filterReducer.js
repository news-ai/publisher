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
    case FILTER:
      obj[action.inputType] = assignToEmpty(state[action.inputType], {});
      obj[action.inputType].currentIdx = -1;
      obj[action.inputType].value = action.value;
      obj[action.inputType].filtered = action.value.length > 0 ? action.results.filter( fid => !state.entityInput.selected.some( selected => selected === fid)) : [];
      return obj;
    case ROLLOVER:
      const futureIdx = state[action.inputType].currentIdx + action.move;
      obj[action.inputType] = assignToEmpty(state.entityInput, {});
      obj[action.inputType].currentIdx = futureIdx < -1 ? -1 : futureIdx;
      return obj;
    case SELECT:
      obj[action.inputType] = assignToEmpty(state[action.inputType], {});
      obj[action.inputType].currentIdx = -1;
      obj[action.inputType].selected = [
        ...state[action.inputType].selected,
        state[action.inputType].filtered[state[action.inputType].currentIdx]
      ];
      obj[action.inputType].filtered = [];
      obj[action.index].value = '';
      return obj;
    case DELETE:
      return obj;
    default:
      return state;
  }
}

export default filterReducer;
