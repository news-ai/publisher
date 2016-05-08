import {
	FILTER,
	ROLLOVER,
	SELECT,
	DELETE,
  TOGGLE_FILTER_TAB,
  RECEIVE_ARTICLE_IDS,
  SET_NEXT,
  SET_VALUE,
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
      obj[action.inputType].articles = [];
      obj[action.inputType].next = undefined;
      obj[action.inputType].value = '';
      obj.current = action.inputType;
      return obj;
    case DELETE:
      obj[action.inputType].currentIdx = -1;
      obj[action.inputType].selected = state[action.inputType].selected.filter( (el, i) => i !== action.index);
      obj[action.inputType].filtered = [];
      obj[action.inputType].articles = [];
      obj[action.inputType].value = '';
      obj[action.inputType].next = undefined;
      if (obj[action.inputType].selected.length === 0) obj.current = undefined;
      return obj;
    case RECEIVE_ARTICLE_IDS:
      obj[action.inputType] = assignToEmpty(state[action.inputType], {});
      obj[action.inputType].articles = [
        ...state[action.inputType].articles,
        ...action.articleIds
      ];
      return obj;
    case SET_NEXT:
      obj[action.inputType] = assignToEmpty(state[action.inputType], {});
      obj[action.inputType].next = action.next;
      return obj;
    case SET_VALUE:
      obj[action.inputType] = assignToEmpty(state[action.inputType], {});
      obj[action.inputType].value = action.value;
      return obj;

    default:
      return state;
  }
}

export default filterReducer;
