import {
  REQUEST_ARTICLES,
  RECEIVE_ARTICLES,
} from '../constants/AppConstants';

const CONTEXT_API_BASE = window.CONTEXT_API_BASE;

export function requestArticles() {
  return {
    type: REQUEST_ARTICLES
  };
}

export function receiveArticles(json) {
  return {
    type: RECEIVE_ARTICLES,
    json
  };
}

export function fetchArticle(articleId) {
  return dispatch => {
    dispatch(requestArticles());
    return fetch(`${CONTEXT_API_BASE}/articles/${articleId}`, { credentials: 'include'})
      .then( response => response.text())
      .then( body => dispatch(receiveArticles(JSON.parse(body))));
  };
}
