import fuzzy from 'fuzzy';
import fetch from 'isomorphic-fetch';
import {
  REQUEST_PUBLISHER,
  RECEIVE_PUBLISHER,
  REQUEST_PUBLISHER_ARTICLES,
  RECEIVE_PUBLISHER_ARTICLES,
  FILTER_PUBLISHERS,
  ROLLOVER_PUBLISHERS,
  SELECT_PUBLISHER,
  DELETE_PUBLISHER,
  SET_NEXT,
} from '../constants/AppConstants';

import {
  requestArticles,
  receiveArticles,
} from './articleActions';

import {
  removeCache,
  isJsonString,
} from '../utils/assign';