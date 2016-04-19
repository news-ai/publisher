import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArticleList from '../pieces/ArticleList.react';
import * as actionCreators from '../../actions/AppActions';

class DiscoveryFeed extends Component {
  componentDidMount() {
    const { articles, dispatch, onScrollBottom } = this.props;
    window.addEventListener('scroll', onScrollBottom);
    if (articles.length === 0) dispatch(actionCreators.fetchDiscoveryFeed());
  }

  componentWillUnmount() {
    const {onScrollBottom} = this.props;
    window.removeEventListener('scroll', onScrollBottom);
  }

  render() {
    const { articles } = this.props;
    return (
      <div className='container article-list-container'>
      <h5>Articles You Added:</h5>
      <ArticleList articles={articles} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    articles: state.personReducer.discovery.discoveredArticleIds.map( id => state.articleReducer[id]),
    articleIds: state.personReducer.discovery.discoveredArticleIds,
    next: state.personReducer.discovery.next,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onScrollBottom: ev => {
      ev.preventDefault();
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        if (props.next) dispatch(actionCreators.fetchDiscoveryFeed());
      }
    },
    dispatch: action => dispatch(action),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiscoveryFeed);
