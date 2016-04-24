import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArticleList from '../pieces/ArticleList.react';
import * as actionCreators from '../../actions/AppActions';
import AdditionalLoading from '../pieces/AdditionalLoading.react';
import CenterLoading from '../pieces/CenterLoading.react';

class StarredFeed extends Component {
  componentDidMount() {
    const { articles, dispatch, onScrollBottom } = this.props;
    window.addEventListener('scroll', onScrollBottom);
    if (articles.length === 0) dispatch(actionCreators.fetchStarredFeed());
  }

  componentWillUnmount() {
    const { onScrollBottom } = this.props;
    window.removeEventListener('scroll', onScrollBottom);
  }

  render() {
    const { articles, articleIsReceiving, next, onScrollBottom } = this.props;
    const articleLoading = <CenterLoading name='articles'/>;

    if (next === undefined && articles.length > 0) window.removeEventListener('scroll', onScrollBottom);

    return (
      <div className='container article-list-container'>
      {
        articleIsReceiving && articles.length === 0 ? articleLoading :
        <ArticleList articles={articles} />
      }
      {(articles.length > 0 && next && articleIsReceiving) ? <AdditionalLoading name='articles are' /> : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    articles: state.personReducer.discovery.discoveredArticleIds.map( id => state.articleReducer[id]),
    articleIds: state.personReducer.discovery.discoveredArticleIds,
    next: state.personReducer.discovery.next,
    articleIsReceiving: state.articleReducer.isReceiving,
    discoveryUrl: state.personReducer.discovery.url,
    discoveryReceiving: state.personReducer.discovery.isReceiving,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onScrollBottom: ev => {
      ev.preventDefault();
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) dispatch(actionCreators.fetchStarredFeed());
    },
    dispatch: action => dispatch(action),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StarredFeed);