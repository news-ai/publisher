/*
 * The reducer takes care of our data
 * Using actions, we can change our application state
 * To add a new action, add it to the switch statement in the feedReducer function
 */

import { GET_FEED } from '../constants/AppConstants';
import assignToEmpty from '../utils/assign';

const initialState = {
  projectName: 'NewsAI Publisher',
  articles: []
};

function feedReducer(state = initialState, action) {
  Object.freeze(state); // Don't mutate state directly, always use assign()!
  switch (action.type) {
    case GET_FEED:
      return assignToEmpty(state, {
        articles: action.articles
      });
    default:
      return state;
  }
}

export default feedReducer;