import React, { Component } from 'react';
import * as actionCreators from '../../actions/AppActions';
import { connect } from 'react-redux';
import ArticleList from '../pieces/ArticleList.react';
import AdditionalLoading from '../pieces/AdditionalLoading.react';
import CenterLoading from '../pieces/CenterLoading.react';


class Entity extends Component {
  componentDidMount() {
    let {dispatch, entityId, entity, entityArticles, onScrollBottom, followed } = this.props;
    if (entity === undefined) dispatch(actionCreators.fetchEntityAndArticles(entityId));
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
    let { dispatch, entityId, entity, entityArticles, onScrollBottom, next, articleIsReceiving, followed} = this.props;
    const entityLoading = (<span>The entity is loading</span>);
    const articleLoading = <CenterLoading name='articles'/>;

    if (next === 0) this._removeScroll();

    return (
      <div className='container'>
        <div className='row'>
        {entity === undefined ? entityLoading : (
          <div className='twelve columns'>
            <div className='u-max-full-width' style={{
              display: 'flex',
              alignItems: 'center'
            }}>
              <span style={{fontWeight: 500, fontSize: '1.8em'}}>{entity.name}</span>
              <i className='fa fa-plus fa-lg right' style={{
                color: followed ? 'black' : 'lightgray'
              }} ariaHidden='true' onClick={ _ => dispatch(actionCreators.toggleFollow(entityId, 'entities'))}></i>
            </div>
            <p>Type: {entity.main_type}</p>
          </div>
        )}
        </div>
        <div>
          { (entityArticles === undefined) ? articleLoading : (
        <div>
        <ArticleList articles={entityArticles} />
        </div>
        )}
      {(entityArticles && next && articleIsReceiving) ? <AdditionalLoading name='articles are' /> : null}
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
    next: entity ? entity.next : undefined,
    articleIsReceiving: state.articleReducer.isReceiving,
    entityArticles: (entity === undefined || entity.entity_articles === undefined) ? undefined : (entity.entity_articles.some( id => state.articleReducer[id])) ? entity.entity_articles.map( id => state.articleReducer[id]) : undefined,
    followed: state.entityReducer.following[entityId] ? true : false
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const entityId = parseInt(props.params.entityId, 10);
  return {
    dispatch: action => dispatch(action)
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {next, entityId} = stateProps;
  const {dispatch} = dispatchProps;
  return {
    ...stateProps,
    onScrollBottom: (ev) => {
      ev.preventDefault();
      if ( ((window.innerHeight + window.scrollY + 20) >= document.body.offsetHeight) && next ) dispatch(actionCreators.fetchEntityArticles(entityId));
    },
    dispatch: action => dispatch(action)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Entity);
