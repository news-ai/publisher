import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/AppActions';
import * as filterActions from '../../actions/filterActions';
import ArticleList from '../pieces/ArticleList.react';
import AdditionalLoading from '../pieces/AdditionalLoading.react';
import CenterLoading from '../pieces/CenterLoading.react';
import Filter from '../pieces/Filter.react';
import Dropdown from '../pieces/Dropdown.react';

class HomePage extends Component {
  constructor(props) {
    super();
    this.state = {
      filterTab: false
    }
  }

  componentDidMount() {
    const {dispatch, articleIds, fetchFeed } = this.props;
    if (articleIds.length === 0) dispatch(actionCreators.fetchFeed());
  }

  componentWillUnmount() {
    const { fetchFeed, fetchFilterFeed, filterMode } = this.props;
    if (filterMode) window.removeEventListener('scroll', fetchFilterFeed);
    else window.removeEventListener('scroll', fetchFeed);
  }

  render() {
    const { articles, articleIsReceiving, next, dispatch, filterMode, fetchFeed, fetchFilterFeed } = this.props;
    if (filterMode) {
      window.removeEventListener('scroll', fetchFeed);
      window.addEventListener('scroll', fetchFilterFeed);
    } else {
      window.addEventListener('scroll', fetchFeed);
    }
    return (
      <div className='container article-list-container'>
          { (articles && (next === null || next)) ? (
            <div>
              <div style={{margin: '5px'}}>
              <small style={{
                marginTop: '5px',
                color: 'gray',
                fontStyle: 'italic',
                cursor: 'pointer'
              }} onClick={ _ => this.setState({filterTab: !this.state.filterTab})}>{ this.state.filterTab ? 'Close' : 'Filters'}</small>
              { this.state.filterTab ? <div>
                <Filter />
                </div> : null }
              </div>
                <Dropdown />
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
    current: current,
    projectName: state.feedReducer.projectName,
    next: filterMode ? state.filterReducer[current].next : state.feedReducer.next,
    articleIds: articleIds,
    feedIsReceving: state.feedReducer.isReceiving,
    articleIsReceiving: state.articleReducer.isReceiving,
    articles: articleIds.map( articleId => state.articleReducer[articleId]),

  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch: action => dispatch(action),
    fetchFeed: e => {
      e.preventDefault();
      if ((window.innerHeight + window.scrollY + 20) >= document.body.offsetHeight) dispatch(actionCreators.fetchFeed());
    },
    fetchFilterFeed: e => {
      e.preventDefault();
      if ((window.innerHeight + window.scrollY + 20) >= document.body.offsetHeight) dispatch(filterActions.fetchFilterArticles())
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
