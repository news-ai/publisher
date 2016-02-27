import { GET_FEED } from '../constants/AppConstants';

export function asyncGetFeed() {
  let contextURL = `https://context.newsai.org/api/feeds`;
  return (dispatch) => {
    fetch('https://context.newsai.org/api/feeds/', {
      method: "GET"
    }).then(function(response) {
      return response.text()
    }).then(function(body) {
      var jsonBody = JSON.parse(body);
      dispatch(getFeed(jsonBody['results'][0]['articles']));
    })
  };
}

export function getFeed(articles) {
  return { type: GET_FEED, articles };
}