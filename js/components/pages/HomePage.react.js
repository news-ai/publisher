import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/AppActions';
import * as filterActions from '../../actions/filterActions';
import ArticleList from '../pieces/ArticleList.react';
import AdditionalLoading from '../pieces/AdditionalLoading.react';
import CenterLoading from '../pieces/CenterLoading.react';
import Filter from '../pieces/Filter.react';
import EntitySearchBar from '../containers/EntitySearchBar.react';

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
    // dispatch(actionCreators.fetchAllPublishers());
    if (articleIds.length === 0) dispatch(actionCreators.fetchFeed());
  }

  componentWillUnmount() {
    const {onScrollBottom} = this.props;
    window.removeEventListener('scroll', onScrollBottom);
  }

  render() {
    const { articles, articleIsReceiving, next, dispatch } = this.props;

    console.log(next);
    return (
      <div className='container article-list-container'>
          <EntitySearchBar />
          { (articles && (next === null || next)) ? (
            <div>
              <div style={{margin: '5px'}}>
              <small style={{marginTop: '5px', color: 'gray', fontStyle: 'italic'}} onClick={ _ => this.setState({filterTab: !this.state.filterTab})}>{ this.state.filterTab ? 'Close' : 'Filters'}</small>
              { this.state.filterTab ? <div>
                <Filter />
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
  const filterMode = state.filterReducer.current !== undefined;
  const current = state.filterReducer.current;
  const articleIds = filterMode ? state.filterReducer[current].articles : state.feedReducer.feedArticleIds;
  return {
    filterMode: filterMode,
    projectName: state.feedReducer.projectName,
    next: filterMode ? state.filterReducer[current].next : state.feedReducer.next,
    articleIds: articleIds,
    feedIsReceving: state.feedReducer.isReceiving,
    articleIsReceiving: state.articleReducer.isReceiving,
    articles: articleIds.map( articleId => state.articleReducer[articleId])
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
