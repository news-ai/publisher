import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArticleList from '../pieces/ArticleList.react';
import * as actionCreators from '../../actions/AppActions';
import AdditionalLoading from '../pieces/AdditionalLoading.react';
import CenterLoading from '../pieces/CenterLoading.react';

class StarredFeed extends Component {
  componentDidMount() {
    const { articleIds, dispatch, onScrollBottom, next } = this.props;
    window.addEventListener('scroll', onScrollBottom);
    if (articleIds.length === 0) dispatch(actionCreators.fetchStarredFeed());
  }

  componentWillUnmount() {
    const { onScrollBottom } = this.props;
    window.removeEventListener('scroll', onScrollBottom);
  }

  render() {
    const { articles, articleIsReceiving, next } = this.props;
    const articleLoading = <CenterLoading name='articles'/>;
    
    return (
      <div className='container article-list-container'>
      <p style={{fontSize: '2em'}}>Starred</p>
      {
        articleIsReceiving && articles.length === 0 ? articleLoading :
        articles.length === 0 ? <span>EMPTY FEED</span> :
        <ArticleList articles={articles} />
      }
      {(articles.length > 0 && next && articleIsReceiving) ? <AdditionalLoading name='articles are' /> : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    articles: state.articleReducer.starred.starredArticleIds.map( id => state.articleReducer[id]),
    articleIds: state.articleReducer.starred.starredArticleIds,
    next: state.articleReducer.starred.next,
    articleIsReceiving: state.articleReducer.isReceiving,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch: action => dispatch(action),
  };
};


const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  return {
    ...stateProps,
    onScrollBottom: ev => {
      ev.preventDefault();
      if ((window.innerHeight + window.scrollY + 20) >= document.body.offsetHeight) dispatch(actionCreators.fetchStarredFeed());
    },
    dispatch: action => dispatch(action)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(StarredFeed);