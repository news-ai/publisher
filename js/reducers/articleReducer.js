import {
  REQUEST_ARTICLES,
  RECEIVE_ARTICLES,
  TOGGLE_STAR,
  RECEIVE_STARRED_FEED,
} from '../constants/AppConstants';
import { assignToEmpty } from '../utils/assign';
import { initialState } from './initialState';

function extractSummary(summary) {
  return summary.split('.').map( sentence => sentence.concat('.'));
}
function articleReducer(state = initialState.articleReducer, action) {
  Object.freeze(state);
  let obj = assignToEmpty(state, {});
  switch (action.type) {
    case REQUEST_ARTICLES:
      obj.isReceiving = true;
      return obj;
    case RECEIVE_ARTICLES:
      obj.isReceiving = false;
      if (Array.isArray(action.json)) {
        action.json.map( article => {
          article.basic_summary = extractSummary(article.summary);
          // sort entity scores in every article
          obj[article.id] = assignToEmpty(article, {
            entity_scores: article.entity_scores.sort( (a, b) => (a.score - b.score) * -1 )
          });
        });
      } else {
        obj[action.json.id] = action.json;
        // obj[action.json.id].basic_summary = extractSummary(action.json.summary);
        obj[action.json.id].basic_summary = action.json.summary;
      }
      return obj;
    case TOGGLE_STAR:
      obj[action.articleId].starred = obj[action.articleId].starred === null ? true : !obj[action.articleId].starred;
      obj.starred.starredArticleIds = [];
      return obj;
    case RECEIVE_STARRED_FEED:
      obj.starred.starredArticleIds = [
        ...state.starred.starredArticleIds,
        ...action.articles.map( article => article.id)
      ];
      obj.starred.next = action.next === null ? undefined : action.next;
      return obj;
    default:
      return state;
    };
}

export default articleReducer;
