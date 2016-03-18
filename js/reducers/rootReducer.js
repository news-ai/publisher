/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */
import { combineReducers } from 'redux';

import feedReducer from './feedReducer';
import entityReducer from './entityReducer';
import authorReducer from './authorReducer';

const rootReducer = combineReducers({
  feedReducer,
  entityReducer,
  authorReducer
});

export default rootReducer;