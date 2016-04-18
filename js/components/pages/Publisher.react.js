import React, { Component } from 'react';
import * as actionCreators from '../../actions/AppActions';
import { connect } from 'react-redux';
import ArticleList from '../pieces/ArticleList.react';
import AdditionalLoading from '../pieces/AdditionalLoading.react';


class Publisher extends Component {
  componentDidMount() {
    let {dispatch, publisherId, publisher, publisherArticles, onScrollBottom} = this.props;
    if (!publisher) dispatch(actionCreators.fetchPublisherAndArticles(publisherId));
    if (publisher && !publisherArticles) dispatch(actionCreators.fetchPublisherArticles(publisherId));
    window.addEventListener('scroll', onScrollBottom);
  }

  componentWillUnmount() {
    let {onScrollBottom} = this.props;
    window.removeEventListener('scroll', onScrollBottom);
  }

  _removeScroll() {
    let {onScrollBottom} = this.props;
    window.removeEventListener('scroll', onScrollBottom);
  }

  render() {
    let {publisher, publisherArticles, onScrollBottom, next, articleIsReceiving} = this.props;
    const publisherLoading = (<span>The publisher is loading</span>);
    const articleLoading = (<span>The articles are loading</span>);
    if (next === 0) this._removeScroll();
    return (
      <div className='container publisher'>
        <div className='row'>
        { publisher ? (
        <div className='twelve columns'>
            <h5>{publisher.name}</h5>
            <span>{publisher.url}</span>
            </div>
        ) : publisherLoading }
        </div>
        <div className='row'>
          { publisherArticles ? 
            (<div>
              <ArticleList articles={publisherArticles} />
            </div>) : articleLoading }
      {(publisherArticles && next && articleIsReceiving) ? <AdditionalLoading name='articles are' /> : null}
          </div>
      </div>
      );
  }
}

const mapStateToProps = (state, props) => {
  const publisherId = parseInt(props.params.publisherId, 10);
  const publisher = state.publisherReducer[publisherId];
  return {
    publisherId: publisherId,
    publisher: publisher,
    next: publisher ? publisher.next : undefined,
    articleIsReceiving: state.articleReducer.isReceiving,
    publisherArticles: publisher ?
      publisher.publisher_articles.some( id => state.articleReducer[id]) ?
        publisher.publisher_articles.map( id => state.articleReducer[id]) : undefined : undefined,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const publisherId = parseInt(props.params.publisherId, 10);
  return {
    dispatch: action => dispatch(action)
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  let {next, publisherId} = stateProps;
  let {dispatch} = dispatchProps;

  return {
    ...stateProps,
    onScrollBottom: ev => {
      ev.preventDefault();
      if ( ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) ) dispatch(actionCreators.fetchPublisherArticles(publisherId));
    },
    dispatch: action => dispatch(action)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Publisher);