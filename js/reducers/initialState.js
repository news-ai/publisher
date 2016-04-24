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
    }
  },
  personReducer: {
    isReceiving: false,
    discovery: {
      discoveredArticleIds: [],
      url: '',
      isReceiving: false
    },
  }
};
