import { GET_FEED } from '../constants/AppConstants';

export function asyncGetFeed() {
  let contextURL = `https://context.newsai.org/api/feeds`;
  return (dispatch) => {
    const response = await axios.post('/auth/login', data);
  };
}

export function changeProjectName(articles) {
  return { type: CHANGE_PROJECT_NAME, articles };
}