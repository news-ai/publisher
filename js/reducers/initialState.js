export const initialState = {
  feedReducer: {
    projectName: 'NewsAI Publisher',
    isReceiving: false,
    feedArticleIds: [],
  },
  entityReducer: {
    isReceiving: false,
    following: {},
    follows: [],
    followPageCount: 0,
    followIdx: 0
  },
  authorReducer: {
    isReceiving: false
  },
  publisherReducer: {
    isReceiving: false,
    following: {},
    publishers: [],
    followPageCount: 0,
    followIdx: 0,
    follows: [],
    searchInput: {
      filtered: [],
      selected: [],
      currentIdx: -1,
      value: '',
    }
  },
  articleReducer: {
    isReceiving: false,
    starred: {
      starredArticleIds: [],
    },
    readLater: {
      readLaterArticleIds: [],
    }
  },
  personReducer: {
    isReceiving: false,
    discovery: {
      discoveredArticleIds: [],
      url: '',
      isReceiving: false,
      didInvalidate: false,
    },
  },
  filterReducer: {
    isReceiving: false,
    current: undefined,
  }
};
