import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArticleList from '../pieces/ArticleList.react';
import * as actionCreators from '../../actions/AppActions';
import AdditionalLoading from '../pieces/AdditionalLoading.react';
import ArticleInputBar from '../pieces/ArticleInputBar.react';
import CenterLoading from '../pieces/CenterLoading.react';

class DiscoveryFeed extends Component {
  componentDidMount() {
    const { articles, dispatch, onScrollBottom } = this.props;
    if (articles.length === 0) dispatch(actionCreators.fetchDiscoveryFeed());
    window.addEventListener('scroll', onScrollBottom);
  }

  componentWillUnmount() {
    const { onScrollBottom } = this.props;
    window.removeEventListener('scroll', onScrollBottom);
  }

  render() {
    const { articles, articleIsReceiving, next, onScrollBottom, discovery } = this.props;
    const articleLoading = <CenterLoading name='articles'/>;
    
    return (
      <div className='container article-list-container'>
        <ArticleInputBar
        url={this.props.discovery.url}
        didInvalidate={this.props.discovery.didInvalidate}
        onClickHandler={this.props.discoverySubmitHandler}
        inputHandler={this.props.discoveryInputHandler}
        isReceiving={this.props.discoveryReceiving}
        />
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
    articles: state.personReducer.discovery.discoveredArticleIds.map( id => state.articleReducer[id]),
    articleIds: state.personReducer.discovery.discoveredArticleIds,
    next: state.personReducer.discovery.next,
    articleIsReceiving: state.articleReducer.isReceiving,
    discoveryReceiving: state.personReducer.discovery.isReceiving,
    discovery: state.personReducer.discovery,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    discoveryInputHandler: url => dispatch(actionCreators.updateDiscoveryInput(url)),
    discoverySubmitHandler: _ => dispatch(actionCreators.addDiscoveryArticle()),
    dispatch: action => dispatch(action),
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {next} = stateProps;
  const {dispatch} = dispatchProps;
  return {
    ...stateProps,
    ...dispatchProps,
    onScrollBottom: ev => {
      ev.preventDefault();
      if ((window.innerHeight + window.scrollY + 20) >= document.body.offsetHeight) dispatch(actionCreators.fetchDiscoveryFeed());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DiscoveryFeed);
