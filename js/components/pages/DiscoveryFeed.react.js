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
    window.addEventListener('scroll', onScrollBottom);
    if (articles.length === 0) dispatch(actionCreators.fetchDiscoveryFeed());
  }

  componentWillUnmount() {
    const { onScrollBottom } = this.props;
    window.removeEventListener('scroll', onScrollBottom);
  }

  render() {
    const { articles, articleIsReceiving, next, onScrollBottom } = this.props;
    const articleLoading = <CenterLoading name='articles'/>;
    
    return (
      <div className='container article-list-container'>
        <ArticleInputBar
        url={this.props.discoveryUrl}
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
    discoveryUrl: state.personReducer.discovery.url,
    discoveryReceiving: state.personReducer.discovery.isReceiving,
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
    onScrollBottom: ev => {
      ev.preventDefault();
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && next) dispatch(actionCreators.fetchDiscoveryFeed());
    },
    dispatch: action => dispatch(action)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DiscoveryFeed);
