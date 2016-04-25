export const initialState = {
  feedReducer: {
    projectName: 'NewsAI Publisher',
    isReceiving: false,
    feedArticleIds: [],
  },
  entityReducer: {
    isReceiving: false
  },
  authorReducer: {
    isReceiving: false
  },
  publisherReducer: {
    isReceiving: false
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
  }
};
