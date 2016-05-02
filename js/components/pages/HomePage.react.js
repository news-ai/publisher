import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/AppActions';
import ArticleList from '../pieces/ArticleList.react';
import AdditionalLoading from '../pieces/AdditionalLoading.react';
import CenterLoading from '../pieces/CenterLoading.react';
import PublisherSearchBar from '../containers/PublisherSearchBar.react';

class HomePage extends Component {
  constructor(props) {
    super();
    this.state = {
      filterTab: false
    }
  }

  componentDidMount() {
    const {dispatch, articleIds, onScrollBottom} = this.props;
    window.addEventListener('scroll', onScrollBottom);
    dispatch(actionCreators.fetchAllPublishers());
    if (articleIds.length === 0) dispatch(actionCreators.fetchFeed());
  }

  componentWillUnmount() {
    const {onScrollBottom} = this.props;
    window.removeEventListener('scroll', onScrollBottom);
  }

  render() {
    const { articles, articleIsReceiving, next } = this.props;

    return (
      <div className='container article-list-container'>
          {(articles && next) ? (
            <div>
              <div style={{margin: '5px'}}>
              <small style={{marginTop: '5px', color: 'gray', fontStyle: 'italic'}} onClick={ _ => this.setState({filterTab: !this.state.filterTab})}>{ this.state.filterTab ? 'Close' : 'Filters'}</small>
              { this.state.filterTab ? <div>
                <PublisherSearchBar
                  title='Filter by Publisher'
                  width='300px'
                  max={1}
                />
                </div> : null }
              </div>
            <ArticleList articles={articles} />
            </div>
            ) :
            <CenterLoading name='feed' />
          }

      {(articles && next && next !== 0 && articleIsReceiving) ?
        <AdditionalLoading name='feed is' /> : null}
        </div>
      );
  }
}

const mapStateToProps = state => {
  const feedArticleIds = state.feedReducer.feedArticleIds;
  const filterMode = state.publisherReducer.searchInput.selected.length > 0 && !state.publisherReducer.isReceiving && !state.articleReducer.isReceiving;
  const pubId = filterMode ? state.publisherReducer.searchInput.selected[0] : undefined;
  const publisher = filterMode ? state.publisherReducer[pubId] : undefined;
  return {
    filterMode: filterMode,
    pubId: pubId,
    projectName: state.feedReducer.projectName,
    next: filterMode ? publisher.next : state.feedReducer.next,
    articleIds: filterMode ? publisher.publisher_articles.map( article => article.id) : feedArticleIds,
    feedIsReceving: filterMode ? publisher.isReceiving : state.feedReducer.isReceiving,
    articleIsReceiving: state.articleReducer.isReceiving,
    articles: filterMode ? publisher.publisher_articles.map( id => state.articleReducer[id] ) : feedArticleIds.map( articleId => state.articleReducer[articleId])
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch: action => dispatch(action)
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  return {
    ...stateProps,
    onScrollBottom: ev => {
      ev.preventDefault();
      if ((window.innerHeight + window.scrollY + 20) >= document.body.offsetHeight) {
        if (stateProps.filterMode) dispatch(actionCreators.fetchPublisherArticles(stateProps.pubId));
        else dispatch(actionCreators.fetchFeed());
      }
    },
    dispatch: action => dispatch(action)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(HomePage);
