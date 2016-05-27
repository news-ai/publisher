export const initialState = {
  feedReducer: {
    projectName: 'NewsAI Publisher',
    isReceiving: false,
    feedArticleIds: [],
  },
  entityReducer: {
    isReceiving: false,
    following: {},
  },
  authorReducer: {
    isReceiving: false
  },
  publisherReducer: {
    isReceiving: false,
    following: {},
    publishers: [],
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
    publishers: [],
    current: undefined,
    publisherInput: {
      articles: [],
      filtered: [],
      selected: [],
      currentIdx: -1,
      value: '',
    },
    entityInput: {
      articles: [],
      filtered: [],
      selected: [],
      currentIdx: -1,
      value: '',
    }
  }
};
