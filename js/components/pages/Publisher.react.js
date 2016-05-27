import React, { Component } from 'react';
import * as actionCreators from '../../actions/AppActions';
import { connect } from 'react-redux';
import ArticleList from '../pieces/ArticleList.react';
import AdditionalLoading from '../pieces/AdditionalLoading.react';
import CenterLoading from '../pieces/CenterLoading.react';


class Publisher extends Component {
  componentDidMount() {
    const { dispatch, publisherId, publisher, publisherArticles, onScrollBottom } = this.props;
    if (publisher === undefined) dispatch(actionCreators.fetchPublisher(publisherId)).then( _ => dispatch(actionCreators.fetchPublisherArticles(publisherId)));
    if (publisher !== undefined && publisherArticles === undefined) dispatch(actionCreators.fetchPublisherArticles(publisherId));
    window.addEventListener('scroll', onScrollBottom, false);
  }

  componentWillUnmount() {
    const {onScrollBottom} = this.props;
    window.removeEventListener('scroll', onScrollBottom);
  }
  
  render() {
    const { dispatch, publisher, publisherArticles, onScrollBottom, next, articleIsReceiving, followed} = this.props;
    const publisherLoading = (<span>The publisher is loading</span>);
    const articleLoading = <CenterLoading name='articles' />;

    return (
      <div className='container'>
        <div className='row'>
        { publisher ? (
        <div className='twelve columns'>
          <div className='u-max-full-width' style={{
              display: 'flex',
              alignItems: 'center'
            }}>
            <span style={{fontWeight: 500, fontSize: '1.8em'}}>{publisher.name}</span>
            <i className='fa fa-plus fa-lg right' style={{
              color: followed ? 'black' : 'lightgray',
            }} ariaHidden='true' onClick={ _ => dispatch(actionCreators.toggleFollow(publisher.id, 'publishers'))}></i>
          </div>
          <p>{publisher.url}</p>
        </div>
        ) : publisherLoading }
        </div>
        <div>
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
    followed: state.publisherReducer.following[publisherId] ? true : false
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
      if ((window.innerHeight + window.scrollY + 20) >= document.body.offsetHeight) dispatch(actionCreators.fetchPublisherArticles(publisherId));
    },
    dispatch: action => dispatch(action)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Publisher);