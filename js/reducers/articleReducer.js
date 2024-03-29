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
  if (window.isDev) Object.freeze(state);
  let accessing = false;
  if (
    action.type === REQUEST_ARTICLES ||
    action.type === RECEIVE_ARTICLES ||
    action.type === TOGGLE_STAR ||
    action.type === RECEIVE_STARRED_FEED ||
    action.type === RECEIVE_READ_LATER_FEED
    ) accessing = true;
  else return state;

  let obj = assignToEmpty(state, {});
  switch (action.type) {
    case REQUEST_ARTICLES:
      return assignToEmpty(state, {
        isReceiving: true
      });
    case RECEIVE_ARTICLES:
      obj.isReceiving = false;
      const timezoneOffset = moment.tz.guess();
      if (Array.isArray(action.articles)) {
        action.articles.map( article => {
          // sort entity scores in every article
          obj[article.id] = assignToEmpty(article, {
            basic_summary: article.summary,
            entity_scores: article.entity_scores.sort( (a, b) => (a.score - b.score) * -1 ),
            added_at: moment(new Date(article.added_at * 1000).toISOString()).tz(timezoneOffset).format('MMM D, YYYY hh:mm A')
          });
        });
      } else {
        obj[action.articles.id] = action.articles;
        obj[action.articles.id].basic_summary = action.articles.summary;
        obj[action.articles.id].added_at = moment(action.articles.added_at).tz(timezoneOffset).format('MMM D, YYYY hh:mm A');
      }
      return obj;
    case TOGGLE_STAR:
      obj[action.articleId].starred = obj[action.articleId].starred === null ? true : !obj[action.articleId].starred;
      obj.starred.starredArticleIds = [];
      obj.starred.next = undefined;
      return obj;
    case TOGGLE_READ_LATER:
      obj[action.articleId].readLater = obj[action.articleId].readLater === null ? true : !obj[action.articleId].readLater;
      obj.readLater.readLaterArticleIds = [];
      obj.readLater.next = undefined;
      return obj;
    case RECEIVE_STARRED_FEED:
      obj.starred.starredArticleIds = [
        ...state.starred.starredArticleIds,
        ...action.articles.map( article => article.id)
      ];
      obj.starred.next = action.next;
      return obj;
    case RECEIVE_READ_LATER_FEED:
      obj.readLater.readLaterArticleIds = [
        ...state.readLater.readLaterArticleIds,
        ...action.articles.map( article => article.id)
      ];
      obj.readLater.next = action.next;
      return obj;
    default:
      return state;
    };
}

export default articleReducer;
