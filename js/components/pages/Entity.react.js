import React, { Component } from 'react';
import * as actionCreators from '../../actions/AppActions';
import { connect } from 'react-redux';
import ArticleList from '../pieces/ArticleList.react';


class Entity extends Component {
  componentDidMount() {
    let {dispatch, entityId, entity, entityArticles} = this.props;
    if (entity === undefined) {
      Promise.all([
        dispatch(actionCreators.fetchEntity(entityId))])
        .then(() => dispatch(actionCreators.fetchEntityArticles(entityId)));
    }
    if (entity !== undefined && entityArticles === undefined) dispatch(actionCreators.fetchEntityArticles(entityId));
  }

  render() {
    let {entity, entityArticles} = this.props;
    const entityLoading = (<span>The entity is loading</span>);
    const articleLoading = (<span>The articles are loading</span>);
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
        <ArticleList articles={entityArticles} />
        )}
          </div>
      </div>
      );
  }
}

const mapStateToProps = (state, props) => {
  const entityId = parseInt(props.params.entityId, 10);
  const entity = state.entityReducer[entityId];
  console.log(state.articleReducer.isReceiving);
  console.log(state.entityReducer.isReceiving);
  return {
    entityId: entityId,
    entity: entity,
    // entityArticleIds: (state.entityReducer[entityId] === undefined || state.articleReducer.isReceiving) ? undefined : state.entityReducer[entityId].entity_articles,
    entityArticles: (entity === undefined || entity['entity_articles'] === undefined) ? undefined : (entity.entity_articles.some((id) => state.articleReducer[id] === undefined)) ? undefined : entity.entity_articles.map((id) => state.articleReducer[id])
  };
};

export default connect(mapStateToProps)(Entity);