/*
 * HomePage
 * This is the first thing users see of our App
 */
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/AppActions';
import ArticleList from '../pieces/ArticleList.react';
import AdditionalLoading from '../pieces/AdditionalLoading.react';

class HomePage extends Component {
  componentDidMount() {
    let {dispatch, articleIds, onScrollBottom} = this.props;
    window.addEventListener('scroll', onScrollBottom);
    if (articleIds === undefined) dispatch(actionCreators.fetchFeed());
  }

  componentWillUnmount() {
    let {onScrollBottom} = this.props;
    window.removeEventListener('scroll', onScrollBottom);
  }

  render() {
    let {projectName, articles, feedIsReceving, articleIsReceiving, onScrollBottom, next} = this.props;
    const loading = (<span>The feed is loading</span>);

    return (
      <div className='container article-list-container'>
          {(articles === undefined || next === undefined) ? loading :
        <ArticleList articles={articles} />
      }
      {(articles !== undefined && next !== undefined && next !== 0 && articleIsReceiving) ? <AdditionalLoading name='feed is' /> : null}
        </div>
      );
  }
}

const mapStateToProps = (state) => {
  const feedArticleIds = state.feedReducer.feedArticleIds;
  return {
    projectName: state.feedReducer.projectName,
    next: state.feedReducer.next,
    articleIds: feedArticleIds,
    feedIsReceving: state.feedReducer.isReceiving,
    articleIsReceiving: state.articleReducer.isReceiving,
    articles: (state.feedReducer.next === undefined) ? undefined : feedArticleIds.map((articleId) => state.articleReducer[articleId])
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onScrollBottom: (ev) => {
      ev.preventDefault();
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) dispatch(actionCreators.fetchAdditionalFeed());
    },
    dispatch: action => dispatch(action)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
