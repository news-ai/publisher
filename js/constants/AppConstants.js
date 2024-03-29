/*
 * AppConstants
 * These are the variables that determine what our central data store (reducer.js)
 * changes in our state. When you add a new action, you have to add a new constant here
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'YOUR_ACTION_CONSTANT';
 */

export const TOGGLE_FOLLOW = 'TOGGLE_FOLLOW';
export const FETCH_FOLLOW = 'FETCH_FOLLOW';
export const FLUSH_FOLLOW = 'FLUSH_FOLLOW';
export const UPDATE_FOLLOW_PAGE = 'UPDATE_FOLLOW_PAGE';

export const FILTER = 'FILTER';
export const ROLLOVER = 'ROLLOVER';
export const SELECT = 'SELECT';
export const DELETE = 'DELETE';
export const RECEIVE_ARTICLE_IDS = 'RECEIVE_ARTICLE_IDS';
export const SET_NEXT = 'SET_NEXT';
export const SET_VALUE = 'SET_VALUE';

export const LOGIN_FAIL = 'LOGIN_FAIL';
export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN';

export const POST_ARTICLE = 'POST_ARTICLE';
export const DONE_POST_ARTICLE = 'DONE_POST_ARTICLE';
export const POST_DISCOVERY_ARTICLE = 'POST_DISCOVERY_ARTICLE';
export const DONE_POST_DISCOVERY_ARTICLE = 'DONE_POST_DISCOVERY_ARTICLE';
export const UPDATE_DISCOVERY_INPUT = 'UPDATE_DISCOVERY_INPUT';
export const FAIL_POST_DISCOVERY_ARTICLE = 'FAIL_POST_DISCOVERY_ARTICLE';
export const RECEIVE_DISCOVERY_ARTICLES = 'RECEIVE_DISCOVERY_ARTICLES';

export const REQUEST_FEED = 'REQUEST_FEED';
export const RECEIVE_FEED = 'RECEIVE_FEED';

export const RECEIVE_ENTITIES = 'RECEIVE_ENTITIES';
export const REQUEST_ENTITIES = 'REQUEST_ENTITIES';

export const REQUEST_ENTITY = 'REQUEST_ENTITY';
export const RECEIVE_ENTITY = 'RECEIVE_ENTITY';
export const REQUEST_ENTITY_ARTICLES = 'REQUEST_ENTITY_ARTICLES';
export const RECEIVE_ENTITY_ARTICLES = 'RECEIVE_ENTITY_ARTICLES';

export const REQUEST_AUTHOR = 'REQUEST_AUTHOR';
export const RECEIVE_AUTHOR = 'RECEIVE_AUTHOR';

export const REQUEST_PUBLISHER = 'REQUEST_PUBLISHER';
export const RECEIVE_PUBLISHER = 'RECEIVE_PUBLISHER';
export const REQUEST_PUBLISHER_ARTICLES = 'REQUEST_PUBLISHER_ARTICLES';
export const RECEIVE_PUBLISHER_ARTICLES = 'RECEIVE_PUBLISHER_ARTICLES';

export const FILTER_PUBLISHERS = 'FILTER_PUBLISHERS';
export const ROLLOVER_PUBLISHERS = 'ROLLOVER_PUBLISHERS';
export const SELECT_PUBLISHER = 'SELECT_PUBLISHER';
export const DELETE_PUBLISHER = 'DELETE_PUBLISHER';

export const REQUEST_ARTICLES = 'REQUEST_ARTICLES';
export const RECEIVE_ARTICLES = 'RECEIVE_ARTICLES';
export const TOGGLE_STAR = 'TOGGLE_STAR';
export const TOGGLE_READ_LATER = 'TOGGLE_READ_LATER';
export const RECEIVE_STARRED_FEED = 'RECEIVE_STARRED_FEED';
export const RECEIVE_READ_LATER_FEED = 'RECEIVE_READ_LATER_FEED';
