import React, { Component } from 'react';
import * as actionCreators from '../../actions/AppActions';
import { connect } from 'react-redux';
import ArticleList from '../pieces/ArticleList.react';
import AdditionalLoading from '../pieces/AdditionalLoading.react';


class Entity extends Component {
  componentDidMount() {
    let {dispatch, entityId, entity, entityArticles, onScrollBottom} = this.props;
    if (entity === undefined) {
      Promise.all([
        dispatch(actionCreators.fetchEntity(entityId))])
        .then(() => dispatch(actionCreators.fetchEntityArticles(entityId)));
    }
    if (entity !== undefined && entityArticles === undefined) dispatch(actionCreators.fetchEntityArticles(entityId));
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
    let {entity, entityArticles, onScrollBottom, next, articleIsReceiving} = this.props;
    const entityLoading = (<span>The entity is loading</span>);
    const articleLoading = (<span>The articles are loading</span>);
    if (next === 0) this._removeScroll();
    return (
      <div className='container entity'>
        <div className='row'>
        {(entity === undefined) ? entityLoading : (
        <div className='twelve columns'>
            <h5>{entity.name}</h5>
            <p>Type: {entity.main_type}</p>
            </div>
        )}
        </div>
        <div className='row'>
          { (entityArticles === undefined) ? articleLoading : (
        <div>
        <ArticleList articles={entityArticles} />
        </div>
        )}
      {(entityArticles !== undefined && next !== undefined && next !== 0 && articleIsReceiving) ? <AdditionalLoading name='articles are' /> : null}
          </div>
      </div>
      );
  }
}

const mapStateToProps = (state, props) => {
  const entityId = parseInt(props.params.entityId, 10);
  const entity = state.entityReducer[entityId];
  return {
    entityId: entityId,
    entity: entity,
    next: (entity === undefined) ? undefined : entity.next,
    articleIsReceiving: state.articleReducer.isReceiving,
    entityArticles: (entity === undefined || entity.entity_articles === undefined) ? undefined : (entity.entity_articles.some((id) => state.articleReducer[id] === undefined)) ? undefined : entity.entity_articles.map((id) => state.articleReducer[id])
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const entityId = parseInt(props.params.entityId, 10);
  return {
    dispatch: action => dispatch(action)
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  let {next, entityId} = stateProps;
  let {dispatch} = dispatchProps;
  // console.log(stateProps);
  // console.log(dispatchProps);
  // console.log(ownProps);
  // console.log(next);
  return {
    ...stateProps,
    onScrollBottom: (ev) => {
      ev.preventDefault();
      if ( ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) ) dispatch(actionCreators.fetchAdditionalEntityArticles(entityId));
    },
    dispatch: action => dispatch(action)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Entity);
