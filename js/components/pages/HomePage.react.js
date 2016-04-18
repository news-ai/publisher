import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/AppActions';
import ArticleList from '../pieces/ArticleList.react';
import AdditionalLoading from '../pieces/AdditionalLoading.react';
import ArticleInputBar from '../pieces/ArticleInputBar.react';

class HomePage extends Component {
  componentDidMount() {
    const {dispatch, articleIds, onScrollBottom} = this.props;
    window.addEventListener('scroll', onScrollBottom);
    if (articleIds.length === 0) dispatch(actionCreators.fetchFeed());
  }

  componentWillUnmount() {
    const {onScrollBottom} = this.props;
    window.removeEventListener('scroll', onScrollBottom);
  }

  render() {
    const { discoveryUrl, articles, articleIsReceiving, next, discoverySubmitHandler, discoveryInputHandler, discoveryReceiving} = this.props;
    const loading = (<span>The feed is loading...</span>);

    return (
      <div className='container article-list-container'>
        <ArticleInputBar
        url={discoveryUrl}
        onClickHandler={discoverySubmitHandler}
        inputHandler={discoveryInputHandler}
        isReceiving={discoveryReceiving}
        />
          {(articles && next) ?
            <ArticleList articles={articles} /> : loading}
      {(articles && next && next !== 0 && articleIsReceiving) ?
        <AdditionalLoading name='feed is' /> : null}
        </div>
      );
  }
}

const mapStateToProps = state => {
  const feedArticleIds = state.feedReducer.feedArticleIds;
  return {
    projectName: state.feedReducer.projectName,
    next: state.feedReducer.next,
    articleIds: feedArticleIds,
    feedIsReceving: state.feedReducer.isReceiving,
    articleIsReceiving: state.articleReducer.isReceiving,
    articles: state.feedReducer.next ? feedArticleIds.map( articleId => state.articleReducer[articleId]) : undefined,
    discoveryUrl: state.personReducer.discovery.url,
    discoveryReceiving: state.personReducer.discovery.isReceiving,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onScrollBottom: ev => {
      ev.preventDefault();
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) dispatch(actionCreators.fetchFeed());
    },
    discoveryInputHandler: url => dispatch(actionCreators.updateDiscoveryInput(url)),
    discoverySubmitHandler: _ => dispatch(actionCreators.addDiscoveryArticle()),
    dispatch: action => dispatch(action)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
