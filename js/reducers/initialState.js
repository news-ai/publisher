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
    isReceiving: false
  },
  personReducer: {
    isReceiving: false,
    discovery: {
      url: '',
      isReceiving: false
    }
  }
};
