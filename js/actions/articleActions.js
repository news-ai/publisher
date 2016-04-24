import {
  REQUEST_ARTICLES,
  RECEIVE_ARTICLES,
  TOGGLE_STAR,
  RECEIVE_STARRED_FEED
} from '../constants/AppConstants';

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
    return fetch(`${window.CONTEXT_API_BASE}/articles/${articleId}/`, { credentials: 'include'})
      .then( response => response.text())
      .then( body => dispatch(receiveArticles(JSON.parse(body))));
  };
}

export function flipStar(articleId) {
  return {
    type: TOGGLE_STAR,
    articleId
  };
}

export function receiveStarredArticles(articles, next) {
  return {
    type: RECEIVE_STARRED_FEED,
    articles,
    next
  };
}


export function fetchStarredFeed() {
  return dispatch => {
    dispatch(requestArticles());
    return fetch(`${window.CONTEXT_API_BASE}/articles/starred`, { credentials: 'include' })
    .then( response => response.text())
    .then( body => {
      const json = JSON.parse(body);
      Promise.all([
        dispatch(receiveArticles(json.results)),
        dispatch(receiveStarredArticles(json.results, json.next)),
      ]);
    });
  };
}


export function toggleStar(articleId) {
  return dispatch => {
    return fetch(`${window.CONTEXT_API_BASE}/articles/${articleId}/toggle_star`, { credentials: 'include' })
    .then( response => response.status === 200 ? dispatch(flipStar(articleId)) : null)
    .then( _ => dispatch(fetchStarredFeed()));
  };
}


