import { GET_FEED } from '../constants/AppConstants';

export function getFeed(articles) {
  return { type: GET_FEED, articles };
}

export function asyncGetFeed() {
  const CONTEXT_API_BASE = `https://context.newsai.org/api`;
  return (dispatch) => {
    return fetch(CONTEXT_API_BASE + '/feeds/', {
      method: 'GET'
    }).then(function(response) {
      return response.text();
    }).then(function(body) {
      const jsonBody = JSON.parse(body);
      dispatch(getFeed(jsonBody.results[0].articles));
    });
  };
}
