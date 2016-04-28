import {
  REQUEST_ARTICLES,
  RECEIVE_ARTICLES,
  TOGGLE_STAR,
  RECEIVE_STARRED_FEED,
  TOGGLE_READ_LATER,
  RECEIVE_READ_LATER_FEED,
} from '../constants/AppConstants';
import { assignToEmpty } from '../utils/assign';
import { initialState } from './initialState';
const moment = require('moment-timezone');

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
      const timezoneOffset = new Date().getTimezoneOffset() / 60;
      if (Array.isArray(action.articles)) {
        action.articles.map( article => {
          article.basic_summary = extractSummary(article.summary);
          // sort entity scores in every article
          obj[article.id] = assignToEmpty(article, {
            entity_scores: article.entity_scores.sort( (a, b) => (a.score - b.score) * -1 ),
            added_at: moment.utc(article.added_at).zone(timezoneOffset).format('MMM D, YYYY hh:mm A')
          });
        });
      } else {
        obj[action.articles.id] = action.articles;
        // obj[action.json.id].basic_summary = extractSummary(action.json.summary);
        obj[action.articles.id].basic_summary = action.articles.summary;
        obj[action.articles.id].added_at = moment(action.articles.added_at).utcOffset(timezoneOffset).format('MMM D, YYYY hh:mm A');
      }
      return obj;
    case TOGGLE_STAR:
      obj[action.articleId].starred = obj[action.articleId].starred === null ? true : !obj[action.articleId].starred;
      obj.starred.starredArticleIds = [];
      return obj;
    case TOGGLE_READ_LATER:
      obj[action.articleId].readLater = obj[action.articleId].readLater === null ? true : !obj[action.articleId].readLater;
      obj.readLater.readLaterArticleIds = [];
      return obj;
    case RECEIVE_STARRED_FEED:
      obj.starred.starredArticleIds = [
        ...state.starred.starredArticleIds,
        ...action.articles.map( article => article.id)
      ];
      obj.starred.next = action.next === null ? undefined : action.next;
      return obj;
    case RECEIVE_READ_LATER_FEED:
      obj.readLater.readLaterArticleIds = [
        ...state.readLater.readLaterArticleIds,
        ...action.articles.map( article => article.id)
      ];
      obj.readLater.next = action.next === null ? undefined : action.next;
      return obj;
    default:
      return state;
    };
}

export default articleReducer;
