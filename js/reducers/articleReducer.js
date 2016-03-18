import { REQUEST_ARTICLES, RECEIVE_ARTICLES } from '../constants/AppConstants';
import assignToEmpty from '../utils/assign';
import { initialState } from './initialState';

function articleReducer(state = initialState.articleReducer, action) {
  Object.freeze(state);
  let obj = assignToEmpty(state, {});
  switch (action.type) {
  case REQUEST_ARTICLES:
    obj.isReceiving = true;
    return obj;
  case RECEIVE_ARTICLES:
    obj.isReceiving = false;
    action.json.forEach((article) => obj[article.id] = article);
    return obj;
  default:
    return state;
  }
}

export default articleReducer;